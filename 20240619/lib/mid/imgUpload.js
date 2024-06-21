const multer = require("multer");
const path = require("path");
// exports 내보내는객체에 upload라는 키를 생성 { upload : multer }
// multer 함수로 객체를 생성
exports.upload = multer({
    // 속성을 추가
    // storage : 어느 디스크를 사용할거냐?
    // storage 서버 컴퓨터의 하드디스크에 저장할거냐? 메모리에 저장할거냐?
    storage: multer.diskStorage({
        // diskStorage : 서버 컴퓨터의 하드 디스크에 업로드 파일을 저장하는 객체를 생성
        // destination : 파일이 저장될 폴더를 지정
        destination: (req, file, done) => {
            // req : 요청의 내용
            // file 파일의 정보의 내용
            // done("에러의 메시지", "저장할 폴더의 경로");
            done(null, "upload/");
        },
        filename: (req, file, done) => {
            // filename 업로드하는 파일의 이름을 설정
            // file.originalname : 사용자가 업로드한 원본 파일명
            // path extname 메서드를 제공
            // file01.png
            const ext = path.extname(file.originalname);

            // 고유한 값을 만들어 줘야한다
            // 고양이.png
            // 고양이.png
            // 고유한 값으로 이미지의 이름을 만들어 줘야한다.

            // /upload/고양이.png
            // 시간을 이름으로 주는것. 코드가 아무리 빨라도 동시는 없습니다.
            // 저장할 파일의 이름
            // basename : 이름에 확장자를 추가나 제거도 가능
            // 고양이.png => basename() => 고양이_20240619 + ext = 고양이_123135452324.png
            const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
            done(null, filename);
            // filename == 실제로 서버에 저장할 파일명.
        }
    }),
    // 파일의 사이즈 설정 최대 5MB?
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})