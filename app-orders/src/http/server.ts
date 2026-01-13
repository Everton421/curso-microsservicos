import {  fastify} from 'fastify'
 
import { z } from 'zod'
import {serializerCompiler, validatorCompiler, type ZodTypeProvider  } from 'fastify-type-provider-zod'
import { channels } from '../broker/channels/index.ts'
import { db } from '../db/index.ts'
import { schema } from '../db/schema/index.ts'
import { sql } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
 
    const app = fastify().withTypeProvider<ZodTypeProvider>()

    app.setSerializerCompiler(serializerCompiler)
    app.setValidatorCompiler( validatorCompiler)

    app.get('/health',( request, reply )=>{
        return 'Ok'
    })

    app.post('/order',
        {
            schema : {
                body: z.object({
                    amount: z.number(),
                })
            }
        },
        async ( request , reply )=>{
            const { amount } = request.body
                await  channels.orders.sendToQueue("orders", Buffer.from(JSON.stringify({amount})))

                try{
 await db.insert(schema.orders).values({
                        amount: Number(amount),
                        customerId: "09445631-a84e-4f96-8bf0-67a054130dec",
                      
                        id: randomUUID(),
                        status:'pending',
                        createdAt: new Date()
                    });
                }catch(e){
                    console.log(e)
                }   
                
                
            console.log('Creating order with amount ', amount);

        return reply.status(201).send();
    })


        app.post('/custumer',
        {
            schema : {
                body: z.object({
                      name:  z.string(),
                         email: z.string(),
                         address: z.string(),
                         state: z.string(),
                         zipCode: z.string(),
                         country: z.string(),
                         dateOfBirth: z.string(),
                })
            }
        },
        async ( request , reply )=>{
           
             
                    await db.insert(schema.custumers).values({
                        id: randomUUID(),
                         name:  request.body.name,
                         email: request.body.email,
                         address: request.body.address,
                         state: request.body.state,
                         zipCode: request.body.zipCode,
                         country: request.body.country,
                         dateOfBirth: new Date() 
                    });
                  
        return reply.status(201).send();
    })


const port = 3333
app.listen( { host: '0.0.0.0', port:port }).then(()=>{
    console.log("[Orders] HTTP server running!")
})