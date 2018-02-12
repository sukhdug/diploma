<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Book Entity
 *
 * @property int $id
 * @property string $name
 * @property string $authors
 * @property int $publication_date
 * @property string $cover
 * @property string $genres
 * @property string $isbn
 * @property string $rating
 * @property string $description
 * @property string $link
 * @property string $fromsite
 * @property int $reviews_count
 * @property int $quote_id
 *
 * @property \App\Model\Entity\Quote[] $quotes
 * @property \App\Model\Entity\LikedBook[] $liked_books
 * @property \App\Model\Entity\NotificationBook[] $notification_books
 * @property \App\Model\Entity\ReadBook[] $read_books
 * @property \App\Model\Entity\RecommendedBook[] $recommended_books
 * @property \App\Model\Entity\Review[] $reviews
 */
class Book extends Entity
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
        'name' => true,
        'authors' => true,
        'publication_date' => true,
        'cover' => true,
        'genres' => true,
        'isbn' => true,
        'rating' => true,
        'description' => true,
        'link' => true,
        'fromsite' => true,
        'reviews_count' => true,
        'quote_id' => true,
        'quotes' => true,
        'liked_books' => true,
        'notification_books' => true,
        'read_books' => true,
        'recommended_books' => true,
        'reviews' => true
    ];
}
