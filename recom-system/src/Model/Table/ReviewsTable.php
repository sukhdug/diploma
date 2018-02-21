<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Reviews Model
 *
 * @property \App\Model\Table\BooksTable|\Cake\ORM\Association\BelongsTo $Books
 * @property \App\Model\Table\ReadersTable|\Cake\ORM\Association\BelongsTo $Readers
 * @property \App\Model\Table\NotificationBooksTable|\Cake\ORM\Association\HasMany $NotificationBooks
 * @property \App\Model\Table\RecommendedBooksTable|\Cake\ORM\Association\HasMany $RecommendedBooks
 *
 * @method \App\Model\Entity\Review get($primaryKey, $options = [])
 * @method \App\Model\Entity\Review newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Review[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Review|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Review patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Review[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Review findOrCreate($search, callable $callback = null, $options = [])
 */
class ReviewsTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('reviews');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Books', [
            'foreignKey' => 'book_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Readers', [
            'foreignKey' => 'reader_id',
            'joinType' => 'INNER'
        ]);
        $this->hasMany('NotificationBooks', [
            'foreignKey' => 'review_id'
        ]);
        $this->hasMany('RecommendedBooks', [
            'foreignKey' => 'review_id'
        ]);
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
                ->scalar('rate')
                ->maxLength('rate', 10)
                ->allowEmpty('rate');

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
        $rules->add($rules->existsIn(['book_id'], 'Books'));
        $rules->add($rules->existsIn(['reader_id'], 'Readers'));

        return $rules;
    }

    public function addReview($addReview) {
        $review = $this->newEntity();
        $review->book_id = $addReview['book_id'];
        $review->reader_id = $addReview['reader_id'];
        $review->rate = $addReview['rate'];
        if ($this->save($review)) {
            return true;
        }
        return false;
    }

    public function getReview($book_id, $reader_id) {
        $review = $this->find('all')
                ->where(['book_id' => $book_id])
                ->where(['reader_id' => $reader_id])
                ->first();
        return $review;
    }
}
