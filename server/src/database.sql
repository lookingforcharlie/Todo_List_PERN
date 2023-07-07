-- Run these queries in the CLI to create database and table

CREATE DATABASE pernstack;

-- \c into pernstack,

-- Creating the schema of todo table
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY, 
  description VARCHAR(255), 
  email VARCHAR(255) NOT NULL DEFAULT 'test@test.com', 
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  isFinished BOOLEAN DEFAULT FALSE
); 

-- NOT NULL means it's required, and can't be empty. 