import Image from 'next/image';
import Link from 'next/link';

import { results } from '@/data/results';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';

interface CompatibilitySectionProps {
  currentType: string;
}

export default function CompatibilitySection({
  currentType,
}: CompatibilitySectionProps) {
  const current = results[currentType.toUpperCase()];
  if (!current) return null;

  const goodTypes = current.compatibility.good
    .map((type) => results[type])
    .filter(Boolean);
  const badTypes = current.compatibility.bad
    .map((type) => results[type])
    .filter(Boolean);

  const good = goodTypes[0];
  const bad = badTypes[0];

  if (!good || !bad) return null;

  return (
    <div className="mb-10 w-full">
      <h2 className="text-chocolate mb-4 text-xl font-bold">
        ✨ 쫀득 궁합 유형 ✨
      </h2>

      <div className="flex gap-3">
        <Link
          href={`/result/${good.type.toLowerCase()}`}
          className="flex flex-1 flex-row items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="bg-pistachio/10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full">
            <Image
              src={getCharacterImagePathByMbtiType(good.type)}
              alt={good.type}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-pistachio text-sm font-semibold tracking-wider uppercase">
              쫀득바삭 케미
            </span>
            <span className="text-chocolate text-md font-semibold">
              {good.name.split(',')[1]?.trim()}
            </span>
          </div>
        </Link>

        <Link
          href={`/result/${bad.type.toLowerCase()}`}
          className="flex flex-1 flex-row items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-rose-50">
            <Image
              src={getCharacterImagePathByMbtiType(bad.type)}
              alt={bad.type}
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wider text-rose-400 uppercase">
              딱딱강정 케미
            </span>
            <span className="text-chocolate text-md font-semibold">
              {bad.name.split(',')[1]?.trim()}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
