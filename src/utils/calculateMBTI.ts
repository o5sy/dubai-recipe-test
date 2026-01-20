import type { MBTIValue } from '@/types/question';
import type { MBTIType, MBTIScores } from '@/types/test';
import { questions } from '@/data/questions';

/**
 * 사용자 답변을 기반으로 MBTI 유형을 계산합니다.
 *
 * @param answers - 질문 ID를 키로, 선택한 MBTI 값을 값으로 하는 객체
 * @returns 계산된 MBTI 유형 (예: "ENFP", "ISTJ")
 *
 * @example
 * ```ts
 * const answers = {
 *   q1: 'E', q2: 'E', q3: 'I',
 *   q4: 'S', q5: 'N', q6: 'S',
 *   // ...
 * };
 * const result = calculateMBTI(answers); // "ESTJ"
 * ```
 */
export function calculateMBTI(answers: Record<string, MBTIValue>): MBTIType {
  // 각 축별 점수 초기화
  const scores: MBTIScores = {
    'E/I': { E: 0, I: 0 },
    'S/N': { S: 0, N: 0 },
    'T/F': { T: 0, F: 0 },
    'J/P': { J: 0, P: 0 },
  };

  // 각 질문의 답변을 해당 축의 점수로 집계
  questions.forEach((question) => {
    const answer = answers[question.id];
    if (answer) {
      const axis = question.axis;

      if (axis === 'E/I') {
        scores['E/I'][answer as 'E' | 'I']++;
      } else if (axis === 'S/N') {
        scores['S/N'][answer as 'S' | 'N']++;
      } else if (axis === 'T/F') {
        scores['T/F'][answer as 'T' | 'F']++;
      } else if (axis === 'J/P') {
        scores['J/P'][answer as 'J' | 'P']++;
      }
    }
  });

  // 각 축에서 우세한 값을 결정하는 헬퍼 함수
  const getPreference = (
    scoreA: number,
    scoreB: number,
    typeA: string,
    typeB: string
  ): string => {
    if (scoreA > scoreB) return typeA;
    if (scoreB > scoreA) return typeB;
    // 동점일 경우 알파벳 순서상 앞선 값 반환
    return typeA;
  };

  // 각 축별로 우세한 값을 결정하여 MBTI 유형 생성
  const result = [
    getPreference(scores['E/I'].E, scores['E/I'].I, 'E', 'I'),
    getPreference(scores['S/N'].S, scores['S/N'].N, 'S', 'N'),
    getPreference(scores['T/F'].T, scores['T/F'].F, 'T', 'F'),
    getPreference(scores['J/P'].J, scores['J/P'].P, 'J', 'P'),
  ].join('');

  return result;
}
