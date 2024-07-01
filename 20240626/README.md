# JOIN

1. 테이블의 연결 관계를 맺고 같은 값을 가진 컬럼이 존재한다.
2. 2개 이상의 테이블을 join으로 조회할 수 있다.
3. 하나의 join은 기본 2개 이상의 테이블의 대상으로 사용하고 3개 4개 5개 쭉쭉 여러개의 테이블도 join으로 조회 가능하다.
4. join을 할 때 테이블의 별칭이 존재한다.

## 제약 조건
> 기본키(primary key) : 식별자로 사용한다. index를 할 수 있는 키를 설정(조회가 빈번히 일어나는 테이블)(인덱싱 개념)
> 외래키(foreign key) : 다른 테이블의 기본키를 참조
> 테이블 간의 관계를 맺을때 외래키를 사용하는 이유는 부모와 자식 테이블 관계를 설정하기 위해서 거는 제약 조건.
> 부모의 테이블에 키의 값이 있고 그 키의 값에 맞는 값을 외래키로 추가해야만 데이터를 저장할 수 있다.

### 외래키의 제약 조건
> 테이블의 관계성을 표현하기 위해 제약조건을 사용
> 테이블 간의 관계를 맺을때 외래키를 사용하는 이유는 부모와 자식 테이블 관계를 설정하기 위해서 거는 제약 조건.
> 부모의 테이블에 키의 값이 있고 그 키의 값에 맞는 값을 외래키로 추가해야만 데이터를 저장할 수 있다.

# JOIN 구조
- inner(내부)
- outer(외부)(left, right, full)
## 기타 JOIN
- cross
- self

### 테이블 생성

```sql
CREATE TABLE student (
    id INT AUTO_INCREMENT,
    name VARCHAR(20),
    class VARCHAR(20),
)

CREATE TABLE student_class (
    class_id INT AUTO_INCREMENT,
    class VARCHAR(20),
    study VARCHAR(20),
)

INSERT INTO student VALUES(1, "soon", "devops"),
(2, "soon", "story"),
(2, "soon", "game");

INSERT INTO student_class VALUES(1, "devops", "full"),
("story", "story1"),
("game", "game1");

SELECT * FROM student;
SELECT * FROM student_class;
```

## INNER JOIN (교집합) 겹치는 부분의 관계성으로 데이터를 출력
> student 테이블과 student_class 데이터의 같은 부분을 조회
> ON : JOIN문의 조건
> student.id와 student_class.class_id 가 같은 내용의 데이터를 조회
```sql
SELECT * FROM student INNER JOIN student_class ON student.id = student_class.class_id;
```


## OUTER JOIN
1. LEFT JOIN
2. RIGHT JOIN

### LEFT JOIN
```sql
SELECT * FROM [테이블 명] LEFT JOIN [테이블 명2] ON [테이블 명].id = [테이블 명2].id;

select * FROM student LEFT JOIN student_class ON student.id = student_class.class_id;
```
