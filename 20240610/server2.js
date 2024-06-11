const express = require("express");
const boardRouter = require("./routers2/board.router.js")
const userRouter = require("./routers2/user.router.js")
const cartRouter = require("./routers2/cart.router.js")
const app = express()

app.use("/user", userRouter)
app.use("/board", boardRouter)
app.use("/cart", cartRouter)

app.listen(3000, () => {
    console.log("server on~!")
})