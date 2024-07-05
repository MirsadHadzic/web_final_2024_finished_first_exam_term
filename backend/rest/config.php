<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config {
    public static function DB_NAME() {
        return Config::get_env("DB_NAME", "webfinal"); // webfinal
    }
    public static function DB_PORT() {
        return Config::get_env("DB_PORT", 25060); // 3306
    }
    public static function DB_USER() {
        return Config::get_env("DB_USER", "doadmin"); // root
    }
    public static function DB_PASSWORD() {
        return Config::get_env("DB_PASSWORD", "AVNS_gs32YDhMw0hAJEXUnRH"); // root
    }
    public static function DB_HOST() {
        return Config::get_env("DB_HOST", "db-mysql-fra1-55514-do-user-14099042-0.a.db.ondigitalocean.com"); // localhost
    }
    public static function JWT_SECRET() {
        return Config::get_env("JWT_SECRET", "mehagamehaga"); // mehagamehaga
    }
    public static function get_env($name, $default) {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}