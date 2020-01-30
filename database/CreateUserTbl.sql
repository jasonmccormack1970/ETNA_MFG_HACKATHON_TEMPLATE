CREATE DATABASE todo2
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1;

drop table if exists users;
drop table if exists tasks; 

CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(128) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(128) COLLATE pg_catalog."default",
    last_name character varying(128) COLLATE pg_catalog."default",
    department character varying(128) COLLATE pg_catalog."default",
    api_key character varying(128) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    active boolean DEFAULT true,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_api_key_key UNIQUE (api_key)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;

CREATE TABLE public.tasks
(
    id integer NOT NULL DEFAULT nextval('contests_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    notes text COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'draft'::character varying,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_to integer NOT NULL,
    CONSTRAINT contests_pkey PRIMARY KEY (id),
    CONSTRAINT contests_created_by_fkey FOREIGN KEY (assigned_to)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.tasks
    OWNER to postgres;    

INSERT INTO public.users(
	email, first_name, last_name, department, api_key )
	VALUES 
       (E'samer@agilelabs.com',E'Samer',E'Buna',E"R&D",E'4242'),
       (E'creative@mind.com',E'Creative',E'Mind',E"DevOps",E'8578');
  

INSERT INTO public.tasks(
 title, notes, status, assigned_to)
	VALUES  
     (E'Test Task 827',E'This is a test task',E'draft',E'2');
     (E'Test Task 413',E'This is a test task',E'draft',E'1');
     (E'Test Task 172',E'This is a test task',E'draft',E'1');