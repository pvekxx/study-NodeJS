const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=UTF-8")

    const URL = req.url;

    switch (URL) {
        case "/":
            res.end("하이");
            break;
        case "/1":
            res.end("1번입니다");
            break;
        case "/2":
            res.end("2번입니다");
            break;
    }
})

server.listen(4000, () => {
    console.log("서버 켜짐")
})