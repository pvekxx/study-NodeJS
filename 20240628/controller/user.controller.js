const { Users } = require("../models")

const user = {
    // 유저 생성
    async create(name, age, msg) {
        try {
            await Users.create({
                name, age, msg
            })
            return "회원가입 완료";
        } catch (error) {
            return error
        }
    },

    // 유저 조회
    async userSelectAll() {
        try {
            return await Users.findAll();
        } catch (error) {
            return error
        }
    },

    async userSelectName(name, model) {
        try {
            return await Users.findOne({
                where: { name },
                // include -> 시퀄라이즈의 join
                include: {
                    model
                }
            });
        } catch (error) {
            return error
        }
    }
}

module.exports = user;