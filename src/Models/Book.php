<?php
namespace App\Models;

class Book extends Product {
    public function save(): bool {
        $stmt = $this->pdo->prepare("INSERT INTO products (sku, name, price, type, weight) VALUES (?, ?, ?, 'Book', ?)");
        return $stmt->execute([
            $this->data['sku'],
            $this->data['name'],
            $this->data['price'],
            $this->data['weight']
        ]);
    }
}
