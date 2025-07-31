<?php
namespace App\Models;

class DVD extends Product {
    public function save(): bool {
        $stmt = $this->pdo->prepare("INSERT INTO products (sku, name, price, type, size) VALUES (?, ?, ?, 'DVD', ?)");
        return $stmt->execute([
            $this->data['sku'],
            $this->data['name'],
            $this->data['price'],
            $this->data['size']
        ]);
    }
}
