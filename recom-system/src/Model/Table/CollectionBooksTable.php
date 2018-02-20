<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * CollectionBooks Model
 *
 * @method \App\Model\Entity\CollectionBook get($primaryKey, $options = [])
 * @method \App\Model\Entity\CollectionBook newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\CollectionBook[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\CollectionBook|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\CollectionBook patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\CollectionBook[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\CollectionBook findOrCreate($search, callable $callback = null, $options = [])
 */
class CollectionBooksTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('collection_books');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator) {
        $validator
                ->integer('id')
                ->allowEmpty('id', 'create');

        $validator
                ->scalar('name')
                ->maxLength('name', 255)
                ->requirePresence('name', 'create')
                ->notEmpty('name');

        $validator
                ->scalar('isbn')
                ->maxLength('isbn', 255)
                ->requirePresence('isbn', 'create')
                ->notEmpty('isbn');

        $validator
                ->scalar('link')
                ->maxLength('link', 255)
                ->requirePresence('link', 'create')
                ->notEmpty('link');

        $validator
                ->scalar('status')
                ->maxLength('status', 255)
                ->requirePresence('status', 'create')
                ->notEmpty('status');

        return $validator;
    }

    public function addBook($book) {
        if ($this->save($book)) {
            return true;
        }
        return false;
    }

    public function checkISBN($isbn) {
        $foundisbn = $this->find('all')->where(['isbn' => $isbn])->first();
        return $foundisbn;
    }

    public function changeBookStatus($book) {
        $book->status = 'added';
        if ($this->save($book)) {
            return true;
        }
        return false;
    }

}
