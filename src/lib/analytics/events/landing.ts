/**
 * 랜딩 페이지 관련 이벤트
 * SOLID 원칙: Single Responsibility - 랜딩 페이지 이벤트만 담당
 */

import { sendEvent } from '../core';
import type { LandingEventParams } from '../types';

/**
 * 테스트 시작 버튼 클릭
 * 퍼널: Awareness → Interest
 */
export const trackTestStart = (params?: LandingEventParams): void => {
  sendEvent('test_start', {
    event_category: 'engagement',
    event_label: 'landing_page',
    button_location: params?.button_location || 'hero',
  });
};

/**
 * 유형 둘러보기 클릭
 */
export const trackBrowseTypesClick = (): void => {
  sendEvent('browse_types_click', {
    event_category: 'navigation',
    event_label: 'landing_page',
    source: 'landing_header',
  });
};

/**
 * 개인정보 처리방침 클릭
 */
export const trackPrivacyPolicyClick = (): void => {
  sendEvent('privacy_policy_click', {
    event_category: 'navigation',
    event_label: 'landing_page',
  });
};