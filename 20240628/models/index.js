const Sequelize = require("sequelize");
const config = require("./config");
const Users = require("./users");
const Posts = require("./posts");
// Sequelize class 생성자
// Sequelize 객체 생성
// Sequelize 생성자 함수
// 매개변수를 순서대로 줘야한다.
// 데이터베이스 이름, 사용자 이름, 비밀번호, 전체 객체 내용

// 시퀄라이즈 객체 생성
// 매개변수 순서 맞춰서 해줘야함!
const sqlzobj = new Sequelize(
    config.dev.database,
    config.dev.username,
    config.dev.password,
    config.dev
);

const db = {}; // 객체를 생성해서 키만들고 값을 넣어줌 db = { sequelize : sqlzobj, Users : Users, Posts : Posts}
db.sequelize = sqlzobj;
db.Users = Users;
db.Posts = Posts;

Users.staticinit(sqlzobj);
Posts.staticinit(sqlzobj);

Users.associate(db);
Posts.associate(db);

// 시퀄라이즈 연결
// mysql에 커넥션 요청을 보내고
// 매핑 까지

// sync() 시퀄라이즈 연결 요청
// 반환값이 promise이므로 댄, 캐리를 찍을수 있다.
// 초기화 할지?
// 테이블 전부 초기화 sync((force:true))
sqlzobj.sync({ force: false }).then(async () => {
    // 연결 성공
    console.log("연결 성공")
    // Users 테이블 매핑 객체
    // insert into users (name, age, msg) values("soon", 20, "안녕"); -> create메서드
    // create()
    // Users.create({
    //     name: "soon",
    //     age: 20,
    //     msg: "안녕"
    // })
    // await Posts.create({
    //     content: "789"
    // })
    // Posts.findOne
    // Posts.findAll()
    // 여러개 조회
    // select * from post where id=1;
    // const datas = await Posts.findAll({ where: { id: 1 } });
    // const data = datas.reduce((acc, el) => { acc.push(el.dataValues); return acc; }, []);
    // dataValues key를 파싱해서 사용하면 된다.
    // 서버측에서 확인을 하고 있어서
    // axios요청 보내서 데이터를 응답받으면 파싱이 되어 있을것.
    // const data = await Posts.findOne({ where: { id: 1 } });
    // const data = await Posts.update({
    //     content: "435"
    // }, { where: { id: 3 } })
    // // 1 잘 처리되었다.
    // console.log(data);
    // const data2 = await Posts.findOne({ where: { id: 3 } });
    // console.log(data2.dataValues);

    // await Posts.destroy({ where: { id: 1 } });

}
).catch((err) => {
    // 연결 실패
    console.log("연결 실패", err)
}
)

// 테이블간에 매핑할 객체를 만들어줘야한다.
// 자바스크립트로 매핑할 내용을 객체로 작성 해줘야 한다.
// 사용자 객체를 만들어 봅시다.

module.exports = db // module.exports = { sequelize: sqlzobj, Users, .... };


// 게시글을 추가 삭제 수정 조회
// 사용자가 글을 쓸 수 있게 설계
// 게시글이 있다는 것은 사용자가 있다는 얘기
// 사용자가 없으면 게시글을 추가할수 없다. 제약조건 외래키
// 조회할때 사용자의 글이 맞는지 조회 join