/**
 * Google Analytics 핵심 기능
 * SOLID 원칙: Dependency Inversion - gtag 직접 호출을 추상화
 */

import type { BaseEventParams } from './types';

/**
 * gtag 함수가 로드되었는지 확인
 */
const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

/**
 * GA4 이벤트 전송 핵심 함수
 * @param eventName - 이벤트 이름
 * @param params - 이벤트 파라미터
 */
export const sendEvent = (
  eventName: string,
  params?: BaseEventParams
): void => {
  if (!isGtagAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', eventName, params);
    }
    return;
  }

  try {
    window.gtag('event', eventName, params);
  } catch (error) {
    console.error('[Analytics] Event send failed:', error);
  }
};

/**
 * 페이지뷰 전송 (필요시 커스텀 페이지뷰)
 * @param pagePath - 페이지 경로
 * @param pageTitle - 페이지 제목
 */
export const sendPageView = (pagePath: string, pageTitle?: string): void => {
  if (!isGtagAvailable()) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] PageView:', pagePath, pageTitle);
    }
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

/**
 * 사용자 속성 설정
 * @param properties - 사용자 속성
 */
export const setUserProperties = (properties: BaseEventParams): void => {
  if (!isGtagAvailable()) {
    return;
  }

  window.gtag('set', 'user_properties', properties);
};

// gtag 타입 정의 확장
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: BaseEventParams
    ) => void;
  }
}
