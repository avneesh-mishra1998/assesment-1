var random = require('random-name');
const bcrypt = require('bcryptjs');

const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const decryptPassword = async(plainPassword, hashedPassword) => {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

module.exports = {
    hashPassword,
    decryptPassword
}