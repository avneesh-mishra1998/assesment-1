const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const utilities = require('../../common-helpers/utilities')


const _register = async (request, reply) => {
    let body = request.body;
    console.log("body", body);
    try {
        const isUser = await prisma.user.findFirst({ where: {email:body.email} })
        if(isUser){
            return reply.status(422).send({message:'Email already exists, please Login'})
        }else{
            body.password = await utilities.hashPassword(body.password)
            const response = await prisma.user.create({ data: body })
            reply.code(200).send({data: response})
        }
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const _login = async(request, reply) => {
    const {email, password} = request.body
    try {
            const user = await prisma.user.findFirst({
                where:{ email: email }
            });
            if (!user) {
                return reply.code(404).send({ message: 'User not found' });
              }
          
            const pass = await utilities.decryptPassword(password, user.password)
            if(!pass){
                return reply.status(422).send({message:'Invalid Password'})
            }
            delete user.password
            let token = global.app.jwt.sign(user)
            reply.send({data: {name: user.full_name, email: user.email, role: user.role, token:token}})
    
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

module.exports = {
    _register,
    _login
}