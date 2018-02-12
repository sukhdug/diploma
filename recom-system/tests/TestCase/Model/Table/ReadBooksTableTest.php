<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\ReadBooksTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\ReadBooksTable Test Case
 */
class ReadBooksTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\ReadBooksTable
     */
    public $ReadBooks;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.read_books',
        'app.users',
        'app.books',
        'app.quotes',
        'app.liked_books',
        'app.notification_books',
        'app.reviews',
        'app.readers',
        'app.notifications',
        'app.recommended_books'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('ReadBooks') ? [] : ['className' => ReadBooksTable::class];
        $this->ReadBooks = TableRegistry::get('ReadBooks', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->ReadBooks);

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
