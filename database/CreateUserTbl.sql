drop table if exists users;
drop table if exists tasks;

CREATE SEQUENCE public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;

CREATE SEQUENCE public.tasks_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.tasks_id_seq
    OWNER TO postgres;
	
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
    id integer NOT NULL DEFAULT nextval('tasks_id_seq'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    notes text COLLATE pg_catalog."default",
    status character varying(10) COLLATE pg_catalog."default" NOT NULL DEFAULT 'draft'::character varying,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_to integer NOT NULL,
    CONSTRAINT tasks_pkey PRIMARY KEY (id),
    CONSTRAINT tasks_created_by_fkey FOREIGN KEY (assigned_to)
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
        (E'fiona.hodges@manf.hackathon.test',E'Fiona',E'Hodges',E'Navigation',E'010'),
        (E'adrian.hill@manf.hackathon.test',E'Adrian',E'Hill',E'Environmental and Consumables',E'020'),
        (E'jake.edmunds@manf.hackathon.test',E'Jake',E'Edmunds',E'Payload Deployment',E'030'),
        (E'wendy.ferguson@manf.hackathon.test',E'Wendy',E'Ferguson',E'Ground Control',E'040'),
        (E'commolly.morrison@manf.hackathon.test',E'Molly',E'Morrison',E'Payload Operations',E'050'),
        (E'emily.randall@manf.hackathon.test',E'Emily',E'Randall',E'Flight research',E'060'),
        (E'gavin.walker@manf.hackathon.test',E'Gavin',E'Walker',E'Illumination Engineering',E'070'),
        (E'faith.anderson@manf.hackathon.test',E'Faith',E'Anderson',E'Propulsion technology',E'080'),
        (E'ian.rutherford@manf.hackathon.test',E'Ian',E'Rutherford',E'Flight research',E'090'),
        (E'stephanie.dickens@manf.hackahon.test',E'Stephanie',E'Dickens',E'Instrumentation and Communications',E'100');

INSERT INTO public.tasks(
 title, notes, status, assigned_to)
	VALUES  
     (E'Pack air freshener',E'The nice smelling one',E'Pending',E'2'),
     (E'Fill fuel tanks',E'Remeber to use unleaded fuel',E'Pending',E'8'),
     (E'Put space maps and good food guide in glove compartment',E'',E'Pending',E'1');