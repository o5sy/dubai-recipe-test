/**
 * 공통 이벤트
 * SOLID 원칙: Single Responsibility - 여러 페이지에서 공통으로 사용되는 이벤트
 */

import { sendEvent } from '../core';
import type { BaseEventParams } from '../types';

/**
 * 홈으로 돌아가기 클릭
 */
export const trackHomeClick = (
  params?: BaseEventParams & { from_page?: string }
): void => {
  sendEvent('home_click', {
    event_category: 'navigation',
    event_label: 'return_home',
    from_page: params?.from_page || 'unknown',
  });
};

/**
 * 외부 링크 클릭 추적
 */
export const trackExternalLinkClick = (
  url: string,
  linkName?: string
): void => {
  sendEvent('external_link_click', {
    event_category: 'outbound',
    event_label: linkName || url,
    link_url: url,
  });
};

/**
 * 에러 발생 추적
 */
export const trackError = (errorName: string, errorDetails?: string): void => {
  sendEvent('error_occurred', {
    event_category: 'error',
    event_label: errorName,
    error_details: errorDetails,
  });
};