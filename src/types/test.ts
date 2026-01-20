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
