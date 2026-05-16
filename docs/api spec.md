# API Specification

## 1. 인증 이메일 발신 (Send Verification Email)

가천대 아이디로 인증 번호를 발송합니다.

- **Endpoint**: `POST /signUp/createOtp`
- **Full URL**: `https://hackathon.gdgoc.net/signUp/createOtp`
- **Request Body**:
  ```json
  {
    "gachon_id": "string (가천대 아이디)"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "tidx": number
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 2. 이메일 인증 (Email Verification)

발송된 인증 번호를 검증합니다.

- **Endpoint**: `POST /signUp/otp`
- **Full URL**: `https://hackathon.gdgoc.net/signUp/otp`
- **Request Body**:
  ```json
  {
    "tidx": number,
    "otp": number
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 3. 회원가입 (User Registration)

회원 정보를 등록합니다.

- **Endpoint**: `POST /signUp/user`
- **Full URL**: `https://hackathon.gdgoc.net/signUp/user`
- **Request Body**:
  ```json
  {
    "gachon_id": "string (가천대 아이디)",
    "name": "string (이름)",
    "password": "string (비밀번호)"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 4. 로그인 (Login)

서비스에 로그인합니다.

- **Endpoint**: `POST /login`
- **Full URL**: `https://hackathon.gdgoc.net/login`
- **Request Body**:
  ```json
  {
    "gachon_id": "string (가천대 아이디)",
    "password": "string (비밀번호)"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "uidx": number
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 5. 메일 발신 (Send Email - External: Resend)

외부 서비스(Resend)를 사용하여 메일을 발송합니다.

- **Endpoint**: POST https://api.resend.com/emails
- **Authorization**: Bearer re_UJsFKnor_LfHwJ88nfE98S2srA8EBMtoa
- **Request Body**:
  ```json
  {
    "from": "GDGoC Gachon <no-replay@gdgoc.net>",
    "to": ["string (수신자 이메일)"],
    "subject": "string (메일 제목)",
    "html": "string (HTML 메일 본문)"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "id": "string (발신 성공 시 반환되는 ID)"
    }
    ```

---

## 6. 현재 포인트 조회 (Get Current Points)

사용자의 현재 보유 포인트를 조회합니다.

- **Endpoint**: POST /profile/point
- **Full URL**: https://hackathon.gdgoc.net/profile/point
- **Request Body**:
  ```json
  {
    "uidx": number
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "point": number
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 7. 전문가 타이틀 조회 (Get Expert Tags)

사용자의 카테고리별 전문가 타이틀 수치를 조회합니다.

- **Endpoint**: POST /profile/tag
- **Full URL**: https://hackathon.gdgoc.net/profile/tag
- **Request Body**:
  ```json
  {
    "uidx": number
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "exercise": number,
      "study": number,
      "music": number,
      "game": number,
      "clean": number
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 8. 게시글 작성 (Create Post)

새로운 재능 기부 또는 요청 게시글을 작성합니다.

- **Endpoint**: `POST /donation`
- **Full URL**: `https://hackathon.gdgoc.net/donation`
- **Request Body**:
  ```json
  {
    "status": number,
    "writerIdx": number,
    "title": "string",
    "text": "string",
    "duedate": "string (YYYY-MM-DD)",
    "exercise": number,
    "study": number,
    "music": number,
    "game": number,
    "clean": number
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "didx": number
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 9. 전체 게시글 조회 (Get All Posts)

등록된 모든 게시글 목록을 조회합니다.

- **Endpoint**: `POST /donation`
- **Full URL**: `https://hackathon.gdgoc.net/donation`
- **Response**:
  - **200 OK**:
    ```json
    [
      {
        "didx": number,
        "status": number,
        "writerIdx": number,
        "title": "string",
        "text": "string",
        "duedate": "string",
        "exercise": number,
        "study": number,
        "music": number,
        "game": number,
        "clean": number
      },
      ...
    ]
    ```

---

## 10. 특정 게시글 댓글 조회 (Get Post Comments)

특정 게시글에 달린 댓글과 대댓글 목록을 조회합니다.

- **Endpoint**: `POST /comment/detail`
- **Full URL**: `https://hackathon.gdgoc.net/comment/detail`
- **Request Body**:
  ```json
  {
    "didx": number
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "comment": [
        {
          "cidx": number,
          "writeidx": number,
          "text": "string",
          "reply": [
            {
              "writeidx": number,
              "text": "string"
            }
          ]
        }
      ]
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 11. 댓글 작성 (Create Comment)

게시글에 새로운 댓글을 작성합니다.

- **Endpoint**: `POST /comment/write`
- **Full URL**: `https://hackathon.gdgoc.net/comment/write`
- **Request Body**:
  ```json
  {
    "uidx": number,
    "didx": number,
    "test": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true,
      "cidx": number
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```

---

## 12. 대댓글 작성 (Create Reply)

특정 댓글에 대댓글을 작성합니다.

- **Endpoint**: `POST /comment/writeReply`
- **Full URL**: `https://hackathon.gdgoc.net/comment/writeReply`
- **Request Body**:
  ```json
  {
    "uidx": number,
    "cidx": number,
    "test": "string"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "res_status": true
    }
    ```
  - **400 Bad Request**:
    ```json
    {
      "res_status": false
    }
    ```
