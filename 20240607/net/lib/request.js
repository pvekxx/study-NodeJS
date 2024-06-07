// 요청을 받으면 파싱해서 사용
// 상수
const SPACE = " ";
const NEW_LINE = "\r\n";
const GUILLOTINE = NEW_LINE + NEW_LINE;
const START_LINE_NAMES = ["method", "url", "version"];

// 헤더가 어디까지인지 인덱스 찾을 함수
const getHeaderEndIndex = (request) => request.indexOf(GUILLOTINE);

// 요청 데이터 시작 라인 추출 할 함수
const getStartLine = (startLineString) => {
    // GET / HTTP/1.1
    const startLine1 = startLineString.split(SPACE);
    // [["method", value], ["url" , value]]
    const startLine2 = startLine1.map((value, index) => [START_LINE_NAMES[index], value]);
    const startLine3 = startLine2.reduce((acc, line) => {
        const [key, value] = line; // 배열의 구조분해할당 
        acc[key] = value;
        return acc
    }, {}) // 초기값은 객체
    // GET /?index-1 HTTP/1.1 // 쿼리 스트링이 있을경우

    // indexOf 값을 찾으면 인덱스 반환 없으면 -1
    const querystringEndIndex = startLine3.url.indexOf("?");
    // 인덱스 못찾음 -1
    const isQuery = querystringEndIndex !== -1
    if (isQuery) {
        // 쿼리 문자열이 있으면 객체로 변환
        // ?index=1&city=2
        const queryString = startLine3.url.slice(querystringEndIndex + 1);
        // 쿼리 문자열 처리 할 함수
        const query = getQuery(queryString);

        startLine3.query = query;
        // GET /main/?index=1&city=2 HTTP/1.1
        // 쿼리 스트링 문자열 제거
        startLine3.url = startLine3.url.slice(0, querystringEndIndex);
    }
    return startLine3
}

// 쿼리 문자열 파싱 객체로 변환할 함수
const getQuery = (queryString) => {
    if (queryString.length === 0) return null
    // index=1&city=2
    const query1 = queryString.split("&")
    // ["index=1" , "city=2"]
    const query2 = query1.map((value) => value.split("="))
    // [["index" , "1"] , ["city" , "2"]]
    const query3 = query2.reduce((acc, line) => {
        const [key, value] = line;
        acc[key] = value;
        return acc
    }, {})
    // {"index" : "1", "city" : "2"}
    return query3;
}

// 헤더의 정보를 만들 함수
const getHeaders = (headerString) => {
    const headerLine = headerString.split(NEW_LINE);
    // shift 배열에서 첫번째 인덱스 내보내기
    const startLineString = headerLine.shift();
    const startLine = getStartLine(startLineString);

    // 헤더의 정보를 객체로 변환
    const headers = headerLine.reduce((acc, line) => {
        // 파싱 객체화
        // split = [Host, localhost:3000]
        // [key = Host
        // value = localhost:3000]
        const [key, value] = line.split(": ");
        acc[key] = value;
        return acc
    }, {})
    return {
        startLine, headers
    }
}

// 요청 데이터 최종 파싱 함수
const getRequest = (buffer) => {
    const headerEndIndex = getHeaderEndIndex(buffer);
    const isHeaderPending = headerEndIndex === -1; // 헤더가 전송이 끝났는지 확인

    if (isHeaderPending) return null

    // GET /main/?index=1&city=2 HTTP/1.1
    // Host: localhost:3000
    // Connection: keep-alive
    // sec-ch-ua: "Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"
    // sec-ch-ua-mobile: ?0
    // sec-ch-ua-platform: "Windows"
    // Upgrade-Insecure-Requests: 1
    // User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
    // Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
    // Sec-Fetch-Site: none
    // Sec-Fetch-Mode: navigate
    // Sec-Fetch-User: ?1
    // Sec-Fetch-Dest: document
    // Accept-Encoding: gzip, deflate, br, zstd
    // Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7
    //
    // 본문
    // ...bodyString : 스프레드 연산자 사용
    const [headerString, ...bodyString] = buffer.toString().split(GUILLOTINE);
    const body = bodyString.join(GUILLOTINE); // body 문자열로 변환

    const header = getHeaders(headerString); // header 객체 생성
    console.log(header);
    // body 내용 있을때 객체로 만들자
    return {
        ...header,
        body
    }
}

module.exports = getRequest;