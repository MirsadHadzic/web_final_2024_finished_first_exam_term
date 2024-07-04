<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config {
    public static function DB_NAME() {
        return Config::get_env("DB_NAME", "webfinal"); // web-project-2024
    }
    // public static function DB_PORT() {
    //     return Config::get_env("DB_PORT", 3306); // 25060
    // }
    public static function DB_USER() {
        return Config::get_env("DB_USER", "root"); // doadmin
    }
    public static function DB_PASSWORD() {
        return Config::get_env("DB_PASSWORD", "root"); // AVNS_UgcnhNUEm6h5lce3bad
    }
    public static function DB_HOST() {
        return Config::get_env("DB_HOST", "localhost"); // web-project-2024-do-user-14099042-0.c.db.ondigitalocean.com
    }
    public static function JWT_SECRET() {
        return Config::get_env("JWT_SECRET", "mehagamehaga");
    }
    public static function get_env($name, $default) {
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}