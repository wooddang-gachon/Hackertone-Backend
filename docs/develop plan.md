# Development Plan: GDGoc Gachon Talent Donation Platform

본 문서는 확정된 비즈니스 로직을 바탕으로 한 단계별 개발 로드맵입니다. 해커톤의 제한된 시간을 고려하여 핵심 기능(MVP) 구현에 집중합니다.

---

## 🏁 Phase 1: 인증 및 사용자 초기화 (Auth & User)
**목표**: 회원가입 시나리오를 완성하고 사용자 초기 데이터를 설정합니다.

1.  **회원가입 로직 수정** (`src/repositories/users.js`, `src/services/auth.js`)
    - 가입 시 기본 포인트 `point: 100` 부여.
    - 비밀번호 평문 저장 확인.
2.  **OTP 보안 강화** (`src/repositories/temp.js`, `src/services/auth.js`)
    - `tempRepo.deleteByGachonId` 메서드 추가.
    - 회원가입(`signUp/user`) 성공 직후 해당 아이디의 OTP 데이터 삭제 로직 구현.

---

## 📝 Phase 2: 게시글 및 댓글 시스템 (Post & Comment)
**목표**: 요청 게시글을 작성하고 댓글로 소통하는 기반을 마련합니다.

1.  **게시글 작성 고도화** (`src/api/routes/donation.js`, `src/services/donation.js`)
    - 작성 시 유저의 현재 포인트를 조회하여 `pay_point <= current_point` 검증 로직 추가.
    - 다중 카테고리(exercise, study 등) 입력값 처리 확인.
2.  **댓글 시스템 구현** (New Files)
    - `src/api/routes/comment.js`: 특정 게시글의 댓글 목록 조회(`POST /comment/detail`), 댓글 작성(`POST /comment/write`), 대댓글 작성(`POST /comment/writeReply`) 라우트 생성.
    - `src/services/comment.js` & `src/repositories/comment.js`: 댓글 CRUD 비즈니스 로직 및 SQL 구현.

---

## 🤝 Phase 3: 매칭 및 보상 시스템 (Matching & Reward)
**목표**: 서비스의 핵심인 '매칭 수락'과 '활동 완료에 따른 보상'을 구현합니다.

1.  **매칭 수락 API** (`POST /donation/accept`)
    - 작성자가 특정 댓글의 유저를 수락.
    - `donation.status`를 '진행 중'으로 변경.
    - `accept` 테이블에 매칭 이력 생성.
2.  **활동 완료 및 정산 API** (`POST /donation/complete`)
    - 작성자가 활동 종료 후 완료 처리.
    - `donation.status`를 '완료'로 변경.
    - **트랜잭션 처리**:
        - 작성자 포인트 차감 & 수락자 포인트 증액.
        - 수락자의 게시글 관련 **모든 카테고리** 능력치 1씩 가산 (기부 횟수 누적).

---

## 🔍 Phase 4: 검증 및 문서화 (Validation & Docs)
**목표**: 전체 시나리오를 테스트하고 문서를 최종 업데이트합니다.

1.  **통합 테스트**
    - 가입(100p) -> 글 작성(포인트 검증) -> 댓글 -> 수락 -> 완료(포인트 이동 및 능력치 상승) 흐름 확인.
2.  **API 명세서 최종본 업데이트** (`docs/api spec.md`)
    - 추가된 댓글 API, 매칭 수락/완료 API 정보 반영.
3.  **최종 빌드 및 정리**
    - 불필요한 코드(채팅, 소켓 등) 정리 및 로깅 확인.
