# md4 : most bytes 4
# utf8md4 : 4바이트씩 사용하는 utf8 문자 집합으로 유니코드 문자를 지원하겠다.
# general : 비교 정렬 규칙을 정의하는데 단순한 규칙으로 정의하겠다.
# ci : 대소문자 구분 안하겠다.
CREATE DATABASE soon DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

SHOW DATABASES;
# utf8mb4 : 한글 포함 전세계 문자 + 이모티콘 사용 가능
# utf8mb4_general_ci : 간단한 정렬과비교를 사용해서 정렬속도를 빠르게 사용하겠다.

# ;
# 데이터 베이스 삭제
DROP DATABASE soon;

# 데이터 베이스를 사용하겠다.
# USE [이름]
USE soon;

# 사용하는 데이터베이스의 테이블 내용을 확인
SHOW TABLES;

# 테이블 생성
-- CREATE TABLe [이름]([컬럼 이름][데이터 타입][옵션])
# AUTO_INCREMENT : 자동으로 증가한다. 1 2 3 4 5
# 테이블에 열이 하나씩 추가될때마다 증가한다.
# PRIMARY KEY : 고유한 키 하나만 존재 할 수 있다. 식별자(고유값 하나만 줄 수 있음)
# VARCHAR : 256BYTE 가변데이터 20자 (우리가 20자 까지 사용을 안하면 알아서 맞춘다.) 문자열 사용할때

CREATE TABLE store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tel VARCHAR(20)
);

# 테이블 필드 확인
-- DESC [테이블 이름];
DESC store;

CREATE TABLE user (
    user_id VARCHAR(20) PRIMARY KEY,
    user_pw VARCHAR(20) NOT NULL,
    user_name VARCHAR(10) NOT NULL,
    gender char(4) DEFAULT "남자",
    date DATETIME DEFAULT now()
);

DESC user;

# 테이블 값 추가
# (user_id, user_pw, user_name, gender)괄호안의 순서대로 값을 할당 하겠다.
# VALUES(추가할 데이터 내용들)
INSERT INTO
    user (user_id, user_pw, user_name)
VALUES ("userid0", "123", "soon");
# 조회
SELECT * FROM user;
# * 와일드 카드 (전체라는 뜻)
# 조회를 할때 원하는 필드의 내용을 찾아서 조회
# WHERE 조회할 속성을 정해줄수 있다.
SELECT * FROM user WHERE user_id = "userid0";

SELECT user_id, user_name FROM user WHERE user_name = "soon";
# SELECT다음 오는 값을 가져온다 뒤에는 조건
# 값을 수정
UPDATE user
SET
    gender = "남자",
    user_name = "soons"
WHERE
    user_id = "userid0"
    AND user_name = "soons";
# 수정할 내용을 SET 뒤에 적는다. WHERE문 뒤에는 조건
# 테이블 에서 값 삭제
DELETE FROM user WHERE user_id = "userid0";
## 정리
# mysql -u root -p : mysql에 접속
# create database [데이터 베이스 이름] : 데이터 베이스 생성
# drop database [데이터 베이스 이름] : 데이터 베이스 삭제

CREATE DATABASE soon2;

SHOW DATABASES;

DROP database soon2;

# 테이블 생성
CREATE Table [테이블의 이름] ([필드명, 데이터 타입]);

# 모든 테이블 조회
SHOW TABLES;

# 데이터 베이스 사용(엑셀 파일 열기)
use [테이블 이름];

# 테이블 필드 확인
DESC [테이블 이름];
# 테이블 선택 값 조회
SELECT [필드1, 필드2 ...] FROM [테이블 이름];
# 테이블의 모든 데이터 조회
SELECT * FROM [테이블 이름];

# 테이블의 값을 조회하는데 오름 차순 내림 차순
SELECT * FROM [테이블 이름] ORDER BY [필드 이름] [DESC | ASC]
# DESC : 필드명을 기준으로 내림차순, ASC : 오름차순
# 기본값은 ASC

# 테이블의 값을 조회할때 시작 데이터 조회
# A로 시작하는 데이터를 가지고 있는 로우들을 조회하겠다.
SELECT * FROM [테이블 이름] WHERE [필드] LIKE "A%";

# 테이블의 값을 조회할때 끝 데이터 조회
# A로 끝나는 데이터를 가지고 있는 로우들을 조회하겠다.
SELECT * FROM [테이블 이름] WHERE [필드] LIKE "%A";

# 테이블 값 삭제
DELETE FROM [테이블 이름] WHERE [필드]="값";

# 테이블 값 추가
INSERT INTO [테이블 이름] (필드1, 필드2, 필드의이름들 ...) VALUES(값1, 값2, 순서대로 할당할 값들 ...);

# 테이블 값 수정
UPDATE [테이블 이름] SET [필드]="값", [필드2]="값" WHERE [필드]="값" (AND, OR 등 사용가능) [필드]="값";

-- SELECT * FROM user WHERE user_name LIKe "s%";

# 테이블 이름 바꾸기
ALTER TABLE [테이블 이름] RENAME [변경할 이름];

SHOW TABLES;

ALTER TABLE user RENAME users;

# 컬럼의 이름, 데이터 타입을 바꾸기
ALTER TABLE [테이블 이름] CHANGE [기존 컬럼 이름] [새로운 컬럼 이름] [데이터 타입];

SELECT * FROM users;

ALTER TABLE users CHANGE users_name name VARCHAR(10);

# 컬럼의 타입만 변경하고 싶다.
ALTER TABLE [테이블 이름] MODIFY [컬럼의 이름] [수정할 데이터 타입];

ALTER TABLE users MODIFY name VARCHAR(5);

# 필드를 제거
ALTER TABLE [테이블 이름] DROP [필드 이름];

ALTER TABLE users DROP name;

# 필드를 추가
# 필드 맨 뒤로 추가
ALTER TABLE [테이블 이름] ADD [추가할 필드 이름][데이터 타입];

ALTER TABLE users ADD name VARCHAR(10);

# 필드를 추가
# 필드를 맨 앞으로 추가
ALTER TABLE [테이블 이름] ADD [추가할 필드 이름][데이터 타입] first;

ALTER TABLE users ADD name2 VARCHAR(10) first;

# 테이블의 자동 증가 옵션이 있는 숫자형은 중간 값을 지우면 인덱스 값은 저장되어있다.
# 테이블 속성에서 초기화
ALTER TABLE [테이블의 이름] AUTO_INCREMENT = 0;

# 게시판 table 만들고 컬럼은 id, content, title, like, owner, view;

## 테이블 생성
CREATE TABLE board (
    id VARCHAR(10) PRIMARY KEY,
    content VARCHAR(20) NOT NULL,
    title VARCHAR(10) NOT NULL,
    `like` INT DEFAULT 0,
    owner VARCHAR(10) NOT NULL,
    view INT DEFAULT 0
);
## 테이블 필드 확인
DESC board;
## 테이블 조회
SELECT * FROM board;

# 게시글 추가 조회 수정 삭제

## 테이블 값 추가
INSERT into
    board (id, content, title, owner)
VALUES (
        "user5",
        "내용5",
        "제목5",
        "owner5"
    );

## 필드 데이터 타입 변경
ALTER TABLE board MODIFY content TEXT;
## 테이블 조회
SELECT * FROM board WHERE id = "user1";
## 테이블에서 값을 수정
UPDATE board SET `like` = 10 WHERE id = "user5";

UPDATE board SET view = 0 WHERE id = "user5";
## 테이블에서 값 삭제
DELETE FROM board WHERE id = "user1";

# 오름차순 내림차순 조회
SELECT * FROM board ORDER BY `like` asc;

SELECT * FROM board ORDER BY `like` desc;

SELECT * FROM board ORDER BY view asc;

SELECT * FROM board ORDER BY view desc;

123