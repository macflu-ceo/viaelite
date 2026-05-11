/**
 * VIA ELITE — 컨시어지 신청 폼 처리 Apps Script
 *
 * 설정 순서:
 *   1) 새 Google Sheet 생성 (예: "비아엘리떼 컨시어지 신청자")
 *   2) Sheet 메뉴 → 확장 프로그램 → Apps Script 클릭
 *   3) 기본 코드 모두 지우고 이 파일 내용 붙여넣기
 *   4) 아래 NOTIFY_EMAIL 변수에 알림 받을 이메일 입력 (선택)
 *   5) 저장 (Ctrl/Cmd + S) → 프로젝트 이름 지정
 *   6) 우측 상단 "배포" → "새 배포" 클릭
 *   7) 톱니바퀴 → "웹 앱" 선택
 *   8) 설정:
 *        - 다음 사용자 인증 정보로 실행: 나
 *        - 액세스 권한: 모든 사용자 (Anyone)
 *   9) "배포" → 권한 승인 절차 진행
 *   10) 발급된 "웹 앱 URL" 복사 → index.html의 APPS_SCRIPT_URL 변수에 붙여넣기
 */

// ============= 설정 =============
const SHEET_NAME = '신청자';
const NOTIFY_EMAIL = ''; // 알림 받을 이메일 (예: 'admin@viaelite.kr'). 비워두면 알림 안 보냄.
// ================================


function doPost(e) {
  try {
    // 폼 데이터 파싱 (JSON 문자열로 들어옴)
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // 시트가 없으면 자동 생성 + 헤더 작성
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        '신청 일시',
        '성함',
        '연락처',
        '거주 지역',
        '연령대',
        '직업 / 영업 경력',
        '관심 활동 방식',
        '메시지',
        '상담 상태'
      ]);
      sheet.setFrozenRows(1);

      // 헤더 스타일 (검정 배경, 골드 글자)
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setBackground('#0a0a0a');
      headerRange.setFontColor('#c9a961');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');

      // 컬럼 너비 자동 조정 시도
      sheet.setColumnWidth(1, 160); // 일시
      sheet.setColumnWidth(2, 100); // 성함
      sheet.setColumnWidth(3, 130); // 연락처
      sheet.setColumnWidth(4, 180); // 지역
      sheet.setColumnWidth(5, 80);  // 연령대
      sheet.setColumnWidth(6, 280); // 직업/경력
      sheet.setColumnWidth(7, 200); // 관심 방식
      sheet.setColumnWidth(8, 320); // 메시지
      sheet.setColumnWidth(9, 100); // 상태
    }

    // 데이터 추가
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.region || '',
      data.age || '',
      data.background || '',
      data.interest || '',
      data.message || '',
      '신규' // 상담 상태 기본값
    ]);

    // 이메일 알림 (NOTIFY_EMAIL이 설정된 경우만)
    if (NOTIFY_EMAIL) {
      const subject = '[VIA ELITE] 새 컨시어지 신청 — ' + (data.name || '익명');
      const body =
        '새로운 컨시어지 신청이 접수되었습니다.\n\n' +
        '────────────────────────\n' +
        '성함: ' + (data.name || '-') + '\n' +
        '연락처: ' + (data.phone || '-') + '\n' +
        '거주 지역: ' + (data.region || '-') + '\n' +
        '연령대: ' + (data.age || '-') + '\n' +
        '직업 / 경력: ' + (data.background || '-') + '\n' +
        '관심 활동 방식: ' + (data.interest || '-') + '\n' +
        '메시지: ' + (data.message || '-') + '\n' +
        '────────────────────────\n\n' +
        '시트에서 전체 신청자 확인:\n' + ss.getUrl();

      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // 에러 발생 시 로그에 남기고 에러 응답
    console.error('Form submission error:', err);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 시 (웹앱 URL을 직접 브라우저에서 열어볼 때) 응답
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'VIA ELITE Concierge Application Endpoint'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============= 테스트 함수 =============
// Apps Script 에디터에서 이 함수 직접 실행하여 시트 정상 작동 확인
function testInsert() {
  const fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: '테스트 신청자',
        phone: '010-0000-0000',
        region: '서울특별시 강남구',
        age: '30대',
        background: '테스트 — 보험 영업 5년차',
        interest: '수수료 판매 (국내 재고 활용)',
        message: '이것은 테스트 데이터입니다.'
      })
    }
  };
  const result = doPost(fakeEvent);
  console.log('Test result:', result.getContent());
}
