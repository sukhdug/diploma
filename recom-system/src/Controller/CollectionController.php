<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Collection Controller
 *
 *
 * @method \App\Model\Entity\Collection[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class CollectionController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $url = 'https://www.livelib.ru/reader/TibetanFox/reviews';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_exec($ch);
        curl_close($ch);
    }
}
