<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * User Entity
 *
 * @property int $id
 * @property string $username
 * @property int $telegram_id
 *
 * @property \App\Model\Entity\Telegram $telegram
 * @property \App\Model\Entity\LikedBook[] $liked_books
 * @property \App\Model\Entity\NotificationBook[] $notification_books
 * @property \App\Model\Entity\Notification[] $notifications
 * @property \App\Model\Entity\ReadBook[] $read_books
 * @property \App\Model\Entity\RecommendedBook[] $recommended_books
 */
class User extends Entity
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
        'telegram_id' => true,
        'telegram' => true,
        'liked_books' => true,
        'notification_books' => true,
        'notifications' => true,
        'read_books' => true,
        'recommended_books' => true
    ];
}
