// bcrypt
// 강력한 암호화를 제공한다.

// $2A$[cost]$[salt][hash]

// $2A$ : 사용 알고리즘
// [cost] : 키 스트레칭 횟수 값이 2의 ^n 이다 10을 입력하면 2^10
// 10이 좀 기본값이고 10보다 크면 많이 느려진다.
// [salt] : 인코딩된 salt값 원본의 일부분을 salt으로 사용한다. 알고리즘에서
// [hash] : 비밀번호와 salt값을 합하고 해시에서 인코딩 된 값.

// bcrypt : 보안에 집착하기로 유명한 openBSD에서도 사용

const bcrypt = require("bcrypt");

const createHash = (pw) => {
    return new Promise((res, rej) => { // 성공, 실패 에 대한 내용
        bcrypt.hash(pw, 10, (err, data) => { // 원본 문자열, 키 스트레칭횟수
            if (err) rej("해싱 실패");
            res(data);
        })
    })
}

const compare = (pw, hash) => {
    return new Promise((res, rej) => {
        bcrypt.compare(pw, hash, (err, same) => {
            if (err) rej(err);
            res(same);
        })
    })
}

const test = async () => {
    // $2b$10$T9qQFhFIVU.UIjAsMruR4eeOr9Fr5JvEnfUZKto5ci1kvNpt/IECC
    // $2b$10$wJAaPpxx0qy.8PgtGfoWputAa2RoCn6gm5nVfBqeDh0ds3Ffx5ePe
    // $2b$10$oq2vrLNQCtdso7QDMBY7K.habwF2Gm8pAUJK6YTc274J5/A/F1rzG
    console.log(await createHash("123"));
    console.log(await compare("123", "$2b$10$oq2vrLNQCtdso7QDMBY7K.habwF2Gm8pAUJK6YTc274J5/A/F1rzG"))
}
test();