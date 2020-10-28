
\c questionsandanswers;

CREATE TABLE public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
    name text COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER to postgres;


CREATE TABLE public.questions
(
    q_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
    body text COLLATE pg_catalog."default",
    date_written date,
    asker_name text COLLATE pg_catalog."default",
    helpful integer,
    reported integer,
    asker_email text COLLATE pg_catalog."default",
    product_id integer,
    CONSTRAINT questions_pkey PRIMARY KEY (q_id),
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.questions
    OWNER to postgres;
-- Index: question_index

-- DROP INDEX public.question_index;

CREATE INDEX question_index
    ON public.questions USING btree
    (product_id ASC NULLS LAST)
    TABLESPACE pg_default;


CREATE TABLE public.answers
(
    a_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
    answer_body text COLLATE pg_catalog."default",
    date date,
    answerer_name text COLLATE pg_catalog."default",
    helpfulness integer,
    question_id integer,
    reported integer,
    email text COLLATE pg_catalog."default",
    CONSTRAINT id PRIMARY KEY (a_id),
    CONSTRAINT question_id FOREIGN KEY (question_id)
        REFERENCES public.questions (q_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.answers
    OWNER to postgres;
-- Index: answer_index

-- DROP INDEX public.answer_index;

CREATE INDEX answer_index
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;


CREATE TABLE public.photos
(
    p_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999999 CACHE 1 ),
    url text COLLATE pg_catalog."default",
    answer_id integer,
    CONSTRAINT "photos _pkey" PRIMARY KEY (p_id),
    CONSTRAINT answer_id FOREIGN KEY (answer_id)
        REFERENCES public.answers (a_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.photos
    OWNER to postgres;
-- Index: photo_index

-- DROP INDEX public.photo_index;

CREATE INDEX photo_index
    ON public.photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;

