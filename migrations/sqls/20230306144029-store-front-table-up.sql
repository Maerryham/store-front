CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(255) NOT NULL DEFAULT '',
    price NUMERIC
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(255) NOT NULL DEFAULT '',
    lastName VARCHAR(255) NOT NULL DEFAULT '',
    password VARCHAR(255) NOT NULL DEFAULT ''
);

CREATE TYPE enum_type AS ENUM('active','complete');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY  KEY,
    quantity integer,
    status enum_type,
    user_id BIGINT REFERENCES users (id),
    product_id BIGINT REFERENCES products (id)
);