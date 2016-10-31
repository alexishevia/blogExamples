-- enable pgcrypto
CREATE EXTENSION pgcrypto;

-- create user table
CREATE TABLE "user" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL
);
