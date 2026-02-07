/**
 * Google Analytics 이벤트 타입 정의
 */

/**
 * GA4 이벤트 파라미터 기본 타입
 */
export interface BaseEventParams {
  [key: string]: string | number | boolean | undefined;
}

/**
 * 랜딩 페이지 이벤트 파라미터
 */
export interface LandingEventParams extends BaseEventParams {
  button_location?: 'hero' | 'header';
}

/**
 * 질문 페이지 이벤트 파라미터
 */
export interface QuestionEventParams extends BaseEventParams {
  question_number: number;
  total_questions: number;
  answer_value?: string;
  progress_percentage: number;
}

export interface QuestionNavigationParams extends BaseEventParams {
  direction: 'previous' | 'next';
  from_question: number;
  to_question: number;
}

/**
 * 결과 페이지 이벤트 파라미터
 */
export interface ResultEventParams extends BaseEventParams {
  mbti_type: string;
  result_name: string;
}

export interface ShareEventParams extends BaseEventParams {
  mbti_type: string;
  share_platform: 'kakao' | 'facebook' | 'twitter' | 'instagram' | 'link' | 'image';
  share_method?: 'button' | 'general';
}

/**
 * 유형 둘러보기 이벤트 파라미터
 */
export interface TypesEventParams extends BaseEventParams {
  mbti_type?: string;
  source_page?: string;
}

/**
 * 재참여 이벤트 파라미터
 */
export interface ReEngagementParams extends BaseEventParams {
  from_page: string;
  mbti_type?: string;
}
