const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const utilities = require('../../common-helpers/utilities')
const APP = require('../../SERVICES-LIBRARY/app')

const createDep = async (request, reply) => {
    const {depName} = request.body
    try {
        let create_dep = await prisma.department.create({
            data: { depName }
        })
        reply.status(200).send({message: "Department created Successfully", data: create_dep})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const readDep = async (request, reply) => {
    try {
        let read_dep = await prisma.department.findMany({})
        reply.status(200).send({message: "Department fetched Successfully", data:{read_dep}})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const readOneDep = async (request, reply) => {
    try {
        let read_dep = await prisma.department.findFirst({
            where: {
                id: parseInt(request.params.id)
            }
        })
        reply.status(200).send({message: "Department fetched Successfully", data: read_dep})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const updateDep = async (request, reply) => {
    const {depName} = request.body
    try {
        let update_dep = await prisma.department.update({
            where: { id: parseInt(request.params.id) },
            data: { depName }
        })
        reply.status(200).send({message: "Department updated Successfully", data: update_dep})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

const deleteDep = async (request, reply) => {
    try {
        let delete_dep = await prisma.department.delete({
            where: { id: parseInt(request.params.id) }
        })
        reply.status(200).send({message: "Department deleted Successfully", data: delete_dep})
    } catch (error) {
        console.error(error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}


module.exports = {
    createDep,
    readDep,
    readOneDep,
    updateDep,
    deleteDep
}
