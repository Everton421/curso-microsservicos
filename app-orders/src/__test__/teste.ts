import { db } from "../db"
import { orders } from "../db/schema/orders";


async function getall(){

        const result = await db.select().from(orders);
        console.log(result)
}

  getall()