/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(255) NOT NULL DEFAULT '',
    price NUMERIC
    CONSTRAINT products_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR(255) NOT NULL DEFAULT '',
    lastName VARCHAR(255) NOT NULL DEFAULT '',
    password VARCHAR(255) NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY  KEY,
    user_id VARCHAR(255) NOT NULL DEFAULT '',
    product_id VARCHAR(255)[],
    quantity integer[],
    status enum('pending','success','failed'),
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);