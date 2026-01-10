import { integer,timestamp, pgEnum, pgTable, text } from "drizzle-orm/pg-core";


export const orderStatusEnum = pgEnum('order_status',[ 'pending', 'canceled','paid' ]) 

export const orders = pgTable('orders', {
        id: text(),
        customerId: text().notNull(),
        amount: integer().notNull(),
        status: orderStatusEnum().notNull().default('pending'),
        createdAt: timestamp().defaultNow().notNull(),
})