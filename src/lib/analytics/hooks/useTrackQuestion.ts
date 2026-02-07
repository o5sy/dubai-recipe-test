/**
 * 질문 페이지 추적 훅
 */

import { useEffect, useCallback, useRef } from 'react';
import {
  trackQuestionPageEnter,
  trackQuestionPageExit,
  trackQuestionAnswer,
  trackQuestionNavigation,
} from '../events/question';
import type { QuestionEventParams, QuestionNavigationParams } from '../types';

interface UseTrackQuestionOptions {
  currentQuestion: number;
  totalQuestions: number;
  enabled?: boolean;
}

export const useTrackQuestion = (options: UseTrackQuestionOptions) => {
  const { currentQuestion, totalQuestions, enabled = true } = options;
  const hasTrackedEnter = useRef(false);

  // 페이지 진입 및 이탈 추적
  useEffect(() => {
    if (!enabled) return;

    // 진입 추적 (한 번만)
    if (!hasTrackedEnter.current) {
      trackQuestionPageEnter();
      hasTrackedEnter.current = true;
    }

    // 이탈 추적
    return () => {
      const progressPercentage = Math.round(
        (currentQuestion / totalQuestions) * 100
      );
      trackQuestionPageExit({
        question_number: currentQuestion,
        progress_percentage: progressPercentage,
      });
    };
  }, [enabled, currentQuestion, totalQuestions]);

  // 답변 선택 추적
  const handleAnswer = useCallback(
    (params: Omit<QuestionEventParams, 'progress_percentage'>) => {
      const progressPercentage = Math.round(
        (params.question_number / params.total_questions) * 100
      );
      trackQuestionAnswer({
        ...params,
        progress_percentage: progressPercentage,
      });
    },
    []
  );

  // 네비게이션 추적
  const handleNavigation = useCallback((params: QuestionNavigationParams) => {
    trackQuestionNavigation(params);
  }, []);

  return {
    trackAnswer: handleAnswer,
    trackNavigation: handleNavigation,
  };
};