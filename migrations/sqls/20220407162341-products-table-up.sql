/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Products(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, 
    name VARCHAR(100), 
    price NUMERIC
    );