/**
 * 페이지뷰 추적 훅
 */

import { useEffect } from 'react';
import { sendPageView } from '../core';

export const useTrackPageView = (pagePath?: string, pageTitle?: string) => {
  useEffect(() => {
    if (pagePath) {
      sendPageView(pagePath, pageTitle);
    }
  }, [pagePath, pageTitle]);
};