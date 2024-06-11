const router = require("express").Router()
const fs = require("fs");
const path = require("path");

router.get('/', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "board", "board.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})
router.get('/list', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "board", "list.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})
router.get('/write', (req, res) => {
    const filePath = path.join(__dirname, "..", "views2", "board", "write.html")
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) return res.send("err!")
        res.send(data);
    })
})

module.exports = router;