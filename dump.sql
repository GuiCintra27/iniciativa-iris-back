CREATE TABLE users (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"birthDay" DATE NOT NULL,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE newsLetter (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"userId" integer NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "newsLetter_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE contact (
	"id" serial NOT NULL,
	"name" TEXT,
	"email" TEXT NOT NULL,
	"telephone" varchar(15),
	"mesage" TEXT NOT NULL,
	"userId" integer,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "contact_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE sessions (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" integer NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE donates (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"telephone" varchar(15) NOT NULL UNIQUE,
	"genderIdentity" TEXT NOT NULL,
	"pronouns" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "donates_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE volunteers (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"telephone" varchar(15) NOT NULL UNIQUE,
	"linkedIn" TEXT,
	"pronouns" TEXT NOT NULL,
	"irisParticipant" BOOLEAN NOT NULL,
	"occupation" TEXT NOT NULL,
	"skinColorId" integer NOT NULL,
	"officeId" integer NOT NULL,
	"aplyingReason" TEXT NOT NULL,
	"experience" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "volunteers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE userGender (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"genderId" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "userGender_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE offices (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "offices_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE skinColor (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "skinColor_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE genders (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "genders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE comments (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	"comment" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE likes (
	"id" serial NOT NULL,
	"postId" integer NOT NULL,
	"userId" integer NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "likes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE posts (
	"id" serial NOT NULL,
	"adminId" integer NOT NULL,
	"text" TEXT NOT NULL,
	"image" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE admins (
	"id" serial NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"email" TEXT NOT NULL UNIQUE,
	"name" TEXT NOT NULL,
	"photo" TEXT NOT NULL,
	"birthDay" DATE NOT NULL,
	"password" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "admins_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "admin-sessions" (
	"id" serial NOT NULL,
	"adminId" integer NOT NULL,
	"token" integer NOT NULL UNIQUE,
	"created_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "admin sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "newsLetter" ADD CONSTRAINT "newsLetter_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "contact" ADD CONSTRAINT "contact_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "donates" ADD CONSTRAINT "donates_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_fk1" FOREIGN KEY ("skinColorId") REFERENCES "skinColor"("id");
ALTER TABLE "volunteers" ADD CONSTRAINT "volunteers_fk2" FOREIGN KEY ("officeId") REFERENCES "offices"("id");

ALTER TABLE "userGender" ADD CONSTRAINT "userGender_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "userGender" ADD CONSTRAINT "userGender_fk1" FOREIGN KEY ("genderId") REFERENCES "genders"("id");


ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("adminId") REFERENCES "admins"("id");


ALTER TABLE "admin-sessions" ADD CONSTRAINT "admin-sessions_fk0" FOREIGN KEY ("adminId") REFERENCES "admins"("id");






