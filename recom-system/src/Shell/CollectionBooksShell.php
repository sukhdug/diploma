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
        $id = 2;
        $livelib = LIVELIB;
        $genre = $this->Genres->findById($id)->firstOrFail();
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

    public function addCollectionBook() {
        $id = 4;
        $book = $this->CollectionBooks->findById($id)->firstOrFail();
        $pageOfBook = $book['link'];
        $dom = new \DOMDocument("1.0", "UTF-8");
        $internalErrors = libxml_use_internal_errors(true);
        $dom->loadHTMLFile($pageOfBook);
        $finder = new \DOMXPath($dom);
        $reviewCount = "menu-tabs-reviews";
        $bookTitle = "name";
        $bookAuthor = "book-author";
        $bookCover = "main-image-book";
        $query1 = sprintf("//*[contains(@itemprop, '%s')]", $bookTitle);
        $query2 = sprintf("//a[contains(@class, '%s')]", $reviewCount);
        $query3 = sprintf("//a[contains(@id, '%s')]", $bookAuthor);
        $query4 = sprintf("//img[contains(@id, '%s')]", $bookCover);
        $name = $finder->query($query1);
        $count = $finder->query($query2);
        $author = $finder->query($query3);
        $cover = $finder->query($query4);
        $reviewCount = $count->item(0)->nodeValue;
        $count = stristr($reviewCount, ' ');
        $count = $count[1];
        $cover = $cover->item(0)->getAttribute('src');
        $this->out("Название: " . $name->item(0)->nodeValue);
        $this->out("Автор: " . $author->item(0)->nodeValue);
        $this->out("Кол. рецензий: " . $count);
        $this->out("Ссылка на обложку: " . $cover);
        libxml_use_internal_errors($internalErrors);
    }
}
