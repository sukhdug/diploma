<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ReadersTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ReadersTable Test Case
 */
class ReadersTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\ReadersTable
     */
    public $Readers;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.readers',
        'app.notification_books',
        'app.users',
        'app.books',
        'app.quotes',
        'app.liked_books',
        'app.read_books',
        'app.recommended_books',
        'app.reviews',
        'app.notifications'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('Readers') ? [] : ['className' => ReadersTable::class];
        $this->Readers = TableRegistry::get('Readers', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->Readers);

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

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
