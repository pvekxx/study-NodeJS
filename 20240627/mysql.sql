CREATE DATABASE test3;

USE test3

CREATE TABLE user (
    userid INT PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE passport (
    passportid INT PRIMARY KEY,
    userid INT UNIQUE, -- 고유한 값으로 중복되면 안되는 데이터
    passportnumber VARCHAR(100),
    FOREIGN KEY (userid) REFERENCES user (userid)
    -- fk_어쩌구 라고 자동으로 들어감 아마도(mysql)
);

CREATE TABLE address (
    addressid INT PRIMARY KEY,
    userid INT UNIQUE,
    address VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES user (userid)
);

CREATE TABLE student (
    studentid INT PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE course (
    courseid INT PRIMARY KEY,
    title VARCHAR(50)
);

CREATE TABLE linkCourse ( -- 제 3자의 테이블
    studentid INT,
    courseid INT,
    PRIMARY KEY (studentid, courseid), -- ()다중으로 프라이머리 키 줌
    FOREIGN KEY (studentid) REFERENCES student (studentid),
    FOREIGN KEY (courseid) REFERENCES course (courseid)
);