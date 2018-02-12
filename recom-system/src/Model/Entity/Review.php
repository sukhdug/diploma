<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Review Entity
 *
 * @property int $id
 * @property int $book_id
 * @property int $reader_id
 * @property int $rate
 *
 * @property \App\Model\Entity\Book $book
 * @property \App\Model\Entity\Reader $reader
 * @property \App\Model\Entity\NotificationBook[] $notification_books
 * @property \App\Model\Entity\RecommendedBook[] $recommended_books
 */
class Review extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        'book_id' => true,
        'reader_id' => true,
        'rate' => true,
        'book' => true,
        'reader' => true,
        'notification_books' => true,
        'recommended_books' => true
    ];
}
