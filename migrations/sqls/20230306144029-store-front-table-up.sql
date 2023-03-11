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

CREATE TYPE enum_type AS ENUM('pending','success','failed');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY  KEY,
    product_id VARCHAR(255)[],
    quantity integer[],
    status enum_type,
    users_id BIGINT REFERENCES users (id)
);