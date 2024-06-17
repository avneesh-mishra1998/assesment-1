const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
// Let the Magic Begin
module.exports = {
    get_user: async () => {
        return `Sync done for Leagues , Added Records ${response.length}`;
    },
    get_requesting_user : async (request, search_payload, reply) => {
        let user = await prisma.user.findUnique({
            where: {...search_payload},
            include:{
                account:true,
            }}
        );
        if (user) {
            // find if the user is banned
            if (user.account.banned) {
                console.log("banner user already");
                return reply.code(422).send({
                    message: messages.BANNED_USER,
                });
            }
            //find if the user is suspended
            if (user.account.suspended) {
                console.log("suspended user already");
                return reply.code(422).send({
                    message: messages.SUSPENDED_USER,
                });
            }
        }
        return user;
    }

}