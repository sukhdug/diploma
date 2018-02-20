<?php

namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Books Model
 *
 * @property \App\Model\Table\QuotesTable|\Cake\ORM\Association\BelongsTo $Quotes
 * @property \App\Model\Table\LikedBooksTable|\Cake\ORM\Association\HasMany $LikedBooks
 * @property \App\Model\Table\NotificationBooksTable|\Cake\ORM\Association\HasMany $NotificationBooks
 * @property \App\Model\Table\QuotesTable|\Cake\ORM\Association\HasMany $Quotes
 * @property \App\Model\Table\ReadBooksTable|\Cake\ORM\Association\HasMany $ReadBooks
 * @property \App\Model\Table\RecommendedBooksTable|\Cake\ORM\Association\HasMany $RecommendedBooks
 * @property \App\Model\Table\ReviewsTable|\Cake\ORM\Association\HasMany $Reviews
 *
 * @method \App\Model\Entity\Book get($primaryKey, $options = [])
 * @method \App\Model\Entity\Book newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Book[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Book|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Book patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Book[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Book findOrCreate($search, callable $callback = null, $options = [])
 */
class BooksTable extends Table {

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config) {
        parent::initialize($config);

        $this->setTable('books');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsTo('Quotes', [
            'foreignKey' => 'quote_id'
        ]);
        $this->hasMany('LikedBooks', [
            'foreignKey' => 'book_id'
        ]);
        $this->hasMany('NotificationBooks', [
            'foreignKey' => 'book_id'
        ]);
        $this->hasMany('Quotes', [
            'foreignKey' => 'book_id'
        ]);
        $this->hasMany('ReadBooks', [
            'foreignKey' => 'book_id'
        ]);
        $this->hasMany('RecommendedBooks', [
            'foreignKey' => 'book_id'
        ]);
        $this->hasMany('Reviews', [
            'foreignKey' => 'book_id'
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
                ->scalar('name')
                ->maxLength('name', 255)
                ->requirePresence('name', 'create')
                ->notEmpty('name');

        $validator
                ->scalar('authors')
                ->maxLength('authors', 255)
                ->requirePresence('authors', 'create')
                ->notEmpty('authors');

        $validator
                ->integer('publication_date')
                ->allowEmpty('publication_date');

        $validator
                ->scalar('cover')
                ->maxLength('cover', 255)
                ->requirePresence('cover', 'create')
                ->notEmpty('cover');

        $validator
                ->scalar('genres')
                ->maxLength('genres', 255)
                ->requirePresence('genres', 'create')
                ->notEmpty('genres');

        $validator
                ->scalar('isbn')
                ->maxLength('isbn', 255)
                ->requirePresence('isbn', 'create')
                ->notEmpty('isbn')
                ->add('isbn', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

        $validator
                ->scalar('rating')
                ->maxLength('rating', 10)
                ->allowEmpty('rating');

        $validator
                ->scalar('description')
                ->requirePresence('description', 'create')
                ->notEmpty('description');

        $validator
                ->scalar('link')
                ->maxLength('link', 255)
                ->requirePresence('link', 'create')
                ->notEmpty('link');

        $validator
                ->scalar('fromsite')
                ->maxLength('fromsite', 45)
                ->requirePresence('fromsite', 'create')
                ->notEmpty('fromsite');

        $validator
                ->integer('reviews_count')
                ->requirePresence('reviews_count', 'create')
                ->notEmpty('reviews_count');

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
        $rules->add($rules->existsIn(['quote_id'], 'Quotes'));

        return $rules;
    }

    public function addBook($addBook) {
        $book = $this->newEntity();
        $book->name = $addBook['name'];
        $book->authors = $addBook['authors'];
        $book->cover = $addBook['cover'];
        $book->genres = $addBook['genres'];
        $book->isbn = $addBook['isbn'];
        $book->rating = $addBook['rating'];
        $book->description = $addBook['description'];
        $book->link = $addBook['link'];
        $book->fromsite = $addBook['fromsite'];
        $book->reviews_count = $addBook['reviews_count'];
        if ($this->save($book)) {
            return true;
        }
        return false;
    }

    public function checkISBN($isbn) {
        $foundisbn = $this->find('all')->where(['isbn' => $isbn])->first();
        return $foundisbn;
    }

}
