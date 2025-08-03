DROP INDEX "email_idx";--> statement-breakpoint
CREATE INDEX "email_idx" ON "expenses" USING btree ("user_id");