<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * RecommendedBooks Model
 *
 * @property \App\Model\Table\BooksTable|\Cake\ORM\Association\BelongsTo $Books
 * @property \App\Model\Table\ReadersTable|\Cake\ORM\Association\BelongsTo $Readers
 * @property \App\Model\Table\ReviewsTable|\Cake\ORM\Association\BelongsTo $Reviews
 * @property \App\Model\Table\UsersTable|\Cake\ORM\Association\BelongsTo $Users
 *
 * @method \App\Model\Entity\RecommendedBook get($primaryKey, $options = [])
 * @method \App\Model\Entity\RecommendedBook newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\RecommendedBook[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\RecommendedBook|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\RecommendedBook patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\RecommendedBook[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\RecommendedBook findOrCreate($search, callable $callback = null, $options = [])
 */
class RecommendedBooksTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('recommended_books');
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
        $this->belongsTo('Reviews', [
            'foreignKey' => 'review_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('Users', [
            'foreignKey' => 'user_id',
            'joinType' => 'INNER'
        ]);
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->integer('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('user_choose')
            ->maxLength('user_choose', 100)
            ->allowEmpty('user_choose');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['book_id'], 'Books'));
        $rules->add($rules->existsIn(['reader_id'], 'Readers'));
        $rules->add($rules->existsIn(['review_id'], 'Reviews'));
        $rules->add($rules->existsIn(['user_id'], 'Users'));

        return $rules;
    }
}
