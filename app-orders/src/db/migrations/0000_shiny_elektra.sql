CREATE TYPE "public"."order_status" AS ENUM('pending', 'canceled', 'paid');--> statement-breakpoint
CREATE TABLE "custumers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"address" text NOT NULL,
	"state" text NOT NULL,
	"zip_code" text NOT NULL,
	"country" text NOT NULL,
	"date_of_birth" date,
	CONSTRAINT "custumers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_id" text NOT NULL,
	"amount" integer NOT NULL,
	"status" "order_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_custumers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."custumers"("id") ON DELETE no action ON UPDATE no action;