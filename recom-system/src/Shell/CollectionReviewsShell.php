<?php

namespace App\Shell;

use Cake\Console\Shell;

/**
 * CollectionReviews shell command.
 */
class CollectionReviewsShell extends Shell {

    public function initialize() {
        parent::initialize();
        $this->loadModel("CollectionBooks");
        $this->loadModel("Genres");
        $this->loadModel("Books");
        $this->loadModel("Reviews");
        $this->loadModel("Readers");
        $this->loadModel("CollectionReviews");
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

        //for ($id = 51; $id < 100; $id++){
            //$this->collectionReviewsByBooks($id);
            $this->addCollectionReview(98);
        //}
        //$this->changeStatusCollectionReviews(2334);
    }

    public function collectionReviewsByBooks($id) {

        $book = $this->Books->find('all')->where(['id' => $id])->first();
        $link = 'https://www.livelib.ru/book/';
        $review = [];
        if (empty($book)) {
            $this->out("Запись не найдена");
        } else {
            $matches = [];
            preg_match('/[0-9]{10}/', $book['link'], $matches);
            $matches = implode($matches);
            $link .= $matches . "/reviews";
            $slug = stristr($book['link'], strval($matches));
            $slug = trim($slug, $matches);
            $link .= $slug;
            $review['link'] = $link;
            $review['isbn'] = $book['isbn'];
            $review['reviews_count'] = $reviews_count = $book['reviews_count'];
            $review['status'] = 'new';
            $this->out($review['link']);
            $this->out($review['isbn']);
            $this->out($review['reviews_count']);
            $this->out($review['status']);
            $result = $this->CollectionReviews->addBookReviews($review);
            if ($result) {
                $this->out('Ссылка на рецензии книги добавлена');
            } else {
                $this->out('Неизвестная ошибка');
            }
        }
    }

    public function addCollectionReview($id) {

        $book_review = $this->CollectionReviews->find('all')->where(['id' => $id])->first();
        $book = $this->Books->getBookByISBN($book_review['isbn']);
        $review = [];
        if (empty($book_review)) {
            $this->out('Запись не найдена');
        } else {
            if ($book_review['status'] == 'new') {
                $this->out("Новая книга");
                $pageOfReviews = $book_review['link'];
                $dom = new \DOMDocument("1.0", "UTF-8");
                $internalErrors = libxml_use_internal_errors(true);
                $dom->loadHTMLFile($pageOfReviews);
                $finder = new \DOMXPath($dom);
                $reviewAuthor = "author";
                $reviewValue = "rating-value";
                $reviewGreen = "color-green";
                $reviewRed = "color-red";
                $reviewGray = "color-gray";
                $readers = $finder->query(sprintf("//span[contains(@itemprop, '%s')]", $reviewAuthor));
                $rates = $finder->query(sprintf("//span[contains(@class, '%s') or contains(@class, '%s') or contains(@class, '%s')]", $reviewGreen, $reviewRed, $reviewGray));
                for ($id = 0; $id < $readers->length; $id++) {
                    $user = $this->Readers->getReaderByUsername($readers[$id]->nodeValue);
                    if ((!empty($user)) && (!empty($book))) {
                        $this->out($readers[$id]->nodeValue . " читатель добавлен в БД. Его оценка: " . $rates[$id]->nodeValue);
                        $this->out($book['id'] . " книга добавлена");
                        $review = $this->Reviews->getReviewByBookAndReaderId($book['id'], $user['id']);
                        if (!empty($review)) {
                            $this->out("Рецензия добавлена");
                        } else {
                            $review['book_id'] = $book['id'];
                            $review['reader_id'] = $user['id'];
                            $review['rate'] = $rates[$id]->nodeValue;
                            $this->out($review['book_id'] . " " . $review['reader_id'] . " " . $review['rate']);
                            $status = $this->Reviews->addReview($review);
                            $this->out($status);
                        }
                    } else {
                        $reader_username = $readers[$id]->nodeValue;
                        $status = $this->addReader($reader_username);
                        if ($status) {
                            $review_exist = $this->Reviews->getReviewByBookAndReaderId($book['id'], $user['id']);
                            if (!empty($review_exist)) {
                                $this->out("Рецензия добавлена");
                            } else {
                                $review['book_id'] = $book['id'];
                                $review['reader_id'] = $user['id'];
                                $review['rate'] = $rates[$id]->nodeValue;
                                $review_adding_status = $this->Reviews->addReview($review);
                                $this->out($review_adding_status);
                            }
                        } else {
                            continue;
                        }
                    }
                }
                libxml_use_internal_errors($internalErrors);
            } else {
                $this->out("Рецензии книги собраны");
            }
        }
    }

    public function addReader($reader_username) {
        $pageOfReader = 'https://www.livelib.ru/reader/' . $reader_username;
        $dom = new \DOMDocument("1.0", "UTF-8");
        $internalErrors = libxml_use_internal_errors(true);
        $dom->loadHTMLFile($pageOfReader);
        $finder = new \DOMXPath($dom);
        $reader = [];
        $reader['username'] = $reader_username;
        $reader['link'] = $pageOfReader;
        $value = "standard";
        $counts = $finder->query(sprintf("//li[contains(@class, '%s')]", $value));
        foreach($counts as $count) {
            $review = $count->nodeValue;
            $result = strripos($review, 'Рецензии');
            if($result !== false) {
                $matches = [];
                preg_match('/([0-9]+)/', $review, $matches);
                $reader['reviews_count'] = $matches[0];
                $reader['fromsite'] = 'livelib';
                if($reader['reviews_count'] >= 5){
                    $username = $this->Readers->getReaderByUsername($reader['username']);
                    if(!empty($username)) {
                        $this->out('Читатель уже есть в БД');
                        return true;
                    } else {
                        $this->out('Читателя нет в БД');
                        $add = $this->Readers->addReader($reader);
                        if($add) {
                            $this->out('Читатель добавлен');
                            return true;
                        } else {
                            $this->out('Неизвестная ошибка');
                            return false;
                        }
                    }
                } else {
                    return false;
                }
                break;
            }
        }
        libxml_use_internal_errors($internalErrors);
    }

    public function changeStatusCollectionReviews($id) {

        $book_review = $this->CollectionReviews->find('all')->where(['id' => $id])->first();
        if (empty($book_review)) {
            $this->out('Запись не найдена');
        } else {
            if ($book_review['status'] == 'new') {
                $isbn = $book_review['isbn'];
                $book = $this->Books->getBookByISBN($isbn);
                if (!empty($book)) {
                    $review = $this->Reviews->getReviewByBookId($book['id']);
                    if (!empty($review)) {
                        $this->CollectionReviews->changeBookStatus($book_review);
                    }
                }
            }
        }
    }
}
