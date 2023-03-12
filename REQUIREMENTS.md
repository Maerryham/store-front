# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index d
- Show d
- Create [token required] d
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] d
- Show [token required] d
- Create N[token required] d

#### Orders
- Current Order by user (args: user id)[token required] d
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

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

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

#### How to connect the database
POSTGRES_HOST=rogue.db.elephantsql.com
POSTGRES_DB=yirevvgc
POSTGRES_USER=yirevvgc
POSTGRES_PASSWORD=buTTx61-EbZLiQf_yMSG8NbJoWK4F-80
BYCRYPT_PASSWORD=password
SALT_ROUNDS=10
ENV=dev
TOKEN_SECRET=mytokenSecret

#### Routes
Products
GET  /api/products          Get All Products
POST /api/products          Create Products
GET /api/products/:id       Get product by id


Users
GET  /api/users             Get All Users
POST /api/users             Create User
GET /api/users/:id          Get user by id


Orders
GET  /api/orders             Get All Orders
POST /api/orders             Create Order
GET /api/orders/:id          Get order by id


OrderProduct
POST  /orders/1/products/1   Add Product to user order
GET /api/users/1/orders?status=complete       Complete Order by User
GET /api/users/1/orders?status=active         Active Order by User


#### Database schema

Orders

id  - integer
user_id - string
status - enum


OrderProduct

id - integer
quantity - integer
order_id - integer
user_id  - integer
product_id - integer
