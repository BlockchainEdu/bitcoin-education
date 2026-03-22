import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  serial,
  jsonb,
  date,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const member = pgTable("member", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash"),
  name: text("name").default(""),
  role: text("role").default("free"),
  is_paid: boolean("is_paid").default(false),
  stripe_customer_id: text("stripe_customer_id"),
  paid_at: timestamp("paid_at"),
  google_id: text("google_id").unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const job = pgTable("job", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  company_name: text("company_name").notNull(),
  company_logo: text("company_logo"),
  company_url: text("company_url"),
  apply_url: text("apply_url").notNull(),
  location: text("location").default("Remote"),
  job_type: text("job_type").default("full-time"),
  salary_min: integer("salary_min"),
  salary_max: integer("salary_max"),
  salary_currency: text("salary_currency").default("USD"),
  description: text("description"),
  tags: jsonb("tags").default([]),
  status: text("status").default("pending"),
  tier: text("tier").default("standard"),
  posted_at: timestamp("posted_at").defaultNow(),
  expires_at: timestamp("expires_at"),
  stripe_subscription_id: text("stripe_subscription_id"),
  posted_by: uuid("posted_by").references(() => member.id),
  source: text("source"),
});

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => member.id),
    lesson_id: text("lesson_id").notNull(),
    completed_at: timestamp("completed_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("lesson_progress_user_lesson_idx").on(
      table.user_id,
      table.lesson_id
    ),
  ]
);

export const jobAlert = pgTable(
  "job_alert",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    filters: jsonb("filters"),
    label: text("label").notNull(),
    frequency: text("frequency").default("daily"),
    active: boolean("active").default(true),
    unsubscribe_token: uuid("unsubscribe_token").defaultRandom(),
    last_sent_at: timestamp("last_sent_at"),
  },
  (table) => [
    uniqueIndex("job_alert_email_label_idx").on(table.email, table.label),
  ]
);

export const colivingAvailability = pgTable(
  "coliving_availability",
  {
    id: serial("id").primaryKey(),
    property: text("property").notNull(),
    date: date("date").notNull(),
    available: boolean("available").default(true),
    min_nights: integer("min_nights").default(3),
    source: text("source"),
    synced_at: timestamp("synced_at"),
  },
  (table) => [
    uniqueIndex("coliving_availability_property_date_idx").on(
      table.property,
      table.date
    ),
  ]
);

export const ventureApplication = pgTable("venture_application", {
  id: uuid("id").defaultRandom().primaryKey(),
  founder_name: text("founder_name").notNull(),
  email: text("email").notNull(),
  linkedin: text("linkedin"),
  university: text("university"),
  role: text("role"),
  team_size: text("team_size"),
  team_breakdown: text("team_breakdown"),
  how_met: text("how_met"),
  worked_together: text("worked_together"),
  who_codes_who_sells: text("who_codes_who_sells"),
  one_liner: text("one_liner").notNull(),
  problem: text("problem").notNull(),
  insight: text("insight"),
  how_it_works: text("how_it_works"),
  stage: text("stage"),
  most_impressive: text("most_impressive"),
  users_count: text("users_count"),
  project_url: text("project_url"),
  demo_url: text("demo_url"),
  revenue_model: text("revenue_model"),
  competitors: text("competitors"),
  twelve_month_plan: text("twelve_month_plan"),
  unfair_advantage: text("unfair_advantage"),
  raising_amount: text("raising_amount"),
  use_of_funds: text("use_of_funds"),
  raised_before: text("raised_before"),
  why_ben: text("why_ben"),
  ten_year_question: text("ten_year_question"),
  contrarian_belief: text("contrarian_belief"),
  anything_else: text("anything_else"),
  referral_source: text("referral_source"),
  status: text("status").default("pending"),
  created_at: timestamp("created_at").defaultNow(),
});

export const university = pgTable("university", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  image_url: text("image_url"),
  num_people: integer("num_people").default(0),
});

export const student = pgTable("student", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title"),
  image_url: text("image_url"),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  university: text("university"),
});

export const application = pgTable("application", {
  id: uuid("id").defaultRandom().primaryKey(),
  type: text("type").default("coliving"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  telegram: text("telegram"),
  linkedin: text("linkedin"),
  github: text("github"),
  country: text("country"),
  role: text("role"),
  startup_name: text("startup_name"),
  one_liner: text("one_liner"),
  stage: text("stage"),
  what_building: text("what_building"),
  pitch_url: text("pitch_url"),
  preferred_location: text("preferred_location"),
  preferred_dates: text("preferred_dates"),
  why_join: text("why_join"),
  what_contribute: text("what_contribute"),
  dietary: text("dietary"),
  how_heard: text("how_heard"),
  status: text("status").default("pending"),
  created_at: timestamp("created_at").defaultNow(),
});
