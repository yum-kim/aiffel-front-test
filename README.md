# aiffel-front-test

### 📎 사용한 기술 스택 / 라이브러리

> React

#### 스타일링

---

> SCSS, CSS Module, React-icons

#### 라우팅

---

> React-router

#### 상태관리

---

> Redux, Redux-saga

### 서버

> json-server

<br />

### 📎 구현관련 메모

✅ 요구사항의 전체 페이지 구현 완료 하였습니다. (프로필 제외)

✅ 포럼 작성 페이지를 별도로 라우팅 할 것인지에 대해서는 따로 요구사항이 없어서 포럼 목록 페이지에서 컴포넌트를 바꾸는 방법이 아닌 '/forum/add' 페이지로 분리하였습니다.

✅ 포럼 목록의 데이터 요청 방법

> 검색은 array filter로 구현 안내 되어있었으나,
> pagination은 쿼리스트링 GET 요청으로 안내되어있어 목록 데이터를 바인딩 하는 것에 여러 방법을 함께 적용하였습니다.

1. 컴포넌트 마운트 시점: 전체 데이터 목록을 서버 GET 요청 후 상태값 보관
2. 검색어를 사용한 검색 시: 보관해둔 전체 데이터 중 array filter 사용해 바인딩 (검색 결과값은 별개로 상태값 보관)
3. pagination 클릭 시: page,limit를 파라미터로 서버 GET 요청 후 바인딩 (요청된 데이터는 별개로 상태값 보관)

<br />

### 📎 프로젝트 실행 방법

```
# root 폴더에서 모듈 설치 후 실행

npm i
npm run start
```

```
# json-server 폴더에서 모듈 설치 후 실행

cd json-server-test
npm i
npm run start
```
