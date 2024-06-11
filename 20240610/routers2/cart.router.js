const router = require("express").Router()
const fs = require("fs");
const path = require("path");

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "cart", "cart.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})
router.get('/add', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "cart", "add.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})

module.exports = router;