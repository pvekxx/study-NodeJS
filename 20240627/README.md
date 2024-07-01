# 데이터베이스 관계형
 - 1:1
 - 1:N
 - N:1
 - N:M

# index
> 데이터를 조회하는데 최적화

# 데이터베이스 테이블
> 관계형의 용어 entity (데이터베이스에 저장할 데이터 집합)
> 사용자, 물건, 행위, 장소 이러한 명사를 데이터로 집합화 한것.
> table === entity
> table에 저장되는 데이터의 내용이 엔티티

### 관계성
> 비디오 가게 -> 사용자 === 비디오를 빌리는 데이블에 값을 추가할 수 있다.
> 관계성을 시각화 해주는 프로그램 등등의 ERD(entity relationship diagram)
> entity 간의 관계성을 시각화 그림으로 표현해서 확인할 수 있다.

### 관계의 종류
1. 1:1 관계
2. 2:n 관계
3. n:m 관계

## 1:1 관계
> 두 개 이상의 entity 데이터 집합을 하나씩만 관계를 주는 것
> 유저가 회원가입을 진행했을때 name age
> 유저 테이블과
> 유저의 주소를 저장하는 테이블
> 사용자가 있어야 주소 테이블에 값을 저장할수 있다.

## 1:n 관계
> 한 entity에 다른 컬럼(데이터)들이 여러개의 entity에 관계를 주는것
> 유저가 게시판에 댓글을 여러개 달 수 있는 것.

## n:m 관계
> entity에 여러가지의 데이터를 한 entity에 데이터로 관계를 주는것
> 유저가 상품을 구매하고 상품의 상세페이지에 여러명의 유저가 리뷰를 달 수 있다. 여러명의 유저도 구매 요청을 할 수 있는 구조 (제3자가 개입 포린키를 2개를 줘서 중간에서 각자 관계를 맺는다.)


## 관계형 구조
> 사용자가 있고 여권을 발급 받을것.
> 여권에는 사용자의 데이터가 포함되어야 저장이 가능하다.

## 1:1 관계
```sql
CREATE TABLE user(
    userid INT PRIMARY KEY,
    name varchar(50),
);

CREATE TABLE passport(
    passportid INT PRIMARY KEY,
    userid INT UNIQUE, -- 고유한 값으로 중복되면 안되는 데이터
    passportnumber VARCHAR(100),
    FOREIGN KEY (userid) REFERENCES user(userid)
    -- fk_어쩌구 라고 자동으로 들어감 아마도(mysql)
);
```

## 1:n 관계

```sql
CREATE TABLE address(
    addressid INT PRIMARY KEY,
    userid INT UNIQUE,
    address VARCHAR(255),
    FOREIGN KEY (userid) REFERENCES user(userid);
);
```

## N:M 관계
> 학생이 수강하고 있는 반
> 반의 과목의 내용을 저장할 수 있다.

```sql
CREATE TABLE student(
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
```