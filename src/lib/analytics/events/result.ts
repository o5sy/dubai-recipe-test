/**
 * 결과 페이지 관련 이벤트
 * SOLID 원칙: Single Responsibility - 결과 페이지 이벤트만 담당
 */

import { sendEvent } from '../core';
import type { ResultEventParams, ShareEventParams, ReEngagementParams } from '../types';

/**
 * 테스트 완료 (결과 페이지 도달)
 * 퍼널: Engagement → Completion (핵심 전환 이벤트)
 */
export const trackTestComplete = (
  params: ResultEventParams
): void => {
  sendEvent('test_complete', {
    event_category: 'conversion',
    event_label: params.mbti_type,
    mbti_type: params.mbti_type,
    result_name: params.result_name,
  });

  // 전환 이벤트로도 별도 기록
  sendEvent('conversion', {
    conversion_type: 'test_completion',
    mbti_type: params.mbti_type,
  });
};

/**
 * 결과 공유 버튼 클릭
 * 퍼널: Completion → Share (바이럴 시작점)
 */
export const trackShareClick = (
  params: ShareEventParams
): void => {
  sendEvent('share_click', {
    event_category: 'social',
    event_label: params.share_platform,
    mbti_type: params.mbti_type,
    share_platform: params.share_platform,
    share_method: params.share_method || 'button',
  });
};

/**
 * 공유 성공 (실제 공유 완료)
 * 퍼널: Share → Viral (최종 바이럴 완료)
 */
export const trackShareSuccess = (
  params: ShareEventParams
): void => {
  sendEvent('share_success', {
    event_category: 'social',
    event_label: `${params.share_platform}_success`,
    mbti_type: params.mbti_type,
    share_platform: params.share_platform,
  });

  // 전환 이벤트로도 기록
  sendEvent('conversion', {
    conversion_type: 'share_completed',
    share_platform: params.share_platform,
    mbti_type: params.mbti_type,
  });
};

/**
 * 링크 복사
 */
export const trackLinkCopy = (mbtiType: string): void => {
  trackShareClick({
    mbti_type: mbtiType,
    share_platform: 'link',
  });

  // 링크 복사는 즉시 성공으로 간주
  trackShareSuccess({
    mbti_type: mbtiType,
    share_platform: 'link',
  });
};

/**
 * 이미지 저장
 */
export const trackImageSave = (mbtiType: string): void => {
  trackShareClick({
    mbti_type: mbtiType,
    share_platform: 'image',
  });
};

/**
 * 이미지 저장 성공
 */
export const trackImageSaveSuccess = (mbtiType: string): void => {
  trackShareSuccess({
    mbti_type: mbtiType,
    share_platform: 'image',
  });
};

/**
 * 궁합 섹션 유형 클릭
 */
export const trackCompatibilityClick = (
  currentType: string,
  targetType: string
): void => {
  sendEvent('compatibility_click', {
    event_category: 'engagement',
    event_label: 'compatibility_navigation',
    current_type: currentType,
    target_type: targetType,
  });
};

/**
 * 테스트 다시하기 클릭
 * 재참여 측정
 */
export const trackRetakeTest = (
  params: ReEngagementParams
): void => {
  sendEvent('retake_test', {
    event_category: 're_engagement',
    event_label: 'retry_from_result',
    from_page: params.from_page,
    previous_mbti_type: params.mbti_type,
  });
};

/**
 * 모든 유형 보기 클릭
 */
export const trackViewAllTypes = (
  params: ReEngagementParams
): void => {
  sendEvent('view_all_types', {
    event_category: 'navigation',
    event_label: 'browse_from_result',
    from_page: params.from_page,
    current_mbti_type: params.mbti_type,
  });
};