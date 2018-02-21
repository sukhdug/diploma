<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * CollectionReview Entity
 *
 * @property int $id
 * @property string $isbn
 * @property string $link
 * @property int $reviews_count
 * @property string $status
 */
class CollectionReview extends Entity
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
        'isbn' => true,
        'link' => true,
        'reviews_count' => true,
        'status' => true
    ];
}
