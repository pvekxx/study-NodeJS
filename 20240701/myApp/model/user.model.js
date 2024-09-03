const { User } = require("./lib");

class UserModel {
    async findUserId(id) {
        return await User.findOne({ where: { id } });
    }

    async createUser(name, age, msg) {
        await User.create({ name, age, msg });
    }
}

module.exports = UserModel;