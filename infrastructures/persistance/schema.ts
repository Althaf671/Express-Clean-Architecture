import type { TCloudinaryFile } from "@/modules/common/types/global.type";
import { sql } from "drizzle-orm";
import { 
    boolean,
    decimal,
    jsonb,
    pgTable, 
    primaryKey, 
    text, 
    timestamp, 
    uniqueIndex, 
    uuid, 
    varchar 
} from "drizzle-orm/pg-core";

/**
 * Ini adalah tabel role, ia merepresentasikan
 * peran yang nanti akan digunakan oleh user, tabel
 * akan diisi dengan seeder.
 */
export const tableRoles = pgTable("roles", {
    id:              uuid("id").primaryKey().defaultRandom(),
    name:            varchar("name", { length: 100 }).notNull()
})

/**
 * Table session merepresentasikan sesi seorang user,
 * sesi ini menandakan bahwa user layak mengakses semua protected resource.
 */
export const tableSession = pgTable('sessions', {
    sessionToken:   varchar('session_token').primaryKey(), 
    device:         varchar('device', { length: 100 }),
    os:             varchar('os', { length: 100 }),
    browser:        varchar('browser', { length: 100 }),
    ipAddress:      varchar('ip_address', { length: 45 }),
    expiredAt:      timestamp('expired_at', { withTimezone: true }).notNull(), 
    userId:         uuid('user_id').notNull().references(() => tableUser.id, { onDelete: 'cascade' }),
})

/**
 * Table ini berperan sebagai tabel identitas auth seorang user, ia digunakan untuk
 * menyimpan data terkait otentikasi eksternal dan provider nya. 
 * 
 * Pada kasus kita, karena makai login with google maka aku pisah dari user table.
 */
export const tableAccount = pgTable("accounts", {
    provider: varchar('provider').notNull(), 
    providerAccountId: varchar('provider_account_id').notNull(),
    userId: uuid('user_id').notNull().references(() => tableUser.id, { onDelete: 'cascade' }),
}, (table) => ([
    {
        pk: primaryKey({ columns: [table.provider, table.providerAccountId] }),
    }
]))

/**
 * Ini adalah tabel user, ia merepresentasikan
 * entitas utama, table ini akan menampung profile beserta role seorang user.
 */
export const tableUser = pgTable("users", {
    id:                     uuid("id").primaryKey().defaultRandom(),
    name:                   varchar("name", { length: 100 }).notNull(),
    email:                  varchar("email", { length: 254 }).notNull().unique(),
    profileImage:           jsonb("profile_image").$type<TCloudinaryFile>().notNull(),
    isBlacklisted:          boolean("is_blacklisted").default(false),
    isDeleted:              boolean("is_deleted").notNull().default(false),
    deletedAt:              timestamp("deleted_at", { withTimezone: true }),
    updatedAt:              timestamp("updated_at", { withTimezone: true }),
    createdAt:              timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    roleId:                 uuid("role_id").references(() => tableRoles.id, { onDelete: 'no action'}).notNull()
}, (table) => [
    uniqueIndex("users_email_active_unique")
        .on(table.email)
        .where(sql`${table.isDeleted} = false`)
])

/**
 * Ini adalah tabel competition, ia merepresentasikan
 * sebuah lomba lengkap dengan detailnya.
 */
export const tableCompetition = pgTable("competitions", {
    id:                     uuid("id").primaryKey().defaultRandom(),
    name:                   varchar("name", { length: 100 }).notNull(),
    theme:                  varchar("theme", { length: 100}).notNull(),
    description:            text("description").notNull(),
    totalPrize:             decimal("total_prize", { precision: 15, scale: 2 }).notNull(),
    contentImage:           jsonb("content_image").$type<TCloudinaryFile>().notNull(),
    guideUrl:               varchar("guide_url", { length: 2056 }).notNull(),
    registrationUrl:        varchar("registration_url", { length: 2056}).notNull(),
    requirement:            varchar("requirement").$type<string[]>().notNull(),
    contactPerson:          varchar("contact_person").$type<string[]>().notNull(),
    isEligible:             boolean("is_eligible").notNull().default(false),
    registrationStartAt:    timestamp("registration_start_at", { withTimezone: true }).notNull(),
    registrationEndAt:      timestamp("registration_end_at", { withTimezone: true }).notNull(),
    isBookmarked:           boolean("is_bookmarked").notNull().default(false),
    isDeleted:              boolean("is_deleted").notNull().default(false),
    deletedAt:              timestamp("deleted_at", { withTimezone: true }),
    updatedAt:              timestamp("updated_at", { withTimezone: true }),
    createdAt:              timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

/**
 * Ini adalah tabel scholarship, ia merepresentasikan
 * sebuah beasiswa lengkap dengan detailnya.
 */
export const tableScholarship = pgTable("scholarships", {
    id:                     uuid("id").primaryKey().defaultRandom(),
    name:                   varchar("name", { length: 100 }).notNull(),
    description:            text("description").notNull(),
    totalPrize:             decimal("total_prize", { precision: 15, scale: 2 }).notNull(),
    contentImage:           jsonb("content_image").$type<TCloudinaryFile>().notNull(),
    guideUrl:               varchar("guide_url", { length: 2056 }).notNull(),
    registrationUrl:        varchar("registration_url", { length: 2056}).notNull(),
    requirement:            varchar("requirement").$type<string[]>().notNull(),
    contactPerson:          varchar("contact_person").$type<string[]>().notNull(),
    isEligible:             boolean("is_eligible").notNull().default(false),
    registrationStartAt:    timestamp("registration_start_at", { withTimezone: true }).notNull(),
    registrationEndAt:      timestamp("registration_end_at", { withTimezone: true }).notNull(),
    isBookmarked:           boolean("is_bookmarked").notNull().default(false),
    isDeleted:              boolean("is_deleted").notNull().default(false),
    deletedAt:              timestamp("deleted_at", { withTimezone: true }),
    updatedAt:              timestamp("updated_at", { withTimezone: true }),
    createdAt:              timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})

/**
 * Table yang merepresentasikan sebuah kategori lomba,
 * Kategori pertama kali di seed dengan beberapa values.
 */
export const tableCompetitionCategory = pgTable("competition_categories", {
    id:                     uuid("id").primaryKey().defaultRandom(),
    name:                   varchar("name", { length: 100 }).notNull(),
    isDeleted:              boolean("is_deleted").notNull().default(false),
    deletedAt:              timestamp("deleted_at", { withTimezone: true }),
    updatedAt:              timestamp("updated_at", { withTimezone: true }),
    createdAt:              timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Table yang merepresentasikan sebuah kategori beasiswa,
 * Kategori pertama kali di seed dengan beberapa values.
 */
export const tableScholarshipCategory = pgTable("scholarship_categories", {
    id:                     uuid("id").primaryKey().defaultRandom(),
    name:                   varchar("name", { length: 100 }).notNull(),
    isDeleted:              boolean("is_deleted").notNull().default(false),
    deletedAt:              timestamp("deleted_at", { withTimezone: true }),
    updatedAt:              timestamp("updated_at", { withTimezone: true }),
    createdAt:              timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Ini adalah tabel penghubung untuk lomba dan kategori, ia merepresentasikan
 * hubungan many-to-many antara lomba dan kategori terkait lomba.
 */
export const tableCompetitionCategoryAssignment = pgTable("competition_category_assignments", {
    competitionId:          uuid("competition_id").references(() => tableCompetition.id, { onDelete: "no action" }).notNull(),
    categoryId:             uuid("category_id").references(() => tableCompetitionCategory.id, { onDelete: "no action" }).notNull(),
}, (table) => [
    primaryKey({ columns: [table.competitionId, table.categoryId] }),
])

/**
 * Ini adalah tabel penghubung untuk scholarship dan kategori, ia merepresentasikan
 * hubungan many-to-many antara beasiswa dan kategori terkait beasiswa.
 */
export const tableScholarshipCategoryAssignment = pgTable("scholarship_category_assignments", {
    scholarshipId:          uuid("competition_id").references(() => tableCompetition.id, { onDelete: "no action" }).notNull(),
    categoryId:             uuid("category_id").references(() => tableCompetitionCategory.id, { onDelete: "no action" }).notNull(),
}, (table) => [
    primaryKey({ columns: [table.scholarshipId, table.categoryId] }),
])

/**
 * Ini adalah tabel penghubung untuk user dan competition category, ia 
 * merepresentasikan hubungan many-to-many.
 */
export const tableUserCompetitionPreferences = pgTable("user_competition_preferences", {
    userId:                 uuid("user_id").references(() => tableUser.id, { onDelete: 'cascade' }).notNull(),
    categoryId:             uuid("category_id").references(() => tableCompetitionCategory.id, { onDelete: 'cascade'}),
}, (table) => [
    primaryKey({ columns: [table.userId, table.categoryId] }),
])

/**
 * Ini adalah tabel penghubung untuk user dan scholarship category, ia
 * merepresentasikan hubungan many-to-many.
 */
export const tableUserScholarshipPreferences = pgTable("user_scholarship_preferences", {
    userId:                 uuid("user_id").references(() => tableUser.id, { onDelete: 'cascade' }).notNull(),
    categoryId:             uuid("category_id").references(() => tableScholarshipCategory.id, { onDelete: 'cascade'}),
}, (table) => [
    primaryKey({ columns: [table.userId, table.categoryId] }),
])