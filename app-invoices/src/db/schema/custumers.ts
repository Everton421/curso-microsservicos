// 
//import { integer,timestamp, pgEnum, pgTable, text, date } from "drizzle-orm/pg-core";
//
// 
//export const custumers = pgTable('custumers', {
//        id: text().primaryKey(),
//        name: text(),
//        email: text().notNull().unique(),
//        address: text().notNull(),
//        state: text().notNull(),
//        zipCode: text().notNull(),
//        country: text().notNull(),
//        dateOfBirth: date({ mode: 'date'}),
//       
//})