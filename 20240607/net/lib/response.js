const fs = require("fs");
const path = require("path");
// 요청에 대한 응답 메시지 생성할 함수
// HTTP/1.1 200 ok

const { NOTFOUND } = require("dns");

const STATEMESSAGE = {
    200: "OK",
    404: "NOT FOUND"
}

// function a (c) {
//     return function(d){
//         console.log(c)
//         console.log(d)
//     }
// }

// 요청에 대한 응답 메시지 생성할 함수
const getMessage = (request) => (body, statusCode = 200) => {
    const bodyBuffer = Buffer.from(body);

    // 요청 헤더의 내용에 따라서 Content-type을 결정
    const ContentType = request.headers.Accept.indexOf("text/html") !== -1 ? "text/html" : request.headers.Accept;

    // 응답 메시지 생성
    return `HTTP/1.1 ${statusCode} ${STATEMESSAGE[statusCode]}
Connection : Close
Content-Type : ${ContentType}; charset=UTF-8
Content-Length : ${bodyBuffer.length}

${body}` // 한줄 꼭 비어야 함 (두줄 내려야 함)
}

// 클라이언트에게 응답할 객체를 최종 완성
const getResponse = (socket, request) => {
    // msg는 반환받은게 함수
    const msg = getMessage(request);

    return {
        // 에러 발생시 호출할 메서드
        NotFound: (body) => {
            const responseMessage = msg(body);
            socket.write(responseMessage);
        },
        // 클라이언트에게 성공 결과와 메시지를 보낼 메서드
        send: (filename) => {
            const file = fs.readFileSync(path.join(__dirname, "..", "views", `${filename}.html`), "utf8")
            socket.write(msg(file))
            socket.end();
        },
        // 클라이언트에게 정적 파일을 전송할 메서드
        sendStatic: (filename) => {
            const dir = "public";
            // public + js/index.js
            // public/js/index.js
            fs.readFile(path.join(dir, filename), (err, data) => {
                if (err) return err

                // 응답 메시지 생성
                const resMsg = msg(data.toString());
                socket.write(resMsg);
                socket.end();
            })
        }
    }
}

module.exports = getResponse