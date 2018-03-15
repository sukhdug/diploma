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
        //for ($id = 400; $id <= 450; $id++){
            //$this->collectionBooksByGenres(17);
            $this->addCollectionBook(903);
            $this->addCollectionBook(904);
            $this->addCollectionBook(905);
        //}
    }

    public function collectionBooksByGenres($id) {
       // $id = 14;
        $livelib = LIVELIB;
        $genre = $this->Genres->find('all')->where(['id' => $id])->first();

        if (empty($genre)) {
            $this->out('Запись не найдена');
        } else {
            $pageOfGenre = $genre['link_livelib'];
            $pageOfGenre .= '/~3';
            $this->out($pageOfGenre);
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
            for ($id = 0; $id < $books->length; $id++) {
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

    public function addCollectionBook($id) {
       // $id = 150;
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
                $name = $finder->query(sprintf("//span[contains(@itemprop, '%s')]", $bookTitle));
                $count = $finder->query(sprintf("//a[contains(@class, '%s')]", $reviewCount));
                $author = $finder->query(sprintf("//a[contains(@id, '%s')]", $bookAuthor));
                $cover = $finder->query(sprintf("//img[contains(@id, '%s')]", $bookCover));
                $isbn = $finder->query(sprintf("//span[contains(@itemprop, '%s')]", $isbn));
                $genres = $finder->query(sprintf("//a[contains(@class, '%s')]", $genres));
                $description = $finder->query(sprintf("//p[contains(@itemprop, '%s')]", $description));
                $rating = $finder->query(sprintf("//span[contains(@itemprop, '%s')]", $rating));
                $addBook['reviews_count'] = '';
                foreach ($count as $c) {
                    $recent = $c->nodeValue;
                    $result = strripos($recent, 'Рецензии');
                    if ($result !== false) {
                        $matches = [];
                        preg_match('/([0-9]+)/', $recent, $matches);
                        if (isset($matches) && !empty($matches)) {
                            $addBook['reviews_count'] = $matches[0];
                            break;
                        } else {
                            $addBook['reviews_count'] = 0;
                            $this->out('Нет рецензий');
                            break;
                        }
                    }
                }
                $this->out($addBook['reviews_count']);
                $picture = 'no';
                foreach ($cover as $c) {
                    $picture = $c->getAttribute('src');
                    if($picture != 'no') {
                        break;
                    }
                }
                $title = 'no';
                foreach ($name as $n) {
                    $title = $n->nodeValue;
                    if($title != 'no') {
                        break;
                    }
                }
                $writer = 'no';
                foreach ($author as $a) {
                    $writer = $a->nodeValue;
                    if($writer != 'no') {
                        break;
                    }
                }
                $book_isbn = 'no';
                foreach ($isbn as $i) {
                    $book_isbn = $i->nodeValue;
                    if($book_isbn != 'no') {
                        break;
                    }
                }
                $book_description = 'no';
                foreach ($description as $d) {
                    $book_description = $d->nodeValue;
                    if($book_description != 'no') {
                        break;
                    }
                }
                $book_rating = 'no';
                foreach ($rating as $r) {
                    $book_rating = $r->nodeValue;
                    if($book_rating != 'no') {
                        break;
                    }
                }
                /* Собранные данные храним в массив, чтобы в дальнейшем сохранить в базу */
                $addBook['name'] = $title;
                $addBook['authors'] = $writer;
                $addBook['cover'] = $picture;
                $addBook['genres'] = '';
                //$addBook['reviews_count'] = $reviewCount;
                $addBook['isbn'] = $book_isbn;
                $addBook['description'] = $book_description;
                $addBook['rating'] = $book_rating;
                $addBook['link'] = $book['link'];
                foreach ($genres as $genre) {
                    $addBook['genres'] .= $genre->nodeValue . ", ";
                }
                $addBook['genres'] = trim($addBook['genres'], " ,");
                $addBook['description'] = trim($addBook['description']);
                $addBook['fromsite'] = 'livelib';
                /* Конец создания массива */
                if ($addBook['reviews_count'] > 1) {
                    $checkisbn = $this->Books->getBookByISBN($addBook['isbn']);
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
                    $error = $this->CollectionBooks->changeBookStatusError($book);
                }
                libxml_use_internal_errors($internalErrors);
            } elseif ($book['status'] == 'error') {
                $this->out("Книга с ошибкой");

            } elseif ($book['status'] == 'added') {
                $this->out("Книга уже добавлена в БД");
            }
        }
    }
}
