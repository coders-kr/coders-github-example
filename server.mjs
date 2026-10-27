import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { analyze } from './lib/analyze.mjs';

// 여러 요청에 걸쳐 유지될 수 있지만, 종료 시 사라지는 메모리 상태입니다.
const instance = randomUUID();
let calls = 0;
http.createServer(async (request, response) => {
  try {
    let body = '';
    for await (const chunk of request) {
      body += chunk;
      if (Buffer.byteLength(body) > 1048576) throw new Error('body too large');
    }
    if (request.method !== 'POST' || request.url !== '/analyze') {
      response.writeHead(404); response.end(); return;
    }
    const { text = '' } = JSON.parse(body || '{}');
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ ...analyze(text), instance, calls: ++calls }));
  } catch {
    response.writeHead(400); response.end('{"error":"invalid_request"}');
  }
}).listen(Number(process.env.PORT || 8080), '0.0.0.0');
