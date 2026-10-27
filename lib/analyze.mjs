// 일반 모듈을 그대로 import할 수 있습니다.
export function analyze(text) {
  return { characters: [...text].length, words: text.trim() ? text.trim().split(/\s+/u).length : 0 };
}
