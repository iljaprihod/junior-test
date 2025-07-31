<?php
namespace App\Models;

use PDO;

abstract class Product {
    protected PDO $pdo;
    protected array $data;

    public function __construct(PDO $pdo, array $data) {
        $this->pdo = $pdo;
        $this->data = $data;
    }

    abstract public function save(): bool;
}
