<?php
namespace App\Controllers;

use App\Core\Database;
use App\Factory\ProductFactory;
use App\Core\Request;

class ProductController {
    public function list() {
        require_once __DIR__ . '/../../../views/product_list.php';
    }

    public function add() {
        require_once __DIR__ . '/../../../views/product_add.php';
    }

    public function handleApi(Request $request) {
        $data = $request->getJson();
        $db = (new Database())->getConnection();

        if ($data['action'] === 'delete') {
            $ids = $data['ids'] ?? [];
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $db->prepare("DELETE FROM products WHERE sku IN ($placeholders)");
            $stmt->execute($ids);
            echo json_encode(['success' => true]);
        } elseif ($data['action'] === 'save') {
            $product = ProductFactory::create($db, $data['type'], $data);
            echo json_encode(['success' => $product?->save()]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
        }
    }
}
