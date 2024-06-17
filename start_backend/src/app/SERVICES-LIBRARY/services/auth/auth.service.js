const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
module.exports= {
    validate_otp: async (request) => {
        let OTP = await prisma.oTPs.findFirst({
            where: {
                phone: request.body.phone, otp: request.body.otp,
            },
        })
        //return Error if the OTP is used or OTP doesn't exist
        if (OTP.length < 1 || OTP[0].used) {
            return {state: false};
        } else {
            prisma.oTPs.update({
                where: {id: OTP[0].id}, update: {used: true},
            });
            delete request.body.otp;
            return {state: true, otp: OTP[0]};
        }
    },
    validate_otp: async (request) => {
        let OTP = await prisma.oTPs.findMany({
            where: {
                phone: request.body.phone, otp: request.body.otp,
            },
        });
        console.log(OTP);
        //return Error if the OTP is used or OTP doesn't exist
        if (OTP.length < 1 || OTP[0].used) {
            return {state: false};
        } else {
            prisma.oTPs.update({
                where: {id: OTP[0].id}, update: {used: true},
            });
            delete request.body.otp;
            return {state: true, otp: OTP[0]};
        }
    },


}