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
  description: string; // 성격 설명
  compatibility: {
    good: MBTIType[]; // 잘 맞는 유형
    bad: MBTIType[]; // 안 맞는 유형
  };
}
