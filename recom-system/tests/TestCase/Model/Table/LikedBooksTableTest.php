<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\LikedBooksTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\LikedBooksTable Test Case
 */
class LikedBooksTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\LikedBooksTable
     */
    public $LikedBooks;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.liked_books',
        'app.users',
        'app.books',
        'app.quotes',
        'app.notification_books',
        'app.read_books',
        'app.recommended_books',
        'app.reviews'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('LikedBooks') ? [] : ['className' => LikedBooksTable::class];
        $this->LikedBooks = TableRegistry::get('LikedBooks', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->LikedBooks);

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
