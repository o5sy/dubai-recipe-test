/**
 * Google Analytics 이벤트 시스템
 *
 * SOLID 원칙 적용:
 * - Single Responsibility: 각 이벤트 파일이 특정 페이지/기능만 담당
 * - Open/Closed: 새로운 이벤트 추가 시 기존 코드 수정 없이 확장 가능
 * - Liskov Substitution: 모든 이벤트 함수가 일관된 인터페이스 패턴
 * - Interface Segregation: 각 이벤트가 필요한 파라미터만 받음
 * - Dependency Inversion: gtag 직접 호출 대신 core 모듈을 통한 추상화
 *
 * 퍼널 단계:
 * 1. Awareness: 랜딩 페이지 진입
 * 2. Interest: 테스트 시작 버튼 클릭
 * 3. Engagement: 질문 답변 진행
 * 4. Completion: 결과 페이지 도달
 * 5. Share: 공유 버튼 클릭
 * 6. Viral: 공유 완료
 *
 * 사용 예시 (커스텀 훅 사용 권장):
 * ```typescript
 * import { useTrackLanding } from '@/lib/analytics';
 *
 * function LandingPage() {
 *   const { trackTestStart } = useTrackLanding();
 *
 *   return (
 *     <button onClick={() => trackTestStart()}>
 *       테스트 시작하기
 *     </button>
 *   );
 * }
 * ```
 *
 * 직접 이벤트 함수 사용:
 * ```typescript
 * import { analytics } from '@/lib/analytics';
 *
 * analytics.trackTestStart();
 * ```
 */

// Core
export { sendEvent, sendPageView, setUserProperties } from './core';

// Hooks (권장 사용 방법)
export * from './hooks';

// Event modules (직접 사용 가능)
export * from './events/landing';
export * from './events/question';
export * from './events/result';
export * from './events/types';
export * from './events/shared';

// Types
export type * from './types';

// Default export with all tracking functions
import * as landingEvents from './events/landing';
import * as questionEvents from './events/question';
import * as resultEvents from './events/result';
import * as typesEvents from './events/types';
import * as sharedEvents from './events/shared';

export const analytics = {
  // Landing
  ...landingEvents,

  // Question
  ...questionEvents,

  // Result
  ...resultEvents,

  // Types
  ...typesEvents,

  // Shared
  ...sharedEvents,
};

export default analytics;