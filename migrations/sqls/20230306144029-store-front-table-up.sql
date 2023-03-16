CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(255) NOT NULL DEFAULT '',
    price NUMERIC
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY  KEY,
    firstname VARCHAR(255) UNIQUE NOT NULL DEFAULT '',
    lastname VARCHAR(255) NOT NULL DEFAULT '',
    username VARCHAR(255) NOT NULL DEFAULT '',
    password VARCHAR(255) NOT NULL DEFAULT ''
);

CREATE TYPE enum_type AS ENUM('active','complete');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY  KEY,
    user_id BIGINT REFERENCES users (id),
    status enum_type
);

CREATE TABLE IF NOT EXISTS order_product (
    id SERIAL PRIMARY  KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders (id),
    product_id BIGINT REFERENCES products (id)
);