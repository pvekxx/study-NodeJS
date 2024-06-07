const fs = require("fs");
const http = require("http");
const path = require("path");

// 파일의 경로를 지정할때 사용을 합니다
// path 내장 모듈 : 경로를 지정(조작)할때 사용한다.
// join : 경로를 합쳐준다
// __dirname : 파일의 폴더 경로까지 나타내줌
// 반환값은 문자열 반환

let mypath = path.join(__dirname, "src", "sample.mp4") // __dirname + "index.html" 문자열 더한것과 같음
console.log(mypath)

// 서버 객체 생성
const server = http.createServer((req, res) => {
    // 요청 경로가 req
    if (req.url === "/video") {
        // 비디오 파일의 전체의 크기를 구해보자
        const state = fs.statSync(mypath);
        // 비디오의 파일의 크기를 구한다.
        const fileSize = state.size;
        // 클라이언트 측에서 요청 헤더 내용으로 Range 헤더를 가져오자
        // video태그로 요청을 하면 range가 요청 헤더로 포함된다.
        const headerRange = req.headers.range;
        // headerRange 영상이 끝나
        if (headerRange) {
            // headerRange 시작부분과 끝부분을 추출
            // bytes=/1231421-
            const progress = headerRange.replace("bytes=", '').split("-");
            const start = parseInt(progress[0]);
            const end = progress[1] ? parseInt(progress[1]) : fileSize - 1;

            // 비디오의 청크 크기를 정합시다.
            const chunkSize = 16 * 1024 // 3KB

            // 비디오 스트리밍 파일을 스트림으로 읽자
            // 어디서 어디까지 스트림 가져올건데?
            const videoStream = fs.createReadStream(mypath, { start, end });

            // 응답 헤더 내용 작성
            // 206 성공인데 리소스를 일부분 제공한다. 일부분 전달 했고 성공이야.
            // 클라이언트에서 range 요청 헤더 내용을 포함하여 보내면 콘텐츠 처리할때 상태코드 반환해준다.
            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4"
            }) // 문자열 키값은 obj.[Content-Type] 대괄호로 접근
            // 부분 콘텐츠를 제공할때 사용한다.
            // "Content-Range" : 헤더에 데이터를 전송하는 범위를 나타낸다.
            // "Accpet-Ranges" : 헤더에 서버가 클라이언트에게 요청된 범위의 데이터를 어떤걸 지원하는것인지.
            // 바이트 범위 지원하고 있어
            // "Constent-Length" : 이 응답에서 전달하는 데이터의 길이 지금은 청크 단위로 우리가 데이터를 제공하고 있다.
            // "Content-Type" : 제공하는 컨텐츠의 타입
            // 응답 내용으로 추가
            // 스트림 쓰는거
            videoStream.pipe(res);

        } else {
            const videoStream = fs.createReadStream(mypath);

            res.writeHead(200, {
                "Content-Length": chunkSize,
                "Content-Type": "video/mp4"
            })
            videoStream.pipe(res);
        }
        // 저는요 스트리밍 하고싶지 않고 파일을 그냥 받고싶습니다.

    } else {
        res.writeHead(404);
        res.end();
    }
})

// 서버 대기상태로 만들자
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`서버 ${PORT}번 포트에 열림`)
})