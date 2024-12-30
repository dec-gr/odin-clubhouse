#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
user_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name TEXT,
last_name TEXT,
email TEXT,
password TEXT,
membership_status BOOLEAN
);

CREATE TABLE IF NOT EXISTS messages (
message_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(user_id),
title TEXT,
content TEXT,
time_stamp DATE
);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
