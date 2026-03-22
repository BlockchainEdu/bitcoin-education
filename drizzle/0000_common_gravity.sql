CREATE TABLE "application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text DEFAULT 'coliving',
	"name" text NOT NULL,
	"email" text NOT NULL,
	"telegram" text,
	"linkedin" text,
	"github" text,
	"country" text,
	"role" text,
	"startup_name" text,
	"one_liner" text,
	"stage" text,
	"what_building" text,
	"pitch_url" text,
	"preferred_location" text,
	"preferred_dates" text,
	"why_join" text,
	"what_contribute" text,
	"dietary" text,
	"how_heard" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "coliving_availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"property" text NOT NULL,
	"date" date NOT NULL,
	"available" boolean DEFAULT true,
	"min_nights" integer DEFAULT 3,
	"source" text,
	"synced_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "job" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"company_name" text NOT NULL,
	"company_logo" text,
	"company_url" text,
	"apply_url" text NOT NULL,
	"location" text DEFAULT 'Remote',
	"job_type" text DEFAULT 'full-time',
	"salary_min" integer,
	"salary_max" integer,
	"salary_currency" text DEFAULT 'USD',
	"description" text,
	"tags" jsonb DEFAULT '[]'::jsonb,
	"status" text DEFAULT 'pending',
	"tier" text DEFAULT 'standard',
	"posted_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"stripe_subscription_id" text,
	"posted_by" uuid,
	"source" text
);
--> statement-breakpoint
CREATE TABLE "job_alert" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"filters" jsonb,
	"label" text NOT NULL,
	"frequency" text DEFAULT 'daily',
	"active" boolean DEFAULT true,
	"unsubscribe_token" uuid DEFAULT gen_random_uuid(),
	"last_sent_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "lesson_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"lesson_id" text NOT NULL,
	"completed_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text,
	"name" text DEFAULT '',
	"role" text DEFAULT 'free',
	"is_paid" boolean DEFAULT false,
	"stripe_customer_id" text,
	"paid_at" timestamp,
	"google_id" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "member_email_unique" UNIQUE("email"),
	CONSTRAINT "member_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE "student" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text,
	"image_url" text,
	"linkedin" text,
	"twitter" text,
	"university" text
);
--> statement-breakpoint
CREATE TABLE "university" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"image_url" text,
	"num_people" integer DEFAULT 0,
	CONSTRAINT "university_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "venture_application" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"founder_name" text NOT NULL,
	"email" text NOT NULL,
	"linkedin" text,
	"university" text,
	"role" text,
	"team_size" text,
	"team_breakdown" text,
	"how_met" text,
	"worked_together" text,
	"who_codes_who_sells" text,
	"one_liner" text NOT NULL,
	"problem" text NOT NULL,
	"insight" text,
	"how_it_works" text,
	"stage" text,
	"most_impressive" text,
	"users_count" text,
	"project_url" text,
	"demo_url" text,
	"revenue_model" text,
	"competitors" text,
	"twelve_month_plan" text,
	"unfair_advantage" text,
	"raising_amount" text,
	"use_of_funds" text,
	"raised_before" text,
	"why_ben" text,
	"ten_year_question" text,
	"contrarian_belief" text,
	"anything_else" text,
	"referral_source" text,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "job" ADD CONSTRAINT "job_posted_by_member_id_fk" FOREIGN KEY ("posted_by") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_user_id_member_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "coliving_availability_property_date_idx" ON "coliving_availability" USING btree ("property","date");--> statement-breakpoint
CREATE UNIQUE INDEX "job_alert_email_label_idx" ON "job_alert" USING btree ("email","label");--> statement-breakpoint
CREATE UNIQUE INDEX "lesson_progress_user_lesson_idx" ON "lesson_progress" USING btree ("user_id","lesson_id");