<?php

require_once __DIR__ . '/../../vendor/autoload.php';

use App\Core\Database;
use App\Core\Request;
use App\Factory\ProductFactory;

header('Content-Type: application/json');

$request = new Request();
$data = $request->getJson();

$db = (new Database())->getConnection();

if (!isset($data['action'])) {
    echo json_encode(['success' => false, 'message' => 'Action not specified']);
    exit;
}

if ($data['action'] === 'save') {
    if (!isset($data['type'])) {
        echo json_encode(['success' => false, 'message' => 'Product type missing']);
        exit;
    }

    $product = ProductFactory::create($db, $data['type'], $data);
    if ($product && $product->save()) {
        echo json_encode(['success' => true, 'message' => 'Product saved']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save product']);
    }

} elseif ($data['action'] === 'delete') {
    $ids = $data['ids'] ?? [];

    if (!is_array($ids) || count($ids) === 0) {
        echo json_encode(['success' => false, 'message' => 'No SKUs provided']);
        exit;
    }

    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $stmt = $db->prepare("DELETE FROM products WHERE sku IN ($placeholders)");

    if ($stmt->execute($ids)) {
        echo json_encode(['success' => true, 'message' => 'Products deleted']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to delete']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid action']);
}
