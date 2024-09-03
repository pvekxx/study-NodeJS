const express = require("express");
const { sequelize } = require("./model/lib");
const container = require("./container/DI")
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// fouce : 초기화 할지 말지
sequelize.sync({ fouce: false });
const userController = container.get("UserController");


app.get("/users/:id", (req, res) => userController.getUser(req, res)); // 중괄호가 없으면 바로 리턴임
app.post("/createUser", (req, res) => { return userController.signUp(req, res) });
// app.get("/users/:id", userController.getUser);

app.listen(3000, () => {
    console.log("server on~");
})

// npm i express sequelize mysql2