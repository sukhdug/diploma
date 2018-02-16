<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Readers Model
 *
 * @property \App\Model\Table\NotificationBooksTable|\Cake\ORM\Association\HasMany $NotificationBooks
 * @property \App\Model\Table\RecommendedBooksTable|\Cake\ORM\Association\HasMany $RecommendedBooks
 * @property \App\Model\Table\ReviewsTable|\Cake\ORM\Association\HasMany $Reviews
 *
 * @method \App\Model\Entity\Reader get($primaryKey, $options = [])
 * @method \App\Model\Entity\Reader newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Reader[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Reader|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Reader patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Reader[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Reader findOrCreate($search, callable $callback = null, $options = [])
 */
class ReadersTable extends Table
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

        $this->setTable('readers');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->hasMany('NotificationBooks', [
            'foreignKey' => 'reader_id'
        ]);
        $this->hasMany('RecommendedBooks', [
            'foreignKey' => 'reader_id'
        ]);
        $this->hasMany('Reviews', [
            'foreignKey' => 'reader_id'
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
            ->scalar('username')
            ->maxLength('username', 255)
            ->requirePresence('username', 'create')
            ->notEmpty('username');

        $validator
            ->scalar('fromsite')
            ->maxLength('fromsite', 45)
            ->requirePresence('fromsite', 'create')
            ->notEmpty('fromsite');

        $validator
            ->integer('reviews_count')
            ->requirePresence('reviews_count', 'create')
            ->notEmpty('reviews_count');

        $validator
            ->scalar('link')
            ->maxLength('link', 255)
            ->requirePresence('link', 'create')
            ->notEmpty('link')
            ->add('link', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

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
        $rules->add($rules->isUnique(['username']));
        $rules->add($rules->isUnique(['link']));

        return $rules;
    }
}
