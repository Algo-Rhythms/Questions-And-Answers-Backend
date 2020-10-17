
\c questions-and-answers;

CREATE TABLE "products" (
 "product_id"     integer NOT NULL GENERATED ALWAYS AS IDENTITY,
 "product_name" varchar(255) NOT NULL,
 CONSTRAINT "PK_products" PRIMARY KEY ( "product_id" )
);

CREATE TABLE "questions" (
 "id"                   integer NOT NULL,
 "body"                 text NOT NULL,
 "date_written"         date NOT NULL,
 "asker_name"           text NOT NULL,
 "helpfulness"          integer NOT NULL,
 "reported"             integer NULL,
 "asker_email"          text NOT NULL,
 "product_id"           integer NOT NULL,
 CONSTRAINT "PK_questions" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_72" FOREIGN KEY ( "product_id" ) REFERENCES "products" ( "product_id" )
);

CREATE INDEX "fkIdx_72" ON "questions" (
 "product_id"
);

CREATE TABLE "answers" (
 "answer_id"     integer NOT NULL,
 "body"          text NOT NULL,
 "date"          date NOT NULL,
 "answerer_name" text NOT NULL,
 "helpfulness"   integer NOT NULL,
 "email"         text NOT NULL,
 "question_id"   integer NOT NULL,
 CONSTRAINT "PK_answers" PRIMARY KEY ( "answer_id" ),
 CONSTRAINT "FK_75" FOREIGN KEY ( "question_id" ) REFERENCES "questions" ( "question_id" )
);

CREATE INDEX "fkIdx_75" ON "answers" (
 "question_id"
);

CREATE TABLE "photos" (
 "id"        int NOT NULL GENERATED ALWAYS AS IDENTITY,
 "url"       text NOT NULL,
 "answer_id" integer NOT NULL,
 CONSTRAINT "PK_photos" PRIMARY KEY ( "id" ),
 CONSTRAINT "FK_78" FOREIGN KEY ( "answer_id" ) REFERENCES "answers" ( "answer_id" )
);

CREATE INDEX "fkIdx_78" ON "photos" (
 "answer_id"
);

