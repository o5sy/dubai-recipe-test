/**
 * Analytics Hooks
 *
 * React 커스텀 훅을 통한 GA 이벤트 추적
 *
 * SOLID 원칙 적용:
 * - Single Responsibility: 각 훅이 특정 페이지/기능만 담당
 * - Open/Closed: 새로운 훅 추가 시 기존 코드 수정 없이 확장
 * - Interface Segregation: 각 훅이 필요한 기능만 제공
 *
 * 사용 예시:
 * ```typescript
 * // 랜딩 페이지
 * const { trackTestStart } = useTrackLanding();
 * <button onClick={() => trackTestStart()}>시작하기</button>
 *
 * // 질문 페이지
 * const { trackAnswer } = useTrackQuestion({
 *   currentQuestion: 1,
 *   totalQuestions: 12
 * });
 *
 * // 결과 페이지
 * const { trackShareClick } = useTrackResult({
 *   mbtiType: 'ENFP',
 *   resultName: '활발한 두쫀쿠'
 * });
 * ```
 */

export { useTrackPageView } from './useTrackPageView';
export { useTrackLanding } from './useTrackLanding';
export { useTrackQuestion } from './useTrackQuestion';
export { useTrackResult } from './useTrackResult';
export { useTrackTypes } from './useTrackTypes';
export { useTrackNavigation } from './useTrackNavigation';