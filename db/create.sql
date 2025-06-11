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

create table if not exists tokens (
    id              serial primary key,
    account_id      integer not null,
    access_token    varchar(255) not null,
    generated_at    bigint not null,
    expires_in     int not null,

    foreign key (account_id) references accounts(id) on delete cascade
);