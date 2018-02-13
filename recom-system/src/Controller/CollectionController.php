<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Collection Controller
 *
 *
 * @method \App\Model\Entity\Collection[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class CollectionController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
    }

    /**
     * View method
     *
     * @param string|null $id Collection id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
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
    public function add()
    {
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
    public function edit($id = null)
    {
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
    public function delete($id = null)
    {
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
