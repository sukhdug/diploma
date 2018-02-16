<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Reader Entity
 *
 * @property int $id
 * @property string $username
 * @property string $fromsite
 * @property int $reviews_count
 * @property string $link
 *
 * @property \App\Model\Entity\NotificationBook[] $notification_books
 * @property \App\Model\Entity\RecommendedBook[] $recommended_books
 * @property \App\Model\Entity\Review[] $reviews
 */
class Reader extends Entity
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
        'username' => true,
        'fromsite' => true,
        'reviews_count' => true,
        'link' => true,
        'notification_books' => true,
        'recommended_books' => true,
        'reviews' => true
    ];
}
