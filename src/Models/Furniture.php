<?php
namespace App\Models;

class Furniture extends Product {
    public function save(): bool {
        $stmt = $this->pdo->prepare("INSERT INTO products (sku, name, price, type, height, width, length) VALUES (?, ?, ?, 'Furniture', ?, ?, ?)");
        return $stmt->execute([
            $this->data['sku'],
            $this->data['name'],
            $this->data['price'],
            $this->data['height'],
            $this->data['width'],
            $this->data['length']
        ]);
    }
}
