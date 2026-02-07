'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { analytics } from '@/lib/analytics';
import type { LandingEventParams } from '@/lib/analytics';

type TrackEvent =
  | 'test_start'
  | 'browse_types'
  | 'privacy_policy'
  | 'find_my_type'
  | 'home_click'
  | 'type_card_click'
  | 'retake_test'
  | 'view_all_types';

interface TrackableLinkProps extends Omit<ComponentProps<typeof Link>, 'onClick'> {
  trackEvent?: TrackEvent;
  trackParams?: Record<string, string | number>;
}

/**
 * 클릭 추적이 가능한 Link 컴포넌트
 * 서버 컴포넌트에서 사용 가능
 *
 * @example
 * <TrackableLink href="/question" trackEvent="test_start" trackParams={{ button_location: 'hero' }}>
 *   테스트 시작하기
 * </TrackableLink>
 */
export function TrackableLink({
  trackEvent,
  trackParams,
  ...props
}: TrackableLinkProps) {
  const handleClick = () => {
    if (!trackEvent) return;

    switch (trackEvent) {
      case 'test_start':
        analytics.trackTestStart(trackParams as LandingEventParams);
        break;
      case 'browse_types':
        analytics.trackBrowseTypesClick();
        break;
      case 'privacy_policy':
        analytics.trackPrivacyPolicyClick();
        break;
      case 'find_my_type':
        analytics.trackFindMyType(trackParams || {});
        break;
      case 'home_click':
        analytics.trackHomeClick(trackParams || {});
        break;
      case 'type_card_click':
        analytics.trackTypeCardClick(trackParams || {});
        break;
      case 'retake_test':
        analytics.trackRetakeTest({
          from_page: trackParams?.from_page as string,
          mbti_type: trackParams?.mbti_type as string,
        });
        break;
      case 'view_all_types':
        analytics.trackViewAllTypes({
          from_page: trackParams?.from_page as string,
          mbti_type: trackParams?.mbti_type as string,
        });
        break;
    }
  };

  return <Link {...props} onClick={handleClick} />;
}