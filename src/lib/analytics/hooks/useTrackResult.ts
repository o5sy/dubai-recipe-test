/**
 * 결과 페이지 추적 훅
 */

import { useEffect, useCallback } from 'react';
import {
  trackTestComplete,
  trackShareClick,
  trackShareSuccess,
  trackLinkCopy,
  trackImageSave,
  trackImageSaveSuccess,
  trackCompatibilityClick,
  trackRetakeTest,
  trackViewAllTypes,
} from '../events/result';
import type { ResultEventParams, ShareEventParams } from '../types';

interface UseTrackResultOptions {
  mbtiType: string;
  resultName: string;
  autoTrackComplete?: boolean;
}

export const useTrackResult = (options: UseTrackResultOptions) => {
  const { mbtiType, resultName, autoTrackComplete = true } = options;

  // 테스트 완료 자동 추적
  useEffect(() => {
    if (autoTrackComplete) {
      trackTestComplete({
        mbti_type: mbtiType,
        result_name: resultName,
      });
    }
  }, [mbtiType, resultName, autoTrackComplete]);

  // 공유 클릭 추적
  const handleShareClick = useCallback(
    (platform: ShareEventParams['share_platform']) => {
      trackShareClick({
        mbti_type: mbtiType,
        share_platform: platform,
      });
    },
    [mbtiType]
  );

  // 공유 성공 추적
  const handleShareSuccess = useCallback(
    (platform: ShareEventParams['share_platform']) => {
      trackShareSuccess({
        mbti_type: mbtiType,
        share_platform: platform,
      });
    },
    [mbtiType]
  );

  // 링크 복사 추적
  const handleLinkCopy = useCallback(() => {
    trackLinkCopy(mbtiType);
  }, [mbtiType]);

  // 이미지 저장 추적
  const handleImageSave = useCallback(() => {
    trackImageSave(mbtiType);
  }, [mbtiType]);

  // 이미지 저장 성공 추적
  const handleImageSaveSuccess = useCallback(() => {
    trackImageSaveSuccess(mbtiType);
  }, [mbtiType]);

  // 궁합 클릭 추적
  const handleCompatibilityClick = useCallback(
    (targetType: string) => {
      trackCompatibilityClick(mbtiType, targetType);
    },
    [mbtiType]
  );

  // 재테스트 추적
  const handleRetakeTest = useCallback(() => {
    trackRetakeTest({
      from_page: 'result_page',
      mbti_type: mbtiType,
    });
  }, [mbtiType]);

  // 모든 유형 보기 추적
  const handleViewAllTypes = useCallback(() => {
    trackViewAllTypes({
      from_page: 'result_page',
      mbti_type: mbtiType,
    });
  }, [mbtiType]);

  return {
    trackShareClick: handleShareClick,
    trackShareSuccess: handleShareSuccess,
    trackLinkCopy: handleLinkCopy,
    trackImageSave: handleImageSave,
    trackImageSaveSuccess: handleImageSaveSuccess,
    trackCompatibilityClick: handleCompatibilityClick,
    trackRetakeTest: handleRetakeTest,
    trackViewAllTypes: handleViewAllTypes,
  };
};