<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * NotificationBook Entity
 *
 * @property int $id
 * @property int $user_id
 * @property int $book_id
 * @property int $review_id
 * @property int $reader_id
 * @property int $notification_id
 * @property string $user_choose
 *
 * @property \App\Model\Entity\User $user
 * @property \App\Model\Entity\Book $book
 * @property \App\Model\Entity\Review $review
 * @property \App\Model\Entity\Reader $reader
 * @property \App\Model\Entity\Notification $notification
 */
class NotificationBook extends Entity
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
        'user_id' => true,
        'book_id' => true,
        'review_id' => true,
        'reader_id' => true,
        'notification_id' => true,
        'user_choose' => true,
        'user' => true,
        'book' => true,
        'review' => true,
        'reader' => true,
        'notification' => true
    ];
}
