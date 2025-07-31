<?php
namespace App\Core;
class Request {
    public function getPath(): string {
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        return rtrim($uri, '/');
    }
    public function getJson(): array {
        return json_decode(file_get_contents('php://input'), true);
    }
}
