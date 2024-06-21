# 웹소켓
> 채팅을 구현한다던지 알람기능 데이터를 요청해서 받아서 페이지의 내용을 그려준다거나 했지만 이제 서버에서 요청을 보낼수 있게 양방향 통신이 가능하게한다. 보기에는 실시간으로 채팅이나 게시글이 등록되는 것처럼 기능을 동작하고 싶을때 사용한다.
> 웹소켓 프로토콜 일반적인 http 요청과 응답과는 다르다 (흐름이 다르다)
> http 초기 논리적 연결 요청 이후에 웹소켓 프로토콜인지 확인을 한다.

## 클라이언트
> 요청 메시지를 받고
> 헤더의 내용에
```sh
GET / HTTP/1.1
host : http://127.0.0.1:포트번호
Upgrade : websocket
Sec-WebSocket-Key : 해시 문자열
Sec-WebSocket-Version : 버전
```

- Upgrade : websocket의 연결을 요청한다
- Sec-Websocket-Key : 클라이언트가 만든 고유 키

# 서버
> 요청을 받고 Upgrade : websocket의 요청을 수락하면 101상태코드
```sh
HTTP/1.1 101 switching protocols
Upgrade : websocket
Sec-webSocket-Accept : 해시 문자열
```

> 핸드 쉐이크가 성공하면 http 연결이 웹소켓 연결로 변경된다.
> 양방향으로 데이터를 프레임 단위로 주고 받는다

# 웹소켓 핸드쉐이크

- 4way 핸드쉐이크 : 안전하게 연결을 종료할때 사용을 했고
- 웹소켓 핸드쉐이크 : http 기반의 연결을 요청을 하고 웹소켓 프로토콜로 데이터를 주고 받겠다. (이어간다)

- 3 way 핸드쉐이크
1. 클라이언트 -> 서버로 SYN
2. 서버 -> 클라이언트 : SYN + ACK
3. 클라이언트 -> ACK

- 웹소켓 핸드쉐이크
1. 설정 되어있는 TCP 연결에서 http 기반의 웹소켓 핸드 쉐이크

```js
// socket.io
// ws
```