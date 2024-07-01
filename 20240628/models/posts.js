const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static staticinit(sqlzobj) {
        return super.init(
            {
                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false, // NULL 이어도 되는지 안되는지?
                    // primaryKey: true // 기본키 id가 기본으로 생긴다 (없으면)
                }
            }
            , {
                sequelize: sqlzobj,
                timestamps: true,
                modelName: "Post",
                tableName: "posts",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            });
    }
    static associate(db) {
        // 자식 테이블
        // belongsTo : 자식 테이블이 부모의 테이블에서 외래키를 foreignKey로 사용을 하고 // hasmany로 주고 belongsto로 받는다 !
        // target : 참조할 부모의 테이블의 키
        db.Posts.belongsTo(db.Users, { foreignKey: "fk_users_name", target: "name" })
    }
}

module.exports = Post;