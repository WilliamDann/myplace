-- create schema and set it to our search path
create schema if not exists myplace;
set search_path to myplace;

-- create tables
create table if not exists accounts (
    id              serial          primary key,
    email           varchar(255)    not null unique,
    password_hash   varchar(255)    not null,
    display_name    varchar(255)    not null
);