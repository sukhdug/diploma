<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Shell;

use Cake\Console\ConsoleOptionParser;
use Cake\Console\Shell;
use Cake\Log\Log;
use Psy\Shell as PsyShell;

/**
 * Description of BooksOfGenres
 *
 * @author handy-surun.dugurzhap
 */
class BooksOfGenres extends Shell {
    
    public function initialize() {
        parent::initialize();
        $this->loadModel("Genres");
    }

    /**
     * Start the shell and interactive console.
     *
     * @return int|null
     */
    public function main(){
       
        $total = $this->Genres->find()->count();

     //   for ($id = 1; $id < $total; $id++) {

            $id = 1;
            $genre = $this->Genres->findById($id)->firstOrFail();
            $pageOfGenre = $genre['link_livelib'];
            $dom = new \DOMDocument();
   //         $internalErrors = libxml_use_internal_errors(true);
            $dom->loadHTMLFile($pageOfGenre);
            //$finder = new \DOMXPath($dom);
            //$class = "block-book-title";
           // $query = sprintf("//*[contains(@class, '%s')]", $class);
            //$nodes = $finder->query($query);
            $nodes = $dom->getElementsByTagName('div');
            foreach ($nodes as $node) {
                $this->out($node->nodeValue . PHP_EOL);
            }
            //libxml_use_internal_errors($internalErrors);
        //}
    }
}
