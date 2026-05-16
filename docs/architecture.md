# System Architecture: GDGoc Gachon Talent Donation Platform

## 1. Architectural Pattern: Layered Architecture
본 프로젝트는 관심사 분리(Separation of Concerns)를 위해 **3-Tier Layered Architecture** 패턴을 따릅니다.

### A. Route Layer (API Endpoints)
- **위치**: `src/api/routes/`
- **역할**: 클라이언트의 HTTP 요청을 수신하고, 요청 데이터를 검증한 후 적절한 Service로 전달합니다.
- **특징**: 비즈니스 로직을 직접 포함하지 않으며, 응답 상태 코드(HTTP Status Code)를 결정합니다.

### B. Service Layer (Business Logic)
- **위치**: `src/services/`
- **역할**: 실제 비즈니스 로직을 수행합니다. 여러 Repository를 조합하여 트랜잭션을 처리하거나 외부 API(예: 메일 발송)와 연동합니다.
- **특징**: Repository 레이어에 의존하며, 데이터베이스의 세부 구현 사항(SQL 등)으로부터 독립적입니다.

### C. Repository Layer (Data Access)
- **위치**: `src/repositories/`
- **역할**: 데이터베이스(MySQL)에 직접 접근하여 CRUD 작업을 수행합니다.
- **특징**: `mysql2/promise` 풀(Pool)을 사용하여 SQL 쿼리를 실행하며, 테이블 구조와 직접적으로 매핑됩니다.

---

## 2. Technology Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MySQL 8.0 (Host: gdgoc.net)
- **Logging**: Winston (Request/Response 통합 로깅)
- **Process Manager**: Nodemon (Development)

---

## 2.1. Monitoring & Logging
본 서비스는 안정적인 운영과 디버깅을 위해 Winston 기반의 통합 로깅 시스템을 구축하였습니다.
- **Middleware**: `src/api/middlewares/logger.js`가 모든 API 호출을 가로채어 기록합니다.
- **로그 범위**: 요청 메서드, URL, HTTP 상태 코드, 처리 시간(ms), **요청 바디(Body)** 및 **응답 데이터(Response)** 전체를 JSON 형태로 기록합니다.
- **활용**: 개발 단계에서의 실시간 구동 과정 확인 및 운영 단계에서의 장애 원인 파악에 활용됩니다.

---

## 3. Directory Structure
```text
src/
├── app.js              # 애플리케이션 진입점 (Express 서버 초기화)
├── api/                # API 레이어 (라우팅)
│   ├── index.js        # 모든 라우트를 통합하여 로더에 연결
│   ├── middlewares/    # 요청 가로채기 및 검증 로직 (CORS, Auth 등)
│   └── routes/         # HTTP 엔드포인트 정의
│       ├── auth.js     # 로그인, 회원가입, OTP 인증
│       ├── donation.js # 게시글 관리 및 매칭 관련
│       ├── profile.js  # 포인트 및 능력치 조회
│       └── comment.js  # 댓글/대댓글 조회 및 작성
├── services/           # 서비스 레이어 (비즈니스 로직)
│   ├── auth.js         # 인증 및 계정 생성 로직
│   ├── donation.js     # 게시물 관리 및 매칭 비즈니스 로직
│   ├── profile.js      # 사용자 정보 처리
│   └── comment.js      # 댓글/대댓글 관련 비즈니스 로직
├── repositories/       # 레포지토리 레이어 (데이터 액세스)
│   ├── users.js        # 사용자 데이터 CRUD
│   ├── donation.js     # 게시글 데이터 CRUD
│   ├── comment.js      # 댓글 데이터 CRUD
│   └── accept.js       # 매칭 수락 데이터 관리
├── loaders/            # 로더 레이어 (초기 설정 및 의존성 주입)
│   ├── express.js      # Express 미들웨어 및 라우트 로드
│   ├── mysql.js        # MySQL 커넥션 풀 초기화
│   └── index.js        # 모든 로더 실행 통합 프로세스
├── config/             # 설정 레이어
│   ├── index.js        # 환경 변수(.env) 통합 관리
│   └── logger.js       # Winston 로거 설정
└── models/             # 데이터 모델 정의 (Optional)
```

---

## 4. Data Flow Example
1.  **Request**: 사용자가 `/login`으로 POST 요청 발송.
2.  **Route**: `routes/auth.js`에서 요청을 받아 `authService.login()` 호출.
3.  **Service**: `services/auth.js`에서 비밀번호 검증 및 `userRepo.findByGachonId()` 호출.
4.  **Repository**: `repositories/users.js`에서 `SELECT` 쿼리 실행 후 결과 반환.
5.  **Response**: Service의 결과를 바탕으로 Route에서 `200 OK` 또는 `400 Bad Request` 응답.

**Example 2: 전문가 타이틀 조회 (Get Expert Tags)**
1.  **Request**: 사용자가 `/profile/tag`로 POST 요청 발송.
2.  **Route**: `routes/profile.js`에서 요청을 받아 `profileService.getTags()` 호출.
3.  **Service**: `services/profile.js`에서 `userRepo.findById()`를 호출하여 사용자 정보를 가져옴.
4.  **Repository**: `repositories/users.js`에서 해당 사용자의 5가지 능력치(`exercise`, `study` 등) 정보를 반환.
5.  **Response**: 조회된 수치 데이터와 함께 `200 OK` 응답.
