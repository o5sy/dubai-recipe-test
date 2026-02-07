/**
 * 유형 둘러보기 페이지 추적 훅
 */

import { useEffect, useCallback } from 'react';
import {
  trackTypesPageEnter,
  trackTypeCardClick,
  trackFindMyType,
} from '../events/types';

export const useTrackTypes = () => {
  // 페이지 진입 추적
  useEffect(() => {
    trackTypesPageEnter();
  }, []);

  // 유형 카드 클릭 추적
  const handleTypeClick = useCallback((mbtiType: string) => {
    trackTypeCardClick({
      mbti_type: mbtiType,
      source_page: 'types_page',
    });
  }, []);

  // 내 유형 찾기 클릭 추적
  const handleFindMyType = useCallback(() => {
    trackFindMyType({ source_page: 'types_page' });
  }, []);

  return {
    trackTypeClick: handleTypeClick,
    trackFindMyType: handleFindMyType,
  };
};