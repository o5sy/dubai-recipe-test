/**
 * 랜딩 페이지 추적 훅
 */

import { useCallback } from 'react';
import {
  trackTestStart,
  trackBrowseTypesClick,
  trackPrivacyPolicyClick,
} from '../events/landing';
import type { LandingEventParams } from '../types';

export const useTrackLanding = () => {
  const handleTestStart = useCallback((params?: LandingEventParams) => {
    trackTestStart(params);
  }, []);

  const handleBrowseTypes = useCallback(() => {
    trackBrowseTypesClick();
  }, []);

  const handlePrivacyClick = useCallback(() => {
    trackPrivacyPolicyClick();
  }, []);

  return {
    trackTestStart: handleTestStart,
    trackBrowseTypes: handleBrowseTypes,
    trackPrivacyClick: handlePrivacyClick,
  };
};