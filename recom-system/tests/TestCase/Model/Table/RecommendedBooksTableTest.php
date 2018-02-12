<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\RecommendedBooksTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\RecommendedBooksTable Test Case
 */
class RecommendedBooksTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\RecommendedBooksTable
     */
    public $RecommendedBooks;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.recommended_books',
        'app.books',
        'app.quotes',
        'app.liked_books',
        'app.users',
        'app.notification_books',
        'app.reviews',
        'app.readers',
        'app.notifications',
        'app.read_books'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('RecommendedBooks') ? [] : ['className' => RecommendedBooksTable::class];
        $this->RecommendedBooks = TableRegistry::get('RecommendedBooks', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->RecommendedBooks);

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
