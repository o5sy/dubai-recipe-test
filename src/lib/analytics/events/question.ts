/**
 * 질문 페이지 관련 이벤트
 * SOLID 원칙: Single Responsibility - 질문 페이지 이벤트만 담당
 */

import { sendEvent } from '../core';
import type { QuestionEventParams, QuestionNavigationParams } from '../types';

/**
 * 질문 답변 선택
 * 퍼널: Interest → Engagement
 */
export const trackQuestionAnswer = (
  params: QuestionEventParams
): void => {
  const { question_number, total_questions, answer_value, progress_percentage } = params;

  sendEvent('question_answer', {
    event_category: 'engagement',
    event_label: `question_${question_number}`,
    question_number,
    total_questions,
    answer_value,
    progress_percentage,
  });

  // 중요 진행 마일스톤 추적 (25%, 50%, 75%)
  if (progress_percentage === 25) {
    sendEvent('test_progress_milestone', {
      event_category: 'milestone',
      milestone: '25_percent',
      question_number,
    });
  } else if (progress_percentage === 50) {
    sendEvent('test_progress_milestone', {
      event_category: 'milestone',
      milestone: '50_percent',
      question_number,
    });
  } else if (progress_percentage === 75) {
    sendEvent('test_progress_milestone', {
      event_category: 'milestone',
      milestone: '75_percent',
      question_number,
    });
  }
};

/**
 * 질문 네비게이션 (이전/다음 버튼)
 */
export const trackQuestionNavigation = (
  params: QuestionNavigationParams
): void => {
  sendEvent('question_navigation', {
    event_category: 'navigation',
    event_label: params.direction,
    direction: params.direction,
    from_question: params.from_question,
    to_question: params.to_question,
  });
};

/**
 * 질문 페이지 진입
 * 퍼널: 테스트 시작 후 첫 질문 진입
 */
export const trackQuestionPageEnter = (): void => {
  sendEvent('question_page_enter', {
    event_category: 'page_flow',
    event_label: 'entered_test',
  });
};

/**
 * 질문 페이지 이탈 (중도 포기)
 * 이탈율 분석에 중요
 */
export const trackQuestionPageExit = (
  params: Pick<QuestionEventParams, 'question_number' | 'progress_percentage'>
): void => {
  sendEvent('question_page_exit', {
    event_category: 'exit',
    event_label: 'abandoned_test',
    question_number: params.question_number,
    progress_percentage: params.progress_percentage,
  });
};