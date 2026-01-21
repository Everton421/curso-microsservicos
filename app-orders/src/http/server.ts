import {  fastify} from 'fastify'
 import '@opentelemetry/auto-instrumentations-node/register'
import { z } from 'zod'
import {serializerCompiler, validatorCompiler, type ZodTypeProvider  } from 'fastify-type-provider-zod'
import { channels } from '../broker/channels/index.ts'
import { db } from '../db/index.ts'
import { schema } from '../db/schema/index.ts'
import { sql } from 'drizzle-orm'
import { randomUUID } from 'node:crypto'
import { setTimeout } from 'node:timers/promises'
import { dispathOrderCreated } from '../broker/messages/order-created.ts'
 import  { trace } from '@opentelemetry/api'
import { tracer } from '../tracer/tracer.ts'
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

                 const orderId = randomUUID();
                const customerId = "bd62e6ce-1270-462b-b3d3-15bfdcc4affd"
                
                        await db.insert(schema.orders).values({
                        amount: Number(amount),
                        customerId: customerId,
                        id: orderId,
                        status:'pending',
                        createdAt: new Date()
                    });
  
                    const span = tracer.startSpan("Aqui deu ruim")
                        span.setAttribute('teste', 'hello world')
                        await setTimeout(2000)
                    span.end()

                    trace.getActiveSpan()?.setAttribute('order_id', orderId)

                await dispathOrderCreated({
                      orderId: orderId,
                      amount: Number(amount),
                      custumer: {
                      id: customerId
                     }
                 })
                  
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
                  
                })
            }
        },
        async ( request , reply )=>{
           
                const id = randomUUID() 

                    await db.insert(schema.custumers).values({
                        id: id,
                         name:  request.body.name,
                         email: request.body.email,
                         address: request.body.address,
                         state: request.body.state,
                         zipCode: request.body.zipCode,
                         country: request.body.country,
                         dateOfBirth: new Date() 
                    });
                  
        return reply.status(201).send({ id:id });
    })


const port = 3333
app.listen( { host: '0.0.0.0', port:port }).then(()=>{
    console.log("[Orders] HTTP server running!")
})

 