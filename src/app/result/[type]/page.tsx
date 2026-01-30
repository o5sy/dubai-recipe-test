import Link from 'next/link';
import { notFound } from 'next/navigation';

import ShareSection from '@/components/result/ShareSection';
import { results } from '@/data/results';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';
import Image from 'next/image';

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-(--color-bg) px-4 py-12">
      <main className="flex w-full max-w-2xl flex-col items-center">
        {/* 결과 헤더 */}
        <div className="mb-4 text-center">
          <h1 className="mt-10 mb-4">
            <span className="mb-2 block text-2xl font-medium text-(--color-text-secondary)">
              {result.name.split(',')[0]}
            </span>
            <span className="text-chocolate block text-5xl font-bold break-keep">
              {result.name.split(',')[1]}
            </span>
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            {result.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-pistachio/20 text-pistachio-dark rounded-full px-4 py-1.5 text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 캐릭터 이미지 */}
        <div className="mb-2 w-full">
          <Image
            className="[no-select-image] mx-auto mb-4 rounded-xl object-cover"
            src={getCharacterImagePathByMbtiType(result.type)}
            alt="Test Result Character Image"
            width={300}
            height={400}
            draggable={false}
          />
        </div>

        {/* 유형 설명 */}
        <div className="mb-10 w-full">
          <div className="mb-4 flex items-center gap-2">
            {/* <span className="text-2xl">🍪</span> */}
            <h2 className="text-chocolate text-xl font-bold">
              ✨ 당신은 이런 두쫀쿠예요 ✨
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-pistachio-dark mb-3 text-base font-semibold">
                쫀득한 본모습
              </h3>
              <div className="text-secondary flex flex-col gap-1">
                {result.description.coreTexture
                  .slice(0, 3)
                  .map((core, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-pistachio self-start text-sm">
                        •
                      </span>
                      <span className="text-chocolate text-sm">{core}</span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="text-pistachio-dark mb-3 text-base font-semibold">
                바삭한 속마음
              </h3>
              <div className="text-secondary flex flex-col gap-1">
                {result.description.hiddenFilling
                  .slice(0, 3)
                  .map((hidden, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <span className="text-pistachio self-start text-sm">
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
