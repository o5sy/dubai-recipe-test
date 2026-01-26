/**
 * MBTI 유형 문자열
 * @example "ENFP", "ISTJ"
 */
export type MBTIType = string;

/**
 * MBTI 각 축별 점수
 */
export interface MBTIScores {
  'E/I': { E: number; I: number };
  'S/N': { S: number; N: number };
  'T/F': { T: number; F: number };
  'J/P': { J: number; P: number };
}

/**
 * MBTI 유형별 두쫀쿠 결과
 */
export interface TestResult {
  type: MBTIType;
  name: string; // 두쫀쿠 유형명
  description: {
    coreTexture: string[]; // 핵심 질감 설명 (3개 문장)
    hiddenFilling: string[]; // 숨겨진 필링 설명 (3개 문장)
  };
  compatibility: {
    good: MBTIType[]; // 잘 맞는 유형
    bad: MBTIType[]; // 안 맞는 유형
  };
}
