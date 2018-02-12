<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\NotificationBooksTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\NotificationBooksTable Test Case
 */
class NotificationBooksTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\NotificationBooksTable
     */
    public $NotificationBooks;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.notification_books',
        'app.users',
        'app.books',
        'app.quotes',
        'app.liked_books',
        'app.read_books',
        'app.recommended_books',
        'app.reviews',
        'app.readers',
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
        $config = TableRegistry::exists('NotificationBooks') ? [] : ['className' => NotificationBooksTable::class];
        $this->NotificationBooks = TableRegistry::get('NotificationBooks', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->NotificationBooks);

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
