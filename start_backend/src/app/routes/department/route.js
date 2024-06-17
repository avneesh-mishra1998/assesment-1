const controller = require("../../controllers/department/dep.controller")
const schema = require('./schema')



module.exports = function(fastify, opts, done){

    fastify.post("/create-dep", {
        // onRequest: [fastify.authenticate],
        schema: schema.create_dep,
        handler: controller.createDep
    })

    fastify.get("/get-all-dep", {
        // onRequest: [fastify.authenticate],
        schema: schema.retrive_dep,
        handler: controller.readDep
    })

    fastify.get("/get-one-dep/:id", {
        // onRequest: [fastify.authenticate],
        schema: schema.get_dep_by_id,
        handler: controller.readOneDep
    })

    fastify.post("/update-dep/:id", {
        // onRequest: [fastify.authenticate],
        schema: schema.update_dep,
        handler: controller.updateDep
    })

    fastify.delete("/delete-dep/:id", {
        // onRequest: [fastify.authenticate],
        schema: schema.get_dep_by_id,
        handler: controller.deleteDep
    })
    
    done()
}


