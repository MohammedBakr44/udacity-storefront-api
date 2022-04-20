# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

| Endpoint | Request | Parameters | Requires Token | Usage          |
| -------- | ------- | ---------- | -------------- | -------------- |
| **/**    | **GET** | **N/A**    | **False** \*   | **Root Route** |

#### Users:

| Endpoint         | Request    | Parameters                            | Requires Token | Usage               |
| ---------------- | ---------- | ------------------------------------- | -------------- | ------------------- |
| **/api/users**       | **GET**    | **N/A**                               | **True** \*    | **List Users**      |
| **/api/users**       | **POST**   | **firstname, lastname, password**     | **False**      | **Create User**     |
| **/api/users**       | **PUT**    | **id, firstname, lastname, password** | **True** \*    | **Update User**     |
| **/api/users**       | **DELETE** | **id**                                | **True** \*    | **Delete User**     |
| **/api/users/:id**   | **GET**    | **id**                                | **True** \*    | **Load user by Id** |
| **/api/users/login** | **POST**   | **firstname, lastname, password**     | **False**      | **Logs user in**    |

#### Products:

| Endpoint          | Request    | Parameters                    | Requires Token | Usage                  |
| ----------------- | ---------- | ----------------------------- | -------------- | ---------------------- |
| **/api/products**     | **GET**    | **N/A**                       | **False**      | **List products**      |
| **/api/products**     | **POST**   | **name, price**     | **True** \*    | **Create product**     |
| **/api/products**     | **PUT**    | **id, name, price** | **True** \*    | **Update product**     |
| **/api/products**     | **DELETE** | **id**                        | **True** \*    | **Delete product**     |
| **/api/products/:id** | **GET**    | **id**                        | **False**      | **Load product by Id** |

#### Orders:

| Endpoint                 | Request    | Parameters                   | Requires Token | Usage                    |
| ------------------------ | ---------- | ---------------------------- | -------------- | ------------------------ |
| **/api/orders**              | **GET**    | **N/A**                      | **False**      | **List orders**          |
| **/api/orders**              | **POST**   | **status, user_id**          | **True** \*    | **Create order**         |
| **/api/orders**              | **PUT**    | **id, status, user_id**      | **True** \*    | **Update order**         |
| **/api/orders**              | **DELETE** | **id**                       | **True** \*    | **Delete order**         |
| **/api/orders/:id**          | **GET**    | **id**                       | **False**      | **Load order by Id**     |
| **/api/orders/:id/products** | **POST**   | **id, product_id, quantity** | **True** \*    | **Add product to order** |

#### \* A valid JWT token can be obtained by either authorizing a user.

## Database Schema

#### Product

| Field        | Type             | Special Attributes |
| ------------ | ---------------- | ------------------ |
| **id**       | **uuid**       | **Primay Key**     |
| **name**     | **Varchar(100)** | **N/A**            |
| **price**    | **Numeric**      | **N/A**            |

#### User

| Field               | Type             | Special Attributes |
| ------------------- | ---------------- | ------------------ |
| **id**              | **uuid**       | **Primay Key**     |
| **firstname**       | **Varchar(100)** | **N/A**            |
| **lastname**        | **Varchar(100)** | **N/A**            |
| **password**        | **Varchar**      | **N/A**            |

#### Orders

| Field       | Type             | Special Attributes |
| ----------- | ---------------- | ------------------ |
| **id**      | **Serial**       | **Primay Key**     |
| **status**  | **Varchar(100)** | **N/A**            |
| **user_id** | **Varchar(100)** | **Foreign Key**    |

#### Orders_Products

| Field          | Type             | Special Attributes |
| -------------- | ---------------- | ------------------ |
| **id**         | **uuid**       | **Primay Key**     |
| **quantity**   | **Numeric**      | **N/A**            |
| **order_id**   | **Varchar(100)** | **Foreign Key**    |
| **product_id** | **Varchar(100)** | **Foreign Key**    |
