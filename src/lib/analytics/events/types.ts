/**
 * 유형 둘러보기 페이지 관련 이벤트
 * SOLID 원칙: Single Responsibility - 유형 둘러보기 이벤트만 담당
 */

import { sendEvent } from '../core';
import type { TypesEventParams } from '../types';

/**
 * 유형 카드 클릭
 */
export const trackTypeCardClick = (
  params: TypesEventParams
): void => {
  sendEvent('type_card_click', {
    event_category: 'navigation',
    event_label: params.mbti_type || 'unknown',
    mbti_type: params.mbti_type,
    source_page: params.source_page || 'types_page',
  });
};

/**
 * 내 유형 찾기 버튼 클릭
 */
export const trackFindMyType = (
  params?: TypesEventParams
): void => {
  sendEvent('find_my_type', {
    event_category: 'engagement',
    event_label: 'start_test_from_types',
    source_page: params?.source_page || 'types_page',
  });
};

/**
 * 유형 페이지 진입
 */
export const trackTypesPageEnter = (): void => {
  sendEvent('types_page_enter', {
    event_category: 'page_flow',
    event_label: 'browsing_types',
  });
};