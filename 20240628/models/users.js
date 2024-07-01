// 시퀄라이즈에 매핑할 유저 객체의 내용
// 객체의 형태가 정해져 있다.
const Sequelize = require("sequelize");

// Sequelize.Model === class
// Sequelize.Model 상속 받아서 매핑할 객체를 생성 해라

// User 클래스 생성 (Sequelize.Model은 클래스임)
class User extends Sequelize.Model {
    // 초기화 함수
    // 시퀄라이즈 객체를 매개변수로 받을것
    static staticinit(sqlzobj) {
        // super 상속받은 부모의 생성자 호출 super()인데
        // super.init() 상속받은 부모의 init함수를 호출
        // Sequelize.Model.init() : 매개변수 2개 들어가야 함
        // 첫번째 매개변수(객체) : 매핑할 테이블의 내용 (entity 데이터의 내용)
        // 두번째 매개변수(객체) : 매핑할 테이블의 설정(이름 등등)
        // super.init : 테이블이 없으면 만들고 있으면 매핑(entity가 다르면 에러가 발생합니다.)
        return super.init(
            {
                // 컬럼의 내용
                /*
                    create table user(
                        id int auto_increment primary key,
                        name varchar(20),
                        age int,
                        msg text,
                        date DATE default Date.now()
                    );
                */
                // name varchar(20)
                // 컬럼의 이름
                name: {
                    // 컬럼의 속성 내용
                    // 시퀄라이즈 타입
                    type: Sequelize.STRING(20),
                    unique: true // 중복 안됨
                },
                age: {
                    type: Sequelize.INTEGER
                },
                msg: {
                    type: Sequelize.TEXT
                }
            }
            , {
                // 매핑할 테이블의 속성 내용
                // sequelize 키값으로 시퀄라이즈 객체를 추가
                // sequelize 키를 맞춰서 작성을 해줘야겠죠?
                sequelize: sqlzobj,
                // 생성 시간 속성을 추가하면 컬럼을 추가할지 말지
                // created_at 컬럼을 추가할지 말지
                // updated_at 컬럼을 추가할지 말지
                timestamps: true, // 이속성을 주면 시간을 직접 작성해서 넣어줄 필요가 없어짐
                // 컬럼으로 created_at, updated_at 두 컬럼을 추가해준다.

                // underscored : 표기법을 바꿔주는 속성
                // 기본적으로 스네이크 표기법을 사용하는데, (asd_asd_asd_asd)
                // true주면 스네이크 표기법 false주면 카멜
                // created_at => createdAt
                underscored: false,
                modelName: "User", // 모델의 이름을 설정 join 관계 조회 시에
                tableName: "users", // 매핑할 테이블의 이름 없으면 이 이름으로 테이블을 생성
                paranoid: false, // paranoid 속성이 true면 deleted_at // 컬럼의 값이 삭제되면 삭제된 시간이 표기되고 삭제를 했지만 데이터는 남겨두고 싶을때 하지만 조회는 안된다.
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            })
    }
    // 테이블의 관계성을 만들 함수
    // 테이블들 내용을 매개변수로 받고
    static associate(db) {
        // 1 : 1 로 사용자와 게시글의 테이블의 관계를 설정
        // hasMany : 테이블의 관계를 정의한다.
        // hasOne
        // Users가 부모 테이블이 될것.
        // sourceKey : foreignKey가 연결할 키 부모 테이블에서 제공할 키
        // foreignKey : 생성할 외래키 이름 외래키를 가질 테이블에 줄 컬럼명
        db.Users.hasMany(db.Posts, { foreignKey: "fk_users_name", sourceKey: "name" }) // 소스키는 내 테이블의 필드
    }
}

module.exports = User;