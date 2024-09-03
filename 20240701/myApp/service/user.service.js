class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUser(id) {
        return await this.userRepository.findUserId(id);
    }

    async signUp(name, age, msg) {
        await this.userRepository.createUser(name, age, msg);
    }
}

module.exports = UserService