CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    sku VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('DVD', 'Book', 'Furniture')),
    size INTEGER,
    weight REAL,
    height REAL,
    width REAL,
    length REAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);