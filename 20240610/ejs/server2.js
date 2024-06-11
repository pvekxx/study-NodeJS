const express = require("express");
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs");

const toDo = [
    { id: "a", name: "aaa" },
    { id: "b", name: "bbb" },
    { id: "c", name: "ccc" },
    { id: "d", name: "ddd" },
    { id: "e", name: "eee" },
    { id: "f", name: "fff" },
    { id: "g", name: "ggg" },
    { id: "h", name: "hhh" },
    { id: "i", name: "iii" }

]

app.get("/", (req, res) => {
    res.render("index", { toDo })
})

app.listen(3000, () => {
    console.log("server on!!!")
})