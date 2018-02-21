<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\CollectionReviewsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\CollectionReviewsTable Test Case
 */
class CollectionReviewsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\CollectionReviewsTable
     */
    public $CollectionReviews;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.collection_reviews'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('CollectionReviews') ? [] : ['className' => CollectionReviewsTable::class];
        $this->CollectionReviews = TableRegistry::get('CollectionReviews', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->CollectionReviews);

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
