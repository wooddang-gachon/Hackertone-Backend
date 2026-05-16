# API Test Guide for Postman

로컬 환경(`http://localhost:3000`)에서 Postman이나 Thunder Client를 통해 테스트할 수 있는 API 양식입니다.

## 1. 환경 설정 (Postman)

- **Base URL**: `http://localhost:3000`
- **Method**: 모든 요청은 `POST`
- **Headers**: `Content-Type: application/json`

---

## 2. API 상세 양식

### [인증 - Auth]

#### 회원가입

- **URL**: `http://localhost:3000/signUp/user`
- **Body (JSON)**:

```json
{
  "gachon_id": "testuser1",
  "name": "홍길동",
  "password": "password123"
}
```

#### 로그인

- **URL**: `http://localhost:3000/login`
- **Body (JSON)**:

```json
{
  "gachon_id": "testuser1",
  "password": "password123"
}
```

---

### [게시글 - Donation]

#### 글 작성 (역할 포함)

- **URL**: `http://localhost:3000/donation/write`
- **Body (JSON)**:

```json
{
  "uidx": 1,
  "title": "C++ 과제 도와주세요",
  "text": "포인터 개념이 너무 어렵습니다.",
  "duedate": "2024-12-31",
  "exercise": 0,
  "study": 1,
  "music": 0,
  "game": 0,
  "clean": 0,
  "accept": [
    { "role": "튜터", "point": 50 },
    { "role": "보조", "point": 20 }
  ]
}
```

#### 전체 글 목록 조회

- **URL**: `http://localhost:3000/donation/list`
- **Body (JSON)**: `{}`

#### 글 상세 내용 조회

- **URL**: `http://localhost:3000/donation/detail`
- **Body (JSON)**:

```json
{
  "didx": 1
}
```

---

### [역할 신청 및 승인 - Accept]

#### 역할 목록 조회 (글 내부)

- **URL**: `http://localhost:3000/accept/detail`
- **Body (JSON)**:

```json
{
  "didx": 1
}
```

#### 역할 신청하기

- **URL**: `http://localhost:3000/accept/subscribe`
- **Body (JSON)**:

```json
{
  "uidx": 2,
  "aidx": 1
}
```

#### 포인트 지급 승인 (최종 완료)

- **URL**: `http://localhost:3000/accept/approval`
- **Body (JSON)**:

```json
{
  "aidx": 1
}
```

---

### [댓글 - Comment]

#### 댓글 작성

- **URL**: `http://localhost:3000/comment/write`
- **Body (JSON)**:

```json
{
  "uidx": 2,
  "didx": 1,
  "text": "제가 도와드릴 수 있어요!"
}
```

#### 대댓글 작성

- **URL**: `http://localhost:3000/comment/writeReply`
- **Body (JSON)**:

```json
{
  "uidx": 1,
  "cidx": 1,
  "text": "오 언제 가능하신가요?"
}
```

#### 댓글 목록 조회

- **URL**: `http://localhost:3000/comment/detail`
- **Body (JSON)**:

```json
{
  "didx": 1
}
```

---

### [프로필 - Profile]

#### 현재 포인트 조회

- **URL**: `http://localhost:3000/profile/point`
- **Body (JSON)**:

```json
{
  "uidx": 1
}
```

#### 전문가 태그 조회

- **URL**: `http://localhost:3000/profile/tag`
- **Body (JSON)**:

```json
{
  "uidx": 1
}
```
