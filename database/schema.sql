
\c questions-and-answers;

CREATE TABLE public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_products" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.products
    OWNER to postgres;

CREATE TABLE public.questions
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    body text COLLATE pg_catalog."default" NOT NULL,
    date_written date NOT NULL,
    asker_name text COLLATE pg_catalog."default" NOT NULL,
    asker_email text COLLATE pg_catalog."default" NOT NULL,
    reported integer,
    helpful integer,
    CONSTRAINT questions_pkey PRIMARY KEY (id),
    CONSTRAINT "FKproduct_id" FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.questions
    OWNER to postgres;

CREATE TABLE public.answers
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( CYCLE INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2000000000 CACHE 1 ),
    body text COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    answerer_name text COLLATE pg_catalog."default" NOT NULL,
    helpfulness integer NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    question_id integer NOT NULL,
    reported integer,
    CONSTRAINT "PK_answers" PRIMARY KEY (id),
    CONSTRAINT "FK_75" FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.answers
    OWNER to postgres;

CREATE INDEX "fkIdx_75"
    ON public.answers USING btree
    (question_id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE TABLE public.photos
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    url text COLLATE pg_catalog."default" NOT NULL,
    answer_id integer NOT NULL,
    CONSTRAINT "PK_photos" PRIMARY KEY (id),
    CONSTRAINT "FK_78" FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.photos
    OWNER to postgres;

CREATE INDEX "fkIdx_78"
    ON public.photos USING btree
    (answer_id ASC NULLS LAST)
    TABLESPACE pg_default;
