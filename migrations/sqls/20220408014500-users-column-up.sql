/* Replace with your SQL commands */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE Users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, 
    firstName VARCHAR(100), 
    lastName VARCHAR(100),
    password VARCHAR(100)
    );