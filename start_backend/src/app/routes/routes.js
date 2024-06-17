// const {BearerTokenMiddleware} = require('../middlewares/bearer_token');

//initial route (/)

module.exports = function (app, opts, done) {

    //app is fastify here
    app.register(require("./initials/route"));
    app.register(require("./auth/route"), {prefix: process.env.API_ROUTE});
    app.register(require("./employees/route"), {prefix: process.env.API_ROUTE});
    app.register(require("./department/route"), {prefix: process.env.API_ROUTE});

    done();
};
