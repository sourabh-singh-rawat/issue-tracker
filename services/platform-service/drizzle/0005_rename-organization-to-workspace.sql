ALTER TABLE "identity_organization_preferences" RENAME TO "identity_workspace_preferences";--> statement-breakpoint
ALTER TABLE "organizations" RENAME TO "workspaces";--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" RENAME COLUMN "organization_id" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "workspaces" RENAME COLUMN "parent_organization_id" TO "parent_workspace_id";--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" DROP CONSTRAINT "identity_organization_preferences_identity_id_unique";--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "organizations_tenant_id_slug_unique";--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" DROP CONSTRAINT "identity_organization_preferences_identity_id_identities_id_fk";
--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" DROP CONSTRAINT "identity_organization_preferences_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" DROP CONSTRAINT "identity_organization_preferences_tenant_id_tenants_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "organizations_tenant_id_tenants_id_fk";
--> statement-breakpoint
ALTER TABLE "workspaces" DROP CONSTRAINT "organizations_parent_organization_id_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" ADD CONSTRAINT "identity_workspace_preferences_identity_id_identities_id_fk" FOREIGN KEY ("identity_id") REFERENCES "public"."identities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" ADD CONSTRAINT "identity_workspace_preferences_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" ADD CONSTRAINT "identity_workspace_preferences_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_parent_workspace_id_workspaces_id_fk" FOREIGN KEY ("parent_workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "identity_workspace_preferences" ADD CONSTRAINT "identity_workspace_preferences_identity_id_unique" UNIQUE("identity_id");--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_tenant_id_slug_unique" UNIQUE("tenant_id","slug");