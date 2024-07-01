const { Posts } = require("../models");

const post = {
    // 글 생성
    async create(content, fk_users_name) {
        try {
            await Posts.create({
                content, fk_users_name
            })
        } catch (error) {
            return error
        }
    },

    // 글 하나 조회
    async postSelectIndex(id) {
        try {
            return await Posts.findOne({ where: { id } })
        } catch (error) {
            return error
        }
    },

    // 전체 조회
    async postSelectAll() {
        try {
            return await Posts.findAll();
        } catch (error) {
            return error
        }
    }
}

module.exports = post;