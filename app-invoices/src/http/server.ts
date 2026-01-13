import {  fastify} from 'fastify'
 
import {serializerCompiler, validatorCompiler, type ZodTypeProvider  } from 'fastify-type-provider-zod'
 
    const app = fastify().withTypeProvider<ZodTypeProvider>()

    app.setSerializerCompiler(serializerCompiler)
    app.setValidatorCompiler( validatorCompiler)

    app.get('/health',( request, reply )=>{
        return 'Ok'
    })

  

const port = 3333
app.listen( { host: '0.0.0.0', port:port }).then(()=>{
    console.log("[Invoices] HTTP server running!")
})

 