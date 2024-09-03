const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            msg: {
                type: DataTypes.TEXT
            }
        }, {
            sequelize,
            timestamps: true,
            modelName: "User",
            tableName: "users",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci"
        })
    }
}

module.exports = User;