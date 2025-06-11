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

create table if not exists items (
    id              serial          primary key,
    upc             varchar(12)     not null,
    display_name    varchar(255)    not null,
    "description"   varchar(255)    not null,
    added_at        bigint          not null,   
);

create table if not exists items_accounts (
    id              serial          primary key,
    account_id      integer         not null references accounts(id) on delete cascade,
    item_id         integer         not null references items(id) on delete cascade,
)