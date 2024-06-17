const controller = require("../../controllers/employees/emp.controller")
const schema = require('./schema')



module.exports = function(fastify, opts, done){

    fastify.post("/approve-emp", {
        onRequest: [fastify.authenticate],
        schema: schema.approve_emp,
        handler: controller.ApproveEmp
    })

    fastify.get("/get-profile", {
        onRequest: [fastify.authenticate],
        schema: schema.get_all_user_details,
        handler: controller.readEmp
    })

    fastify.get("/get-emp/:id", {
        onRequest: [fastify.authenticate],
        schema: schema.get_one_user_details,
        handler: controller.retrieveOneEmp
    })

    fastify.get("/get-emp", {
        onRequest: [fastify.authenticate],
        schema: schema.get_all_user_details,
        handler: controller.retrieveAllEmp
    })

    fastify.put("/update-emp/:id", {
        onRequest: [fastify.authenticate],
        schema: schema.update_emp,
        handler: controller.updateEmp
    })

    fastify.delete("/delete-emp/:id", {
        onRequest: [fastify.authenticate],
        schema: schema.get_one_user_details,
        handler: controller.deleteEmp
    })

    fastify.get("/filter-emp-location/:asc/:location", {
        onRequest: [fastify.authenticate],
        schema: schema.filter_emp_location,
        handler: controller.filterEmpLocation
    })

    fastify.get("/filter-emp-name/:asc/:name", {
        onRequest: [fastify.authenticate],
        schema: schema.filter_emp_name,
        handler: controller.filterEmpName
    })
    
    done()
}


