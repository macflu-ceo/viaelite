# VIA ELITE · 공식 컨시어지 페이지

비아엘리떼 공식 컨시어지·오프라인 매장을 공개하는 페이지.
공식 컨시어지가 아닌 경우 거래 주의 안내 + 컨시어지 신청·문의 접수 모달.

## 기능

- 공식 컨시어지 리스트 (PC 2열, 모바일 1열)
- 공식 오프라인 매장 리스트
- 지역별 필터 (시 단위)
- 컨시어지 상세 모달 (연락처 링크·추천상품 멀티링크)
- 컨시어지 신청 폼 (정보 입력 → 시트 저장)
- 문의·건의 폼 (시트 저장)
- Google Sheet 백엔드 자동 연동 (시트 데이터 변경 시 즉시 반영)

## 폴더 구조

```
viaelite-concierge-page/
├── index.html          공개 페이지 (단일 파일)
├── images/
│   └── logo.png        VIA ELITE 로고 (흰색)
├── vercel.json         Vercel 배포 설정
├── README.md
└── .gitignore
```

## 배포

### 1. GitHub 업로드
- Private 저장소 생성: `viaelite-concierge-page`
- 모든 파일·폴더 통째로 업로드

### 2. Vercel 연결
- vercel.com → New Project → GitHub 저장소 import → Deploy

### 3. 도메인 연결 (concierge.viaelite.kr 권장)
- Vercel → Settings → Domains → `concierge.viaelite.kr` 추가
- 가비아 DNS:
  - Type: CNAME
  - 호스트: `concierge`
  - 값: `cname.vercel-dns.com.`
- 5분~1시간 대기 후 ✓ Valid Configuration 확인

### URL 옵션
- `concierge.viaelite.kr` (권장, 다른 서비스랑 일관성)
- `viaelite.kr/concierge` (메인 사이트 통합 시)

## 백엔드 연결

- Google Apps Script URL이 `index.html` 상단 `API_URL` 상수에 박혀있음
- 페이지 로드 시 자동으로 `?action=list_concierges`, `?action=list_stores` 호출
- 데이터 없거나 오류 시 폴백 데모 데이터 표시

## 관련 프로젝트

- [viaelite-concierge-admin](../viaelite-concierge-admin) — 본사 관리 어드민
- 백엔드 — Google Sheets + Apps Script (공통)
