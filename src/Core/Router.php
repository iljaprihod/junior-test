<?php
namespace App\Core;
use App\Controllers\ProductController;

class Router {
    public function dispatch() {
        $request = new Request();
        switch ($request->getPath()) {
            case '':
            case '/':
                (new ProductController())->list();
                break;
            case '/add':
                (new ProductController())->add();
                break;
            case '/api/product':
                (new ProductController())->handleApi($request);
                break;
            default:
                http_response_code(404);
                echo "404 Not Found";
        }
    }
}
