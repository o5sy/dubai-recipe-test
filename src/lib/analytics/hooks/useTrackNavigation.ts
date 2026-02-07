/**
 * 공통 네비게이션 추적 훅
 */

import { useCallback } from 'react';
import { trackHomeClick } from '../events/shared';

export const useTrackNavigation = () => {
  const handleHomeClick = useCallback((fromPage?: string) => {
    trackHomeClick({ from_page: fromPage || 'unknown' });
  }, []);

  return {
    trackHomeClick: handleHomeClick,
  };
};