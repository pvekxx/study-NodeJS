CREATE DATABASE test4;

use test4;

-- full scan
SELECT * FROM student;

-- full scan
SELECT * FROM student WHERE name = "soon";
-- index가 되어 있지 않으면 모든 데이터를 조회하고 결과를 찾는다.

create table student (
    id int auto_increment primary key,
    name varchar(255),
    email varchar(255),
    age int,
    class varchar(10)
);

show variables like "secure_file_priv";

LOAD DATA INFILE "/Users/hyuk/Desktop/Devops/mysqlcsv/student.csv" INTO
TABLE student FIELDS TERMINATED BY "," ENCLOSED BY '"' LINES TERMINATED BY "\n" IGNORE 1 ROWS;

SELECT * FROM student;

SELECT * FROM student WHERE class = "devops";

SELECT * FROM student WHERE name = "Blaze.Rohan74";

# 인덱스 name index 인덱스이름 on(필드)
CREATE INDEX name_index ON student (name);

CREATE INDEX class_index ON student (class);

# 인덱스 지우기
DROP INDEX email_index ON student;

# 설정한 인덱스 확인
SHOW INDEX FROM student;

# 인덱스를 두개 이상

## index의 종류
# index
# 멀티컬럼 index(unique);

# 두가지 이상의 컬럼으로 유니크 인덱스 생성 (포인터참조를 줄이기 위해서 사용)
CREATE UNIQUE INDEX name_email_index on student (name, email);

SELECT * FROM student WHERE name = "Camryn.Senger";

SELECT *
FROM student
WHERE
    name = "Camryn.Senger"
    AND email = "Orland.Toy@gmail.com";

CREATE INDEX email_index ON student (email);

SELECT * FROM student WHERE email = "Estella96@yahoo.com";

-- 두개 이상의 컬럼을 유니크 인덱스로 생성 (두 컬럼을 가지고 있는 유니크한 인덱스라는 뜻)

-- primary key는 자동으로 인덱스가 생성된다.

-- show index에서의 ; Non_unique : 유니크인지 아닌지 정보를 알려준다.
-- 0 : 인덱스가 유니크 제약조건을 가지고 있다 중복값을 허용하지 않는다 ! 라는걸 나타냄 (유니크임)
-- 1 : 반대임! 중복값을 허용한다. (유니크아님)

-- Seq_in_index : 멀티 컬럼 인덱스이면 1 2 이런식으로 멀티컬럼으로 지정한 컬럼을 순서대로 보여준다 (1번인덱스 2번인덱스)

-- Column_name : 어떤 컬럼의 이름인지

## 쿼리문 호출을 할때 어떤 인덱스를 사용한건지 알아보자.
EXPLAIN SELECT * FROM student WHERE email = "Estella96@yahoo.com";
## possible key -> email_index

## DBMS는 옵티마이저 sql을 가장 효율적으로 실행할수 있는 방법을 결정..
## 옵티마이저 오류가 발생할 수 있기 때문에
## 인덱스를 설정했을때 실수를 하지 못하게 하기 위해서

-- 인덱스를 지정해서 테이블 조회
SELECT *
FROM student
USE INDEX (email_index)
WHERE
    email = "Estella96@yahoo.com";
## USE INDEX(email_index) : 인덱스를 사용해달라고 요청을 하는것. 이 인덱스키를 사용해서 조회해 ! 옵티마이저 오류가 나서 다른 키를쓰게될수도 있어서 우선순위를 높여줌

-- 인덱스를 사용하는것을 강제로
SELECT *
FROM student FORCE INDEX (email_index)
WHERE
    email = "Estella96@yahoo.com";
-- 무조건 이걸 사용해서 조회해 ! 옵티마이저 오류가 발생하면 그대로 터짐 그냥 무조건 이거 쓰셈..