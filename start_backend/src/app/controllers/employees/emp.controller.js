const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const utilities = require('../../common-helpers/utilities')
const APP = require('../../SERVICES-LIBRARY/app')

const ApproveEmp = async (request, reply) => {
    const {emp_id, dep_id} = request.body
    try {
        let find_emp = await prisma.user.findFirst({
            where: { id: emp_id }
        });
        const {depId, ...rest} = find_emp
        let update_emp = await prisma.user.update({
            where: { id: emp_id },
            data: {
                depId: dep_id,
                ...rest
            }
        });
        reply.status(200).send({message: "Employee approve Successfully", data: update_emp})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const retrieveOneEmp = async (request, reply) => {
    try {
        let read_emp = await prisma.user.findFirst({
            where: {
                id: parseInt(request.params.id)
            }
        })
        reply.status(200).send({message: "Employee fetched Successfully", data: read_emp})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const retrieveAllEmp = async (request, reply) => {
    try {
        let read_emp = await prisma.user.findMany({
            where: {
                role: "Employee"
            }
        })
        reply.status(200).send({message: "Employee fetched Successfully", data: {read_emp}})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const updateEmp = async (request, reply) => {
    const {fullName, email, location} = request.body
    try {
        let update_emp = await prisma.user.update({
            where: { id: parseInt(request.params.id) },
            data: { 
                full_name: fullName,
                email: email,
                location: location 
            }
        })
        reply.status(200).send({message: "Employee updated Successfully", data: update_emp})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const deleteEmp = async (request, reply) => {
    try {
        let delete_dep = await prisma.user.delete({
            where: { id: parseInt(request.params.id) }
        })
        reply.status(200).send({message: "Employee deleted Successfully", data: delete_emp})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const filterEmpLocation = async (request, reply) => {
    const {asc= true, location} = request.params
    console.log( asc);
    try {
        let filter_emp = await prisma.user.findMany({
            where: { 
                role: "Employee",
                location: {
                    contains: location
                }
            },
            orderBy: {
                location: asc ? 'asc' : 'desc',
            }
        })
        reply.status(200).send({message: "Employee filter Successfully", data: {filter_emp}})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const filterEmpName = async (request, reply) => {
    const {asc= true, name} = request.params
    try {
        let filter_emp = await prisma.user.findMany({
            where: { 
                role: "Employee",
                full_name: {
                    contains: name
                }
            },
            orderBy: {
                full_name: asc ? 'asc' : 'desc',
            }
        })
        reply.status(200).send({message: "Employee filter Successfully", data: {filter_emp}})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}


module.exports = {
    ApproveEmp,
    retrieveOneEmp,
    retrieveAllEmp,
    updateEmp,
    deleteEmp,
    filterEmpLocation,
    filterEmpName
}
