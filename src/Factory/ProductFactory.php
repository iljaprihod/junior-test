<?php
namespace App\Factory;

use App\Models\{DVD, Book, Furniture, Product};
use PDO;

class ProductFactory {
    protected static array $types = [
        'DVD' => DVD::class,
        'Book' => Book::class,
        'Furniture' => Furniture::class,
    ];

    public static function create(PDO $pdo, string $type, array $data): ?Product {
        return isset(self::$types[$type]) ? new self::$types[$type]($pdo, $data) : null;
    }
}
