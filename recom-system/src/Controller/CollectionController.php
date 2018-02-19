<?php

namespace App\Controller;

use App\Controller\AppController;

/**
 * Collection Controller
 *
 *
 * @method \App\Model\Entity\Collection[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class CollectionController extends AppController {

    public function initialize() {
        parent::initialize();
        $this->loadModel('Genres');
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index() {
        $id = 1;

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
            echo $books[$id]->nodeValue ."<br>";
            echo $books[$id]->getAttribute('href') . "<br>";
            $isbn = $infos[$id]->nodeValue;
            $afterisbn = stristr($isbn, 'ISBN: ');
            $keywords = preg_split("/[\s,]+/", $afterisbn);
            echo "ISBN: " . $keywords[1] . "<br>";
        }
        libxml_use_internal_errors($internalErrors);
    }

    /**
     * View method
     *
     * @param string|null $id Collection id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null) {
        $collection = $this->Collection->get($id, [
            'contain' => []
        ]);

        $this->set('collection', $collection);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add() {
        $collection = $this->Collection->newEntity();
        if ($this->request->is('post')) {
            $collection = $this->Collection->patchEntity($collection, $this->request->getData());
            if ($this->Collection->save($collection)) {
                $this->Flash->success(__('The collection has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The collection could not be saved. Please, try again.'));
        }
        $this->set(compact('collection'));
    }

    /**
     * Edit method
     *
     * @param string|null $id Collection id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null) {
        $collection = $this->Collection->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $collection = $this->Collection->patchEntity($collection, $this->request->getData());
            if ($this->Collection->save($collection)) {
                $this->Flash->success(__('The collection has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The collection could not be saved. Please, try again.'));
        }
        $this->set(compact('collection'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Collection id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null) {
        $this->request->allowMethod(['post', 'delete']);
        $collection = $this->Collection->get($id);
        if ($this->Collection->delete($collection)) {
            $this->Flash->success(__('The collection has been deleted.'));
        } else {
            $this->Flash->error(__('The collection could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

}
