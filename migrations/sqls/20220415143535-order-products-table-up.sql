/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Order_products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity integer,
    order_id uuid REFERENCES Orders(id) ON DELETE CASCADE,
    product_id uuid REFERENCES Products(id)
);
