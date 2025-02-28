<?php

require "../vendor/autoload.php";
require "./services/ExamService.php";

Flight::register('examService', 'ExamService');

require 'routes/ExamRoutes.php';

Flight::map('error', function($e){
    // Log errors
    file_put_contents('logs.txt', $e . PHP_EOL, FILE_APPEND | LOCK_EX);

    Flight::halt($e->getCode(), $e->getMessage());
});

function allow_preflight() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Headers: Request, Origin, Content-Type');
        header('Access-Control-Allow-Origin: *');
        die();
    } else {
        header('Access-Control-Allow-Origin: *');
    }
  }
  allow_preflight();

Flight::start();
 ?>
