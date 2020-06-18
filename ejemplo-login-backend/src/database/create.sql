DROP TABLE IF EXISTS public.user;

create table public.user(
    id_user SERIAL PRIMARY KEY,
    name varchar(50),
    lastname1 varchar(50),
    lastname2 varchar(50),
    email varchar(60),
    password varchar(300),
    reset_password_token text,
    reset_password_expiration date
);