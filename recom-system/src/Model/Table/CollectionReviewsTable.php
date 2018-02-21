<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * CollectionReviews Model
 *
 * @method \App\Model\Entity\CollectionReview get($primaryKey, $options = [])
 * @method \App\Model\Entity\CollectionReview newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\CollectionReview[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\CollectionReview|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\CollectionReview patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\CollectionReview[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\CollectionReview findOrCreate($search, callable $callback = null, $options = [])
 */
class CollectionReviewsTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('collection_reviews');
        $this->setDisplayField('id');
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
                ->scalar('isbn')
                ->maxLength('isbn', 255)
                ->requirePresence('isbn', 'create')
                ->notEmpty('isbn')
                ->add('isbn', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

        $validator
                ->scalar('link')
                ->maxLength('link', 255)
                ->requirePresence('link', 'create')
                ->notEmpty('link');

        $validator
                ->integer('reviews_count')
                ->requirePresence('reviews_count', 'create')
                ->notEmpty('reviews_count');

        $validator
                ->scalar('status')
                ->maxLength('status', 255)
                ->requirePresence('status', 'create')
                ->notEmpty('status');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules) {
        $rules->add($rules->isUnique(['isbn']));

        return $rules;
    }

    public function addBookReviews($review) {
        $link = $this->newEntity();
        $link->isbn = $review['isbn'];
        $link->reviews_count = $review['reviews_count'];
        $link->link = $review['link'];
        $link->status = $review['status'];
        if ($this->save($link)) {
            return true;
        }
        return false;
    }

}
