<?php
namespace App\Core;
use PDO;

class Database {
    public function getConnection(): PDO {
        return new PDO(
            "mysql:host=localhost;dbname=product_app;charset=utf8mb4",
            "root", "",
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    }
}
