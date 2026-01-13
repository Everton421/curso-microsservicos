import { integer,timestamp, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { custumers } from "./custumers.ts";


export const orderStatusEnum = pgEnum('order_status',[
         'pending',
          'canceled',
          'paid'
         ]) 

export const orders = pgTable('orders', {
        id: text().primaryKey(),
        customerId: text().notNull().references( ()=> custumers.id),
        amount: integer().notNull(),
        status:  orderStatusEnum().notNull().default('pending'),
        createdAt: timestamp().defaultNow().notNull(),
})