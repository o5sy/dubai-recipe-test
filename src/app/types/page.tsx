import Image from 'next/image';
import Link from 'next/link';

import { results } from '@/data/results';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';

export default function TypesPage() {
  const allTypes = Object.values(results);

  return (
    <div className="flex min-h-screen flex-col items-center bg-(--color-bg) px-4 py-10">
      <main className="w-full max-w-md">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-secondary)"
          >
            ← 홈
          </Link>
        </div>

        <h1 className="text-chocolate mb-2 text-center text-2xl font-bold">
          두쫀쿠 유형 둘러보기
        </h1>
        <p className="text-muted mb-6 text-center text-sm">
          나만의 두쫀쿠 유형을 찾아보거나, 궁금한 유형을 직접 클릭해보세요
        </p>

        {/* 유형 그리드 */}
        <div className="grid grid-cols-4 gap-3">
          {allTypes.map((result) => (
            <Link
              key={result.type}
              href={`/result/${result.type.toLowerCase()}`}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-sm transition-all hover:shadow-md"
            >
              <Image
                src={getCharacterImagePathByMbtiType(result.type)}
                alt={result.type}
                width={64}
                height={80}
                className="rounded-xl object-cover"
              />
              <span className="text-chocolate text-center text-xs font-bold break-keep">
                {result.name.split(',')[1]?.trim()}
              </span>
              <span className="text-center text-xs leading-tight text-(--color-text-muted)">
                {result.type}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/question" className="btn-primary">
            내 유형 찾으러 가기
          </Link>
        </div>
      </main>
    </div>
  );
}
