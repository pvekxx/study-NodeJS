class UserRepository {
    constructor(database) {
        this.database = database;
    }

    async findUserId(id) {
        return await this.database.findUserId(id);
    }

    async createUser(name, age, msg) {
        await this.database.createUser(name, age, msg);
    }
}

module.exports = UserRepository;