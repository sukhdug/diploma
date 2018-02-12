<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\BotCommandsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\BotCommandsTable Test Case
 */
class BotCommandsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\BotCommandsTable
     */
    public $BotCommands;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.bot_commands'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('BotCommands') ? [] : ['className' => BotCommandsTable::class];
        $this->BotCommands = TableRegistry::get('BotCommands', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->BotCommands);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
