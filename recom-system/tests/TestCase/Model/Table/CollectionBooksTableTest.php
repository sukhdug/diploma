<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\CollectionBooksTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\CollectionBooksTable Test Case
 */
class CollectionBooksTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\CollectionBooksTable
     */
    public $CollectionBooks;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.collection_books'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('CollectionBooks') ? [] : ['className' => CollectionBooksTable::class];
        $this->CollectionBooks = TableRegistry::get('CollectionBooks', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->CollectionBooks);

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
