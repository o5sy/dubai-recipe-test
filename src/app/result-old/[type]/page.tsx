import CitizenCard from '@/components/result/CitizenCard';
import { results } from '@/data/results';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ResultPageProps {
  params: Promise<{
    type: string;
  }>;
}

// 16개 MBTI 유형을 모두 정적으로 생성
export function generateStaticParams() {
  return Object.keys(results).map((type) => ({
    type: type.toLowerCase(),
  }));
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { type } = await params;
  const result = results[type.toUpperCase()];

  // 유효하지 않은 MBTI 타입인 경우 404 표시
  if (!result) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <main className="flex w-full max-w-2xl flex-col items-center">
        {/* 결과 헤더 */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🍪</div>
          <h1 className="mb-2 text-3xl font-bold text-[var(--color-chocolate)]">
            시민증 발급 완료!
          </h1>
          <p className="text-sm font-medium text-[var(--color-cookie)]">
            당신은 이제 두쫀쿠 세계의 시민입니다.
          </p>
        </div>

        {/* 시민증 카드 */}
        <div className="mb-10">
          <CitizenCard
            imageUrl={getCharacterImagePathByMbtiType(result.type)}
            name="Seungyeon Oh"
            traits={['강력한 탄성 외피', '직설적 고소함', '스릴 넘치는 풍미']}
            type={result.type}
            regDate="2024-01-01"
            siteUrl="https://dujjongku-test.example.com"
          />
        </div>

        {/* 성격 설명 카드 */}
        <div className="card mb-6 w-full">
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-chocolate)]">
            당신은 이런 두쫀쿠예요
          </h2>
          <p className="leading-relaxed text-[var(--color-text-secondary)]">
            {result.description.coreTexture}
          </p>
        </div>

        {/* 궁합 카드 */}
        <div className="card mb-8 w-full">
          <h2 className="mb-4 text-xl font-semibold text-[var(--color-chocolate)]">
            두쫀쿠 궁합
          </h2>

          {/* 잘 맞는 유형 */}
          <div className="mb-4">
            <h3 className="mb-2 text-sm font-semibold text-[var(--color-pistachio-dark)]">
              잘 맞는 유형
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.compatibility.good.map((compatType) => (
                <Link
                  key={compatType}
                  href={`/result/${compatType.toLowerCase()}`}
                  className="rounded-full bg-[var(--color-pistachio)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--color-pistachio-dark)]"
                >
                  {compatType}
                </Link>
              ))}
            </div>
          </div>

          {/* 안 맞는 유형 */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-muted)]">
              안 맞는 유형
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.compatibility.bad.map((compatType) => (
                <Link
                  key={compatType}
                  href={`/result/${compatType.toLowerCase()}`}
                  className="rounded-full bg-[var(--color-beige)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all hover:bg-[var(--color-cookie)] hover:text-white"
                >
                  {compatType}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 공유 버튼 영역 */}
        <ShareButtons type={type} resultName={result.name} />

        {/* 다시 하기 버튼 */}
        <Link href="/question" className="btn-primary">
          테스트 다시 하기
        </Link>

        {/* 메인으로 버튼 */}
        <Link
          href="/"
          className="mt-4 text-sm text-[var(--color-text-muted)] underline hover:text-[var(--color-text-secondary)]"
        >
          처음으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
