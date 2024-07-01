use soon;

CREATE TABLE student (
    id INT,
    name VARCHAR(20),
    class VARCHAR(20)
);

CREATE TABLE student_class (
    class_id INT,
    class VARCHAR(20),
    study VARCHAR(20)
);

INSERT INTO
    student
VALUES (1, "soon", "devops"),
    (2, "soon2", "story"),
    (3, "soon3", "game");

INSERT INTO
    student_class
VALUES (1, "devops", "full"),
    (2, "story", "story1"),
    (3, "game", "game1");

SELECT * FROM student;

SELECT * FROM student_class;

SELECT *
FROM student
    INNER JOIN student_class ON student.id = student_class.class_id;

SELECT student.class, student_class.study
FROM student
    INNER JOIN student_class ON student.id = student_class.class_id
WHERE
    student.class = "story";

# story 수업을 듣고 있는 사람의 수업명과 수업 내용이 필요하다.

SELECT student.class, student_class.class
FROM student
    INNER JOIN student_class ON student.class = student_class.class
WHERE
    student.class = "story";

## 사용자 테이블(id, name)
CREATE TABLE `guest` (
    `id` VARCHAR(20) PRIMARY KEY,
    `name` VARCHAR(20)
);

## 주문 테이블(id, name, orderid)
CREATE TABLE `order` (
    `id` INT,
    `name` VARCHAR(20),
    `orderid` VARCHAR(20),
    constraint `fokey_orderid` FOREIGN KEY (`orderid`) REFERENCES guest (`id`)
);

# 아이디가 없는 주문이 들어올 수 없도록 제약(테이블에 생기지 않도로 막아버린다)

DROP TABLE `order`;

## 사용자 테이블이 있고 주문을 받는 테이블이 있다.
## 사용자 테이블에 값을 넣고
INSERT INTO
    `guest`
VALUES ("김씨", "닉네임1"),
    ("이씨", "닉네임2"),
    ("박씨", "닉네임3");

## 주문 테이블에 값을 넣고
INSERT INTO
    `order`
VALUES (1, "맥북", "김씨"),
    (2, "장난감", "김씨"),
    (3, "책", "이씨"),
    (4, "집", "김씨"),
    (5, "책", "박씨");
## 모든 사용자의 주문 내용을 조회
SELECT * FROM `guest` INNER JOIN `order` ON guest.id = order.orderid;
-- 앞이 부모 테이블 뒤가 자식 테이블 ON 뒤에서 관계! 를 따진다

## 해당 사용자의 주문 내용을 조회
SELECT *
FROM `guest`
    INNER JOIN `order` ON guest.id = order.orderid
WHERE
    `guest.id` = "이씨";
-- WHERE로 특정

## 사용자 테이블(uid, name, phone)
CREATE TABLE `videouser` (
    `uid` VARCHAR(20) PRIMARY KEY,
    `name` VARCHAR(20),
    `phone` INT
);

DROP TABLE `videouser`;

## 비디오가게 테이블(vidioname, orderid) 포린 키를 가지고 있는게 자식테이블. 부모에 없으면 추가가안됨.
CREATE TABLE `videoshop` (
    `vidioname` VARCHAR(20),
    `orderid` VARCHAR(20),
    constraint frkey FOREIGN KEY (`orderid`) REFERENCES `videouser` (`uid`)
);
## 사용자 값 추가

INSERT INTO `videouser` VALUES ("안녕안녕", "김씨", 011111);
## 비디오 빌리는 사람 값 추가(제약 조건 외래키 사용해서 사용자가 있는 경우에만 데이터 추가)
## 전체 사용자 비디오 조회
## 해당 사용자 비디오 조회

## as 별칭을 정해주는것 (조회할때만)
SELECT guest.id as name
FROM `guest`
    LEFT JOIN `order` ON guest.id = order.orderid;

CREATE TABLE test (
    name VARCHAR(20),
    name2 VARCHAR(20),
    name3 VARCHAR(20)
);

CREATE TABLE test2 (
    name VARCHAR(20),
    name2 VARCHAR(20),
    name3 VARCHAR(20)
);

INSERT INTO
    test
VALUES ("1", "2", "안녕1"),
    ("2", "2", "안녕2"),
    ("3", "2", "안녕4"),
    ("3", "2", "안녕3");

INSERT INTO
    test2
VALUES ("2", "1", "바이1"),
    ("2", "2", "바이2"),
    ("2", "3", "바이4"),
    ("2", "4", "바이3");

# left right 를 기준으로 생각, 관계성 없는 나머지값들은 null 처리
select * FROM test RIGHT JOIN test2 ON test.name2 = test2.name2;

### FULL
-- UNION
-- (합집합)
(
    select *
    FROM test
        LEFT JOIN test2 ON test.name2 = test2.name2
)
UNION
(
    select *
    FROM test
        RIGHT JOIN test2 ON test.name2 = test2.name2
);

### cross join(카타잔 곱)
# 두 테이블의 곱을 나타낸다.
SELECT * FROM test CROSS JOIN test2;

### self join
-- > 테이블이 본인을 참조 하는것.
## as testname 실제로 사용하는게 아니고 조회 용도로만 별칭을 정해준것.
SELECT * FROM test CROSS JOIN test as testname;
## 댓글 대댓글 만들때

### 회사 테이블(부서)
CREATE TABLE company ( department VARCHAR(10) PRIMARY KEY );
### 직원 테이블(직원이름, 직원소속부서)
CREATE TABLE employee (
    name VARCHAR(10),
    empdpt VARCHAR(10),
    constraint frgn FOREIGN KEY (empdpt) REFERENCES company (department)
);
### 회사의 값을 추가
INSERT INTO company VALUES ("청소");
### 직원의 값을 추가
INSERT INTO
    employee
VALUES ("김씨", "기획"),
    ("이씨", "기획"),
    ("박씨", "인사"),
    ("최씨", "홍보"),
    ("정씨", "홍보");
### 회사에 소속 컬럼이 있을때
### 직원이 뽑힐 수 있다.
### 모든 직원의 부서를 조회
SELECT *
FROM employee
    INNER JOIN company ON employee.empdpt = company.department;
### 해당 직원이 속해있는 부서 조회
SELECT *
FROM employee
    INNER JOIN company ON employee.empdpt = company.department
WHERE
    employee.name = "이씨";
### 모든 직원을 조회하면서 속하지 않은 부서도 조회
SELECT *
FROM employee
    RIGHT JOIN company ON employee.empdpt = company.department;