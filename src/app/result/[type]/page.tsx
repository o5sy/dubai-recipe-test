import Link from 'next/link';
import { notFound } from 'next/navigation';

import ResultCard from '@/components/result/ResultCard';
import ShareSection from '@/components/result/ShareSection';
import { results } from '@/data/results';

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--color-bg) px-4 pt-8 pb-20">
      <main className="flex w-full max-w-2xl flex-col items-center">
        {/* 결과 카드 */}
        <ResultCard
          type={result.type}
          name={result.name}
          tags={result.tags}
          description={result.description}
        />

        {/* 공유 섹션 */}
        <ShareSection
          resultCardProps={{
            type: result.type,
            name: result.name,
            tags: result.tags,
            description: result.description,
          }}
        />

        {/* 테스트 다시하기 */}
        <div className="mb-8">
          <Link
            href="/question"
            className="text-chocolate inline-block rounded-full bg-white px-8 py-3 text-sm font-medium shadow-sm transition-all hover:shadow-md"
          >
            테스트 다시하기
          </Link>
        </div>

        {/* 하단 링크 */}
        <Link
          href="/"
          className="text-sm text-(--color-text-muted) underline hover:text-(--color-text-secondary)"
        >
          처음으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
