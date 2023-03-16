# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index          GET  http://localhost:3000/products          Get All Products
- Show          GET http://localhost:3000/products/:id       Get product by id
- Create [token required] POST http://localhost:3000/products          Create Products
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]  GET  http://localhost:3000/users             Get All Users
- Show [token required]     GET  http://localhost:3000/users/signin      Authenticate User
- Create N[token required]  POST http://localhost:3000/users             Create New User

#### Orders
- Current Order by user (args: user id)[token required]  
                               GET  http://localhost:3000/users/1/orders?status=active
- [OPTIONAL] Completed Orders by user (args: user id)[token required] 
                               GET  http://localhost:3000/users/1/orders?status=complete


#### OrderProducts
- POST  http://localhost:3000/orders/1/products/1   Add Product to user order


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category


#### User
- id
- firstName
- lastName
- password

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY  KEY,
    firstname VARCHAR(255) UNIQUE NOT NULL DEFAULT '',
    lastname VARCHAR(255) NOT NULL DEFAULT '',
    username VARCHAR(255) NOT NULL DEFAULT '',
    password VARCHAR(255) NOT NULL DEFAULT ''
);
#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TYPE enum_type AS ENUM('active','complete');

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY  KEY,
    user_id BIGINT REFERENCES users (id),
    status enum_type
);
#### order_product
CREATE TABLE IF NOT EXISTS order_product (
    id SERIAL PRIMARY  KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders (id),
    product_id BIGINT REFERENCES products (id)
);



