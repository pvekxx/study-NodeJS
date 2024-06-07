const fs = require("fs");
const path = require("path");

// public 폴더의 파일들의 루트 경로를 지정
// public폴더의 경로가 루트 경로

const rootName = "public";
// c/~/public
const rootDir = path.join(__dirname, "..", rootName);

// 폴더 안의 내용을 찾는 함수
// c/~/public/css/style.css
// c/~/public/js/index.js

const result = {};
const find = (currentPath = rootDir) => {
    // 경로의 파일과 디렉토리 목록을 읽어오자
    // readdirSync : 동기적으로 파일과 디렉토리 목록을 가져오는 메서드
    // 처음 호출 currentPath = c/~/public/
    // css 폴더 경로가 나오고 호출 currentPath = c/~/public/css
    // rootDir = public 까지의 경로
    // currentPath = c/~/public/css
    const directory = fs.readdirSync(currentPath)
    // currentPath === currentPath
    // currentPath
    // c/~/public/css/home
    // c/~/public/css/mypage
    // c/~/public/css/style.css

    // [0 : home, 1 : mypage, 2 : style.css]

    // c/~/public/css
    // c/~/public/js
    // directory = [ 0: "css", 1: "js"]

    // directory 배열의 갯수만큼 forin문으로 순회
    // index => 0, 1, 2
    for (const index in directory) {
        // console.log(index);
        // 폴더들의 경로를 완성
        // c/~/public/css
        // 경로가 있어야 폴더나 파일을 가져올 수 있다.
        // currentPath : 찾을 루트 경로와 찾을 폴더
        // 파일의 경로를 만들고 싶어.
        __dirname + ".." + `/${directory}`
        // // c/~/public../css 이렇게 하면 안되니까 join메서드 사용
        // join : 문자열 반환 경로를 완성시켜서 하나의 문자열을 반환 해준다.

        // 폴더
        // css// js
        // 0 : c/~/public/css
        // 1 : c/~/public/js

        // c/~/public/css
        // directory[0] === css
        // directory[1] === js
        // currentPath = c/~/public/css

        // [home, mypage, style.css]
        // 0 : c/~/public/css/home
        // 1 : c/~/public/css/mypage
        // 2 : c/~/public/css/style.css

        const findPath = path.join(currentPath, directory[index]);
        // c/~/public/css/css
        // console.log(findPath);
        // c/~/public/css/home
        // 만약 폴더인지 파일인지
        // c/~/public/css/css === 우리가 css라는 폴더가 없기 때문에 경로를 찾아갈수가 없어
        // 오류가 펑
        // c/~/public/css/home
        const isFile = fs.statSync(findPath).isFile(); // 반환값이 파일이면 true, 디렉토리면 false 반환
        // c/~/public/css
        // console.log(isFile);
        if (!isFile) {
            // 폴더 안의 폴더    
            // 재귀적으로 탐색
            // c/~/public/css
            // c/~/public/css/home
            find(findPath);
            // 코드 중단
        } else {
            // 파일인 경우
            // 탐색하는 경로가 public 디렉토리인지 확인
            const key = currentPath === rootDir ? "/" : currentPath.replaceAll(rootDir, "")
            // key 객체화 시킬거라서 key 값을 뽑는것.
            // /Users/hyuk/Desktop/Devops/NodeJS/20240607/net/public/js 이게 너무 기니까 간단하게 하려고
            // js/index.js
            // css/style.css 이렇게
            // http 경로 생성
            // \\ 문자열이 역슬래시 \\ 로 들어오는데 css\\style.css => css/style.css 이렇게 치환해줘야 함
            const httpPath = path.join(key, directory[index]).replaceAll("\\", "/");
            // replaceAt

            // 내가 편하게 사용 할 객체를 만들기 위해서 만든 문자열 /css/home + /index.css
            // console.log(httpPath);
            result[httpPath] = directory[index];
        }
    }
    console.log(result);
    return result;
}

module.exports = find(rootDir);