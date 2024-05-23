-- Drop statements just here for pre-production phase
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  admin BOOLEAN NOT NULL DEFAULT FALSE,
  organization_id INTEGER 
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER 
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  account_name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  description TEXT,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
);

-- Had to add foreign keys after for orgs and users
ALTER TABLE organizations
  ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;