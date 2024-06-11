const router = require("express").Router()
const fs = require("fs");
const path = require("path");

router.get('/info', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "user", "info.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})
router.get('/login', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "user", "login.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})
router.get('/signup', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "user", "signup.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})

module.exports = router;