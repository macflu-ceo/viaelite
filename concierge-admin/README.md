# VIA ELITE · 컨시어지 어드민

본사 전용 어드민 콘솔.
공식 컨시어지·오프라인 매장 등록/수정/삭제, 신청·문의 응대.

## 기능

- **관리** — 컨시어지·오프라인 매장 CRUD
- **수신함** — 컨시어지 신청·문의 조회 + 상태 변경
- 이미지 자동 Google Drive 업로드 → 시트에 URL 저장
- 검색·필터 (지역·직책·상태별)

## 폴더 구조

```
viaelite-concierge-admin/
├── index.html
├── images/
│   └── logo.png
├── vercel.json
├── README.md
└── .gitignore
```

## 로그인

- ID: `jprimo`
- PW: `jprimo0603!!`

본사·대표만 접근. Private 저장소로 유지하고 접속 IP 제한 권장.

## 배포

### 1. GitHub 업로드
- Private 저장소: `viaelite-concierge-admin`
- 모든 파일 업로드

### 2. Vercel 연결
- vercel.com → New Project → GitHub 저장소 import → Deploy

### 3. 도메인 연결 (concierge-admin.viaelite.kr 권장)
- Vercel → Settings → Domains → `concierge-admin.viaelite.kr` 추가
- 가비아 DNS:
  - Type: CNAME
  - 호스트: `concierge-admin`
  - 값: `cname.vercel-dns.com.`

## 백엔드 연결

- Google Apps Script URL이 `index.html` 상단 `API_URL` 상수에 박혀있음
- 로그인 시 백엔드 인증 + 시트 4탭 (컨시어지·매장·신청·문의) 자동 로드
- 이미지 업로드 → base64 변환 → Apps Script → Drive → URL 시트 저장

## 시트 구조

`비아엘리떼 공식컨시어지 DB` 시트 (4탭):
- `컨시어지` — 등재된 공식 컨시어지
- `매장` — 공식 오프라인 매장
- `컨시어지신청` — 공개 페이지에서 접수된 지원자
- `문의건의` — 공개 페이지에서 접수된 문의

## 관련 프로젝트

- [viaelite-concierge-page](../viaelite-concierge-page) — 공개 페이지
- 백엔드 — Google Sheets + Apps Script (공통)
