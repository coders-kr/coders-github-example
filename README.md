# Coders HTTP example

공개 GitHub Actions가 Dockerfile을 빌드하고 GHCR에 `sha-{commit}` 이미지와 빌드 증명을 게시합니다. GHCR 패키지는 공개로 설정합니다.

`coders.json` version 2는 같은 앱의 `/analyze` HTTP 경로를 엔드포인트로 선언합니다. Node.js 기본 모듈과 저장소의 일반 파일을 함께 사용합니다. `PORT`에서 요청을 처리하며, 프로세스 메모리는 같은 격리 범위에서 재사용될 수 있습니다.

```sh
docker build -t coders-http-example .
docker run --rm -e PORT=8080 -p 8080:8080 coders-http-example
curl -X POST localhost:8080/analyze -H 'Content-Type: application/json' -d '{"text":"hello coders"}'
```

[개발 가이드](https://docs.coders.kr/)
