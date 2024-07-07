<?php

require __DIR__ . '/../../../vendor/autoload.php';

//define('BASE_URL', 'http://localhost/Art-gallery-Management-System/live-backend/');

if ($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1') {
    define('BASE_URL', 'http://localhost/final20244/backend/');
} else {
    define('BASE_URL', 'https://walrus-app-4o96g.ondigitalocean.app/backend/');
}

error_reporting(0);

$openapi = \OpenApi\Generator::scan(['../../../rest/routes', './'], ['pattern' => '*.php']);
header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>
