"""추가 설치 없이 플랫폼의 Python ASGI 환경에서 실행하는 엔드포인트."""

import json


async def app(scope, receive, send):
    # ASGI 서버가 보내는 시작·종료 이벤트를 처리합니다.
    if scope["type"] == "lifespan":
        while True:
            event = await receive()
            if event["type"] == "lifespan.startup":
                await send({"type": "lifespan.startup.complete"})
            elif event["type"] == "lifespan.shutdown":
                await send({"type": "lifespan.shutdown.complete"})
                return
    # 저장소를 가져올 때는 이 코드를 실행하지 않고, 실제 호출 시 격리해서 실행합니다.
    body = b""
    while True:
        event = await receive()
        body += event.get("body", b"")
        if not event.get("more_body"):
            break
    text = json.loads(body or b"{}").get("text", "")
    result = json.dumps({"characters": len(text), "words": len(text.split())}).encode()
    await send(
        {
            "type": "http.response.start",
            "status": 200,
            "headers": [(b"content-type", b"application/json")],
        }
    )
    await send({"type": "http.response.body", "body": result})
