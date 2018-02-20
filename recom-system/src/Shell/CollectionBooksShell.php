<?php

namespace App\Shell;

use Cake\Console\Shell;

/**
 * CollectionBooks shell command.
 */
class CollectionBooksShell extends Shell {

    public function initialize() {
        parent::initialize();
        $this->loadModel("CollectionBooks");
        $this->loadModel("Genres");
        $this->loadModel("Books");
    }

    /**
     * Manage the available sub-commands along with their arguments and help
     *
     * @see http://book.cakephp.org/3.0/en/console-and-shells.html#configuring-options-and-generating-help
     *
     * @return \Cake\Console\ConsoleOptionParser
     */
    public function getOptionParser() {
        $parser = parent::getOptionParser();

        return $parser;
    }

    /**
     * main() method.
     *
     * @return bool|int|null Success or error code.
     */
    public function main() {
        //$this->collectionBooksByGenres();
        $this->addCollectionBook();
    }

    public function collectionBooksByGenres() {
        $id = 5;
        $livelib = LIVELIB;
        $genre = $this->Genres->find('all')->where(['id' => $id])->first();

        if (empty($genre)) {
            $this->out('Запись не найдена');
        } else {
            $pageOfGenre = $genre['link_livelib'];
            $dom = new \DOMDocument("1.0", "UTF-8");
            $internalErrors = libxml_use_internal_errors(true);
            $dom->loadHTMLFile($pageOfGenre);

            $finder = new \DOMXPath($dom);
            $bookName = "block-book-title";
            $bookISBN = "book-details-info";
            $query1 = sprintf("//a[contains(@class, '%s')]", $bookName);
            $query2 = sprintf("//*[contains(@class, '%s')]", $bookISBN);
            $books = $finder->query($query1);
            $infos = $finder->query($query2);
            for ($id = 0; $id < 25; $id++) {
                $isbn = $infos[$id]->nodeValue;
                $afterisbn = stristr($isbn, 'ISBN: ');
                if (!empty($afterisbn)) {
                    $keywords = preg_split("/[\s,]+/", $afterisbn);
                    $isbn = $keywords[1];
                    $this->out($books[$id]->nodeValue . PHP_EOL);
                    $this->out($livelib . $books[$id]->getAttribute('href') . PHP_EOL);
                    $this->out($isbn . PHP_EOL);
                    $checkisbn = $this->CollectionBooks->checkISBN($isbn);
                    if (!empty($checkisbn)) {
                        $this->out("Книга уже добавлена в таблицу");
                    } else {
                        $book = $this->CollectionBooks->newEntity();
                        $book->name = $books[$id]->nodeValue;
                        $book->isbn = $isbn;
                        $book->link = $livelib . $books[$id]->getAttribute('href');
                        $book->status = 'new';
                        $status = $this->CollectionBooks->addBook($book);
                        $this->out($status);
                    }
                } else {
                    continue;
                }
            }
            libxml_use_internal_errors($internalErrors);
        }
    }

    public function addCollectionBook() {
        $id = 25;
        $addBook = array();
        $book = $this->CollectionBooks->find('all')->where(['id' => $id])->first();

        if (empty($book)) {
            $this->out('Запись не найдена');
        } else {

            if ($book['status'] == 'new') {
                $pageOfBook = $book['link'];
                $dom = new \DOMDocument("1.0", "UTF-8");
                $internalErrors = libxml_use_internal_errors(true);
                $dom->loadHTMLFile($pageOfBook);
                $finder = new \DOMXPath($dom);
                $reviewCount = "menu-tabs-reviews";
                $bookTitle = "name";
                $bookAuthor = "book-author";
                $bookCover = "main-image-book";
                $isbn = "isbn";
                $genres = "label-genre";
                $description = "description";
                $rating = "ratingValue";
                $name = $finder->query(sprintf("//*[contains(@itemprop, '%s')]", $bookTitle));
                $count = $finder->query(sprintf("//a[contains(@class, '%s')]", $reviewCount));
                $author = $finder->query(sprintf("//a[contains(@id, '%s')]", $bookAuthor));
                $cover = $finder->query(sprintf("//img[contains(@id, '%s')]", $bookCover));
                $isbn = $finder->query(sprintf("//span[contains(@itemprop, '%s')]", $isbn));
                $genres = $finder->query(sprintf("//a[contains(@class, '%s')]", $genres));
                $description = $finder->query(sprintf("//p[contains(@itemprop, '%s')]", $description));
                $rating = $finder->query(sprintf("//span[contains(@itemprop, '%s')]", $rating));
                $reviewCount = $count->item(0)->nodeValue;
                $count = stristr($reviewCount, ' ');
                $count = $count;
                $count = trim($count);
                $cover = $cover->item(0)->getAttribute('src');

                /* Собранные данные храним в массив, чтобы в дальнейшем сохранить в базу */
                $addBook['name'] = $name->item(0)->nodeValue;
                $addBook['authors'] = $author->item(0)->nodeValue;
                $addBook['cover'] = $cover;
                $addBook['genres'] = '';
                $addBook['reviews_count'] = $count;
                $addBook['isbn'] = $isbn->item(0)->nodeValue;
                $addBook['description'] = $description->item(0)->nodeValue;
                $addBook['rating'] = $rating->item(0)->nodeValue;
                if (empty($addBook['reviews_count']))
                    $addBook['reviews_count'] = 0;
                $addBook['link'] = $book['link'];
                foreach ($genres as $genre) {
                    $addBook['genres'] .= $genre->nodeValue . ", ";
                }
                $addBook['genres'] = trim($addBook['genres'], " ,");
                $addBook['description'] = trim($addBook['description']);
                $addBook['fromsite'] = 'livelib';
                /* Конец создания массива */

                if ($addBook['reviews_count'] > 1) {
                    $checkisbn = $this->Books->checkISBN($addBook['isbn']);
                    if (!empty($checkisbn)) {
                        $this->out("Книга уже добавлена в БД");
                    } else {
                        $added_status = $this->Books->addBook($addBook);
                        if ($added_status) {
                            $added = $this->CollectionBooks->changeBookStatus($book);
                            $this->out("Книга добавлена");
                        } else {
                            $this->out("Ошибка добавления");
                        }
                    }
                } else {
                    $this->out("Книге оставлены очень мало рецензий");
                }
                libxml_use_internal_errors($internalErrors);
            } else {
                $this->out("Книга уже добавлена в БД");
            }
        }
    }

}
