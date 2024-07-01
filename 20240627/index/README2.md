# index
> 데이터베이스의 인덱스는 중요한 개념중 하나. 데이터의 검색 성능을 잘 사용하면! 정말 높은 성능을 향상 시킬 수 있다. 데이터의 빠른 접근을 할수 있게 만들어주는 자료 구조

# DBMS index
> b-tree 기반의 동작을 할 수가 있다.
> b-tree 기반의 인덱스를 생성한다.
> 데이터가 한글이면 초성, 중성, 종성 순서로 구분 사전식
> 예. 가, 각, 간, 갇, 갈 ...
> 영문은 a,b,c,d,e,f 알파벳 순서 사전식
> 숫자는 작은 순 정렬
> 정렬된 인덱스는 실제 테이블 데이터의 포인터의 값을 하나씩 갖는다.
> id를 찾는다고 가정하면
> SELECT * FROM student where id=100;
> `바이너리 서치`를 한다고 부름.
> 쉽게 말해서 전체 데이터의 가운데 값을 조회하고 가운데 값이 찾는 값보다 큰지 작은지 비교하고 다음 기준에서 반복한다. 찾으면 찾은 기준의 데이터 아래 위를 맞는 범위까지 조회하고 안맞으면 끝낸다.
> 더 쉽게 말해서 가운데 값을 조회하면서 데이터를 찾을때 까지 범위를 좁혀나간다.

> 두개의 값을 찾는다 가정할때 SELECT * FROM where id=100 and age=50;
> 인덱스는 id만 설정이 되어 있다고 가정하고
> 위와 동일하게 바이너리 서치를 하고 age값을 포인터로 참조해서 모두 확인한다.
> 맞는지 맞지 않는지 조건을 모두 찾을때 까지 확인하면서 포인터 접근을 하기 때문에
> age라는 컬럼은 full scan을 하게 된다.

> id와 age를 둘다 멀티 컬럼 인덱스로 묶어서 관리하면
> 위와 동일하게 바이너리 서치를 하는데 id와 age의 값이 둘다 일치할때 인덱스의 데이터에서 포인터 접근을 한다. 좀더 효율적 id age둘다 인덱싱이 된것.

> 멀티 컬럼 인덱스 묶은 순서에서 왼쪾의 컬럼을 순서대로 정렬하고 그 정렬한 순서의 기준으로 매핑되는 컬럼의 데이터로 오른쪽 컬럼의 데이터는 정렬한다.

> 인덱스가 조회에는 좋기는 한데. 막쓰면 위험하다. 안쓴것만 못함
> 추가, 수정, 삭제 오래걸린다 왜? 인덱스의 데이터도 생성이 되기 때문에 (데이터의 저장 공간도 늘어난다.)
> 데이터베이스의 오버헤드 : 너무 많은 인덱스가 있으면 DBMS 성능이 떨어진다.
> 꼭 필요한 곳인지 확인. 조회가 번번히 일어나고 데이터가 많은경우 ( 추가 수정 삭제가 조금만 일어나는 테이블.. 너무 많이되는 곳은 X )

> 인덱스로 지정한 데이터가 전체 테이브르이 데이터중에 상당수를 차지하는 경우에는 full scan을 하는게 더 빠르다.

`옵티마이즈` : DBMS가 최적의 쿼리를 사용하게 만들어주는것. 자기가 알아서 생각해서 빠를 것 같은 걸로 만듬..


## index구조 
```sql
CREATE DATABASE test4;
use test4;

-- full scan
SELECT * FROM student;

-- full scan
SELECT * FROM student WHERE name="soon";
-- index가 되어 있지 않으면 모든 데이터를 조회하고 결과를 찾는다.

create table student(
    id int auto_increment primary key,
    name varchar(50),
    email varchar(50),
    age int,
    class varchar(10)
);
```

## 테이블에 값을 csv를 가져와서 추가해보자.
> mysql 로컬 파일을 읽을 수 있는 상태인지 속성을 확인 해봐야 하낟.
```sql
mysql -u root -p -- 로 접속
show global variables like "local_infile";
set global local_infile=On; --off 면 on을 해준다.

-- 파일을 가져올 경로
show variables like "secure_file_priv"
set global secure_file_priv="/Users/hyuk/Desktop/Devops/mysqlcsv";

-- 가져올 경로 지정

-- CSV파일 생성
```