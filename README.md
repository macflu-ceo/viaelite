# VIA ELITE — 럭셔리 컨시어지 모집 랜딩페이지

대한민국 명품 유통의 새로운 카테고리, **비아엘리떼**의 럭셔리 컨시어지 모집 랜딩페이지입니다.

운영: 주식회사 제이프리모인터내셔널

---

## 파일 구조

```
.
├── index.html        # 랜딩페이지 메인
└── images/           # 이미지 자산
    ├── logo-main.png
    ├── logo-monogram.png
    ├── logo-wordmark.png
    ├── hero-bg.png
    ├── wwd-banner.png
    ├── branch-cheongdam.jpg
    ├── cx-packaging.jpg
    ├── cx-showroom.jpg
    ├── cx-certificate.jpg
    ├── pride-bg.jpg
    ├── mcn-bg.png
    └── tools-multilink.png
```

## GitHub Pages 배포

1. 이 저장소를 GitHub에 업로드
2. Settings → Pages → Source: `main` branch / root → Save
3. 약 5분 후 `https://[username].github.io/[repo-name]/`로 접속 가능

## 커스텀 도메인 연결 (선택)

- GitHub: Settings → Pages → Custom domain에 도메인 입력
- 도메인 관리 페이지: CNAME 레코드 추가 (`[username].github.io` 으로)

---

## ⚠️ 운영 전 반드시 처리해야 할 것

### 1. 신청 폼 처리 연결

현재 신청서 폼은 콘솔에만 데이터가 찍히고 실제로 저장되지 않습니다.
`index.html` 파일 하단의 `submitForm()` 함수 안 TODO 주석을 보고 다음 중 하나로 연결해야 합니다:

- **Formspree.io** (가장 간단) — 가입 후 endpoint를 fetch URL에 입력
- **Google Form 임베드** — 폼 부분을 iframe으로 교체
- **자체 서버** — POST endpoint 연결

### 2. 연락처 정보 확인

- 푸터 회사 정보 (주소, 사업자등록번호 등)
- 카카오 채널 / 이메일 주소

---

## 기술 스택

- 단일 HTML 파일 (외부 의존성 없음)
- Pretendard 폰트 (CDN 로드)
- 반응형 (데스크톱/태블릿/모바일 대응)
- 다크 럭셔리 톤 디자인

## 라이선스

© VIA ELITE · J PRIMO INTERNATIONAL. ALL RIGHTS RESERVED.
