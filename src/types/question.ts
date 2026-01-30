/**
 * MBTI 4개 축
 */
export type MBTIAxis = 'E/I' | 'S/N' | 'T/F' | 'J/P';

/**
 * MBTI 각 축의 값
 */
export type MBTIValue = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

/**
 * 질문의 답변 선택지
 */
export interface Answer {
  /** 선택지 텍스트 */
  text: string;
  /** 이 선택지가 기여하는 MBTI 값 */
  value: MBTIValue;
}

/**
 * 질문 데이터
 */
export interface Question {
  /** 질문 고유 ID */
  id: string;
  /** 상황 설명 */
  situation: string;
  /** 질문 내용 */
  question: string;
  /** 측정하는 MBTI 축 */
  axis: MBTIAxis;
  /** 답변 선택지 배열 (2지선다 또는 4지선다) */
  options: Answer[];
}
