# API Specification

## 1. 인증 이메일 발신 (Send Verification Email)
가천대 아이디로 인증 번호를 발송합니다.
- **Endpoint**: `POST /signUp/createOtp`
- **Request Body**: `{ "gachon_id": "string" }`
- **Response**: `{ "res_status": true, "tidx": number }`

## 2. 이메일 인증 (Email Verification)
발송된 인증 번호를 검증합니다.
- **Endpoint**: `POST /signUp/otp`
- **Request Body**: `{ "tidx": number, "otp": number }`
- **Response**: `{ "res_status": true }`

## 3. 회원가입 (User Registration)
회원 정보를 등록합니다. 가입 시 100포인트가 기본 지급됩니다.
- **Endpoint**: `POST /signUp/user`
- **Request Body**: `{ "gachon_id": "string", "name": "string", "password": "string" }`
- **Response**: `{ "res_status": true }`

## 4. 로그인 (Login)
서비스에 로그인합니다.
- **Endpoint**: `POST /login`
- **Request Body**: `{ "gachon_id": "string", "password": "string" }`
- **Response**: `{ "res_status": true, "uidx": number }`

---

## 5. 현재 포인트 조회 (Get Current Points)
사용자의 현재 보유 포인트를 조회합니다.
- **Endpoint**: `POST /profile/point`
- **Request Body**: `{ "uidx": number }`
- **Response**: `{ "res_status": true, "point": number }`

## 6. 전문가 타이틀 조회 (Get Expert Tags)
사용자의 카테고리별 전문가 타이틀 수치를 조회합니다.
- **Endpoint**: `POST /profile/tag`
- **Request Body**: `{ "uidx": number }`
- **Response**: `{ "res_status": true, "exercise": number, "study": number, "music": number, "game": number, "clean": number }`

---

## 7. 게시글 작성 (Create Post)
새로운 게시글을 작성합니다. 작성 시 역할(accept) 정보를 포함해야 합니다.
- **Endpoint**: `POST /donation/write`
- **Request Body**:
  ```json
  {
    "uidx": number,
    "title": "string",
    "text": "string",
    "duedate": "YYYY-MM-DD",
    "exercise": number, "study": number, "music": number, "game": number, "clean": number,
    "accept": [
      { "role": "string", "point": number }
    ]
  }
  ```
- **Response**: `{ "res_status": true, "didx": number }`

## 8. 전체 게시글 조회 (Get All Posts)
등록된 모든 게시글 목록을 조회합니다.
- **Endpoint**: `POST /donation/list`
- **Request Body**: `{}`
- **Response**: `{ "res_status": true, "donations": [...] }`

## 9. 글 상세 내용 조회 (Get Post Detail)
특정 게시글의 상세 내용을 조회합니다.
- **Endpoint**: `POST /donation/detail`
- **Request Body**: `{ "didx": number }`
- **Response**: `{ "res_status": true, "didx": number, "title": "string", ... }`

---

## 10. 특정 게시글 역할 조회 (Get Post Roles)
게시글에 할당된 역할 목록을 조회합니다.
- **Endpoint**: `POST /accept/detail`
- **Request Body**: `{ "didx": number }`
- **Response**: `{ "res_status": true, "accept": [...] }`

## 11. 역할 신청 (Subscribe Role)
특정 역할에 신청합니다.
- **Endpoint**: `POST /accept/subscribe`
- **Request Body**: `{ "uidx": number, "aidx": number }`
- **Response**: `{ "res_status": true }`

## 12. 포인트 지급 승인 (Approve Role)
활동 완료 후 포인트를 지급하고 능력치를 상승시킵니다.
- **Endpoint**: `POST /accept/approval`
- **Request Body**: `{ "aidx": number }`
- **Response**: `{ "res_status": true }`

---

## 13. 특정 게시글 댓글 조회 (Get Post Comments)
특정 게시글에 달린 댓글과 대댓글 목록을 조회합니다.
- **Endpoint**: `POST /comment/detail`
- **Request Body**: `{ "didx": number }`
- **Response**: `{ "res_status": true, "comment": [...] }`

## 14. 댓글 작성 (Create Comment)
- **Endpoint**: `POST /comment/write`
- **Request Body**: `{ "uidx": number, "didx": number, "text": "string" }`
- **Response**: `{ "res_status": true, "cidx": number }`

## 15. 대댓글 작성 (Create Reply)
- **Endpoint**: `POST /comment/writeReply`
- **Request Body**: `{ "uidx": number, "cidx": number, "text": "string" }`
- **Response**: `{ "res_status": true }`
