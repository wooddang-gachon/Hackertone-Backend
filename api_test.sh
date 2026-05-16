#!/bin/bash

BASE_URL="http://localhost:3000"

echo "--- 1. 회원가입 및 로그인 테스트 ---"
# 회원가입
curl -X POST "$BASE_URL/signUp/user" \
     -H "Content-Type: application/json" \
     -d '{"gachon_id": "testuser1", "name": "테스터1", "password": "password123"}'
echo -e "\n"

# 로그인
LOGIN_RES=$(curl -s -X POST "$BASE_URL/login" \
     -H "Content-Type: application/json" \
     -d '{"gachon_id": "testuser1", "password": "password123"}')
echo "Login Response: $LOGIN_RES"
UIDX=$(echo $LOGIN_RES | grep -oE '"uidx":[0-9]+' | cut -d: -f2)
echo "UIDX: $UIDX"
echo -e "\n"

echo "--- 2. 게시글 작성 테스트 ---"
WRITE_RES=$(curl -s -X POST "$BASE_URL/donation/write" \
     -H "Content-Type: application/json" \
     -d "{
       \"uidx\": $UIDX,
       \"title\": \"C++ 과제 도와주세요\",
       \"text\": \"포인터 개념이 너무 어려워요.\",
       \"duedate\": \"2024-12-31\",
       \"exercise\": 0,
       \"study\": 1,
       \"music\": 0,
       \"game\": 0,
       \"clean\": 0,
       \"accept\": [
         {\"role\": \"튜터\", \"point\": 50}
       ]
     }")
echo "Write Response: $WRITE_RES"
DIDX=$(echo $WRITE_RES | grep -oE '"didx":[0-9]+' | cut -d: -f2)
echo "DIDX: $DIDX"
echo -e "\n"

echo "--- 3. 게시글 목록 및 상세 조회 ---"
curl -X POST "$BASE_URL/donation/list" -H "Content-Type: application/json" -d '{}'
echo -e "\n"
curl -X POST "$BASE_URL/donation/detail" -H "Content-Type: application/json" -d "{\"didx\": $DIDX}"
echo -e "\n"

echo "--- 4. 역할 조회 및 신청 테스트 ---"
ACCEPT_LIST_RES=$(curl -s -X POST "$BASE_URL/accept/detail" \
     -H "Content-Type: application/json" \
     -d "{\"didx\": $DIDX}")
echo "Accept List: $ACCEPT_LIST_RES"
AIDX=$(echo $ACCEPT_LIST_RES | grep -oE '"aidx":[0-9]+' | head -1 | cut -d: -f2)
echo "AIDX: $AIDX"

# 역할 신청
curl -X POST "$BASE_URL/accept/subscribe" \
     -H "Content-Type: application/json" \
     -d "{\"uidx\": $UIDX, \"aidx\": $AIDX}"
echo -e "\n"

echo "--- 5. 댓글 작성 및 조회 ---"
COMMENT_RES=$(curl -s -X POST "$BASE_URL/comment/write" \
     -H "Content-Type: application/json" \
     -d "{\"uidx\": $UIDX, \"didx\": $DIDX, \"text\": \"제가 도와드릴 수 있어요!\"}")
echo "Comment Response: $COMMENT_RES"
CIDX=$(echo $COMMENT_RES | grep -oE '"cidx":[0-9]+' | cut -d: -f2)

# 대댓글 작성
curl -X POST "$BASE_URL/comment/writeReply" \
     -H "Content-Type: application/json" \
     -d "{\"uidx\": $UIDX, \"cidx\": $CIDX, \"text\": \"언제 시간이 괜찮으신가요?\"}"
echo -e "\n"

# 댓글 조회
curl -X POST "$BASE_URL/comment/detail" \
     -H "Content-Type: application/json" \
     -d "{\"didx\": $DIDX}"
echo -e "\n"

echo "--- 6. 포인트 지급 승인 (완료) ---"
curl -X POST "$BASE_URL/accept/approval" \
     -H "Content-Type: application/json" \
     -d "{\"aidx\": $AIDX}"
echo -e "\n"

echo "--- 7. 프로필 확인 (포인트 및 태그) ---"
curl -X POST "$BASE_URL/profile/point" -H "Content-Type: application/json" -d "{\"uidx\": $UIDX}"
echo -e "\n"
curl -X POST "$BASE_URL/profile/tag" -H "Content-Type: application/json" -d "{\"uidx\": $UIDX}"
echo -e "\n"
