const controller = require("../../controllers/auth/auth.controller");
const schema = require("./schema")



module.exports = function(fastify, opts, done){

    fastify.post("/register", {
        // onRequest: [fastify.authenticate],
        schema: schema.create,
        handler: controller._register
    })

    fastify.post("/login", {
        // onRequest: [fastify.authenticate],
        schema: schema.signin,
        handler: controller._login
    })

    fastify.get("/test", (request, reply)=> {
        reply.send({
            message: "Hello World"
        })
    })

    done()
}