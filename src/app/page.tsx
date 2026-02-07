import { TrackableLink } from '@/components/analytics';

export default function Home() {
  return (
    <div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden px-4">
      <TrackableLink
        href="/types"
        trackEvent="browse_types"
        className="absolute top-4 right-4 text-xs text-(--color-text-muted) transition-colors hover:text-(--color-text-secondary)"
      >
        유형 둘러보기 →
      </TrackableLink>
      <main className="flex w-full max-w-md flex-col items-center text-center">
        {/* 팔라펠 이모지 아이콘 */}
        <div className="animate-bounce-slow mb-8 text-7xl">
          <span role="img" aria-label="cookie">
            🧆
          </span>
        </div>

        {/* 타이틀 */}
        <h1 className="text-chocolate mb-4 text-3xl font-bold">
          두쫀쿠 유형 테스트
        </h1>

        {/* 서브타이틀 */}
        <p className="text-secondary mb-2 text-lg">내가 만약 두쫀쿠라면?</p>

        {/* 설명 */}
        <p className="text-muted mb-8 text-sm">
          간단하게 알아보는 나의 성격 유형!
        </p>

        {/* 시작 버튼 */}
        <TrackableLink
          href="/question"
          trackEvent="test_start"
          trackParams={{ button_location: 'hero' }}
          className="btn-primary text-lg"
        >
          테스트 시작하기
        </TrackableLink>

        {/* 푸터 */}
        <p className="text-muted mt-12 text-xs">* 재미로 보는 테스트입니다</p>
        <TrackableLink
          href="/privacy"
          trackEvent="privacy_policy"
          className="text-muted mt-2 text-xs underline hover:text-(--color-text-secondary)"
        >
          개인정보 처리방침
        </TrackableLink>
      </main>
    </div>
  );
}