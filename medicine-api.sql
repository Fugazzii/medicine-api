CREATE TABLE "doctors" (
  "id" integer PRIMARY KEY,
  "private_id" varchar(256) UNIQUE NOT NULL,
  "email" varchar(256) UNIQUE NOT NULL,
  "password" varchar(256) NOT NULL,
  "age" integer NOT NULL,
  "gender" boolean NOT NULL,
  "experience_in_years" integer NOT NULL,
  "price_per_hours_in_dollars" numeric NOT NULL,
  "specialty_id" integer NOT NULL,
  "city_id" integer NOT NULL
);

CREATE TABLE "clients" (
  "id" integer PRIMARY KEY,
  "private_id" varchar(256) UNIQUE NOT NULL,
  "email" varchar(256) UNIQUE NOT NULL,
  "age" integer NOT NULL,
  "password" varchar(256) NOT NULL
);

CREATE TABLE "forms" (
  "id" integer PRIMARY KEY,
  "clients_id" integer NOT NULL,
  "description" varchar(1024) DEFAULT null,
  "relevant_specialist_id" integer NOT NULL
);

CREATE TABLE "countries" (
  "id" integer PRIMARY KEY,
  "country" varchar(256)
);

CREATE TABLE "cities" (
  "id" integer PRIMARY KEY,
  "city" varchar(256),
  "country_id" integer
);

CREATE TABLE "specialty" (
  "id" integer PRIMARY KEY,
  "name" varchar(256) NOT NULL
);

ALTER TABLE "clients" ADD FOREIGN KEY ("id") REFERENCES "forms" ("clients_id");

ALTER TABLE "cities" ADD FOREIGN KEY ("country_id") REFERENCES "countries" ("id");

ALTER TABLE "specialty" ADD FOREIGN KEY ("id") REFERENCES "doctors" ("specialty_id");

ALTER TABLE "cities" ADD FOREIGN KEY ("id") REFERENCES "doctors" ("city_id");
