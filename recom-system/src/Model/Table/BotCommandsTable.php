<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * BotCommands Model
 *
 * @method \App\Model\Entity\BotCommand get($primaryKey, $options = [])
 * @method \App\Model\Entity\BotCommand newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\BotCommand[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\BotCommand|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\BotCommand patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\BotCommand[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\BotCommand findOrCreate($search, callable $callback = null, $options = [])
 */
class BotCommandsTable extends Table
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

        $this->setTable('bot_commands');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');
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
            ->scalar('command')
            ->maxLength('command', 255)
            ->requirePresence('command', 'create')
            ->notEmpty('command');

        $validator
            ->scalar('description')
            ->requirePresence('description', 'create')
            ->notEmpty('description');

        return $validator;
    }
}
