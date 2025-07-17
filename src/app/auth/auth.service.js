const { jwtSign } = require("../../middleware/auth");

const issueTokenUser = (tokenPayload) => {
    try {
        return jwtSign(tokenPayload);
    } catch (error) {
        console.log("error :", error);
        throw error;
    }
};

module.exports = {
    issueTokenUser
}