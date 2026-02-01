import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <main className="flex w-full max-w-md flex-col items-center text-center">
        {/* 팔라펠 이모지 아이콘 */}
        <div className="animate-bounce-slow mb-8 text-7xl">
          <span role="img" aria-label="cookie">
            🧆
          </span>
        </div>

        {/* 타이틀 */}
        <h1 className="mb-4 text-3xl font-bold text-[var(--color-chocolate)]">
          두쫀쿠 유형 테스트
        </h1>

        {/* 서브타이틀 */}
        <p className="mb-2 text-lg text-[var(--color-text-secondary)]">
          내가 만약 두쫀쿠라면?
        </p>

        {/* 설명 */}
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">
          간단하게 알아보는 나의 성격 유형!
        </p>

        {/* 시작 버튼 */}
        <Link href="/question" className="btn-primary text-lg">
          테스트 시작하기
        </Link>

        {/* 푸터 */}
        <p className="mt-12 text-xs text-[var(--color-text-muted)]">
          * 재미로 보는 테스트입니다
        </p>
      </main>
    </div>
  );
}
