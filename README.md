# Coders GitHub Example

공개 GitHub 저장소를 커밋 주소로 처음 접속하면 Coders가 준비하고 실행하는 예제입니다.

- `coders.json`: 프로젝트 이름, 공개 폴더, 엔드포인트와 요청 예산
- `api/analyze.py`: 입력 텍스트의 문자 수와 단어 수를 반환하는 Python ASGI 엔드포인트
- `public/index.html`: all 모드 프론트
- `public/.coders-ui.json`: sandbox 모드 선언형 프론트

루트에 `coders.json`이 있어야 합니다. 별도 패키지 설치나 빌드는 필요하지 않습니다.
API 키나 비밀값은 포함하지 않습니다.

## 접속

주소의 `COMMIT`에 이 저장소의 전체 커밋 해시를 넣습니다.

```text
https://api.coders.kr/coders-kr/coders-github-example/COMMIT
```

Coders 로그인 후 처음 준비하는 버전이면 준비 화면을 거쳐 프로젝트 사용 동의 화면으로 이동합니다.
자동 충전 한도와 실행 모드를 허용한 다음 텍스트 분석을 사용할 수 있습니다.
준비비와 실행비를 지불할 Coders 기본 계좌 잔액이 필요합니다.

API는 다음 주소에 POST 요청을 보냅니다. 준비 중에는 202가 반환되며, 준비 완료 후 같은
본문과 Idempotency-Key로 다시 호출합니다.

```text
https://api.coders.kr/coders-kr/coders-github-example/COMMIT/analyze
```

기존 Coders-Grant, Coders-Budget, Idempotency-Key 헤더를 사용합니다.

## 첫 접속 동작

같은 커밋은 한 번 준비한 결과를 공유합니다. 이미 준비된 주소는 사용 동의 화면으로 바로
이동합니다. 준비 화면부터 확인하려면 아직 호출하지 않은 새 커밋 주소를 사용하세요.
커밋이 달라도 실행 코드는 같을 수 있으며 각 커밋은 별도의 고정 주소를 갖습니다.
