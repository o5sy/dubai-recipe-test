import Link from 'next/link';
import { notFound } from 'next/navigation';

import CitizenCard from '@/components/result/CitizenCard';
import ShareSection from '@/components/result/ShareSection';
import { results } from '@/data/results';
import { extractTypeNameFromTitle, getTodayDateString } from '@/utils/format';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <main className="flex w-full max-w-2xl flex-col items-center">
        {/* 결과 헤더 */}
        <div className="mb-12 text-center">
          <div className="mb-4 text-6xl">🍪</div>
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-chocolate)]">
            시민증 발급 완료
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            당신은 이제 두쫀쿠 세계의 시민입니다!
          </p>
        </div>

        {/* 시민증 카드 */}
        <div className="mb-16 w-full">
          <CitizenCard
            imageUrl={getCharacterImagePathByMbtiType(result.type)}
            name="Seungyeon Oh"
            traits={result.tags}
            type={extractTypeNameFromTitle(result.name)}
            regDate={getTodayDateString()}
            siteUrl="https://dujjongku-test.example.com"
          />
        </div>

        {/* 유형 설명 */}
        <div className="mb-10 w-full">
          <div className="mb-4 flex items-center gap-2">
            {/* <span className="text-2xl">🍪</span> */}
            <h2 className="text-xl font-bold text-[var(--color-chocolate)]">
              당신은 이런 두쫀쿠예요
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-base font-semibold text-pistachio-dark">
                쫀득한 본모습
              </h3>
              <div className="flex flex-col gap-1 text-secondary">
                {result.description.coreTexture
                  .slice(0, 3)
                  .map((core, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-pistachio text-sm self-start">
                        •
                      </span>
                      <span className="text-chocolate text-sm">{core}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-base font-semibold text-pistachio-dark">
                바삭한 속마음
              </h3>
              <div className="flex flex-col gap-1 text-secondary">
                {result.description.hiddenFilling
                  .slice(0, 3)
                  .map((hidden, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-pistachio text-sm self-start">
                        •
                      </span>
                      <span className="text-chocolate text-sm">{hidden}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* 공유 섹션 */}
        <ShareSection resultType={result.type} resultName={result.name} />

        {/* 테스트 다시하기 */}
        <div className="mb-6">
          <Link
            href="/question"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-[var(--color-chocolate)] shadow-sm transition-all hover:shadow-md"
          >
            테스트 다시하기
          </Link>
        </div>

        {/* 하단 링크 */}
        <Link
          href="/"
          className="text-sm text-[var(--color-text-muted)] underline hover:text-[var(--color-text-secondary)]"
        >
          처음으로 돌아가기
        </Link>
      </main>
    </div>
  );
}
