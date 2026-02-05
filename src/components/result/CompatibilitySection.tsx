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

  return (
    <div className="mb-10 w-full">
      <h2 className="text-chocolate mb-4 text-xl font-bold">궁합 알아보기</h2>

      <div className="space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-pistachio-dark mb-3 text-base font-semibold">
            🤎 쫀득바삭 궁합 💚
          </h3>
          <div className="flex gap-3">
            {goodTypes.map((result) => (
              <Link
                key={result.type}
                href={`/result/${result.type.toLowerCase()}`}
                className="bg-pistachio/10 hover:bg-pistachio/20 flex flex-1 flex-col items-center gap-2 rounded-xl p-3 transition-colors"
              >
                <Image
                  src={getCharacterImagePathByMbtiType(result.type)}
                  alt={result.type}
                  width={64}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <span className="text-chocolate text-xs font-semibold">
                  {result.type}
                </span>
                <span className="text-center text-xs leading-tight text-(--color-text-muted)">
                  {result.name.split(',')[1]?.trim()}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h3 className="text-pistachio-dark mb-3 text-base font-semibold">
            ⚡️ 딱딱강정 궁합 ⚡️
          </h3>
          <div className="flex gap-3">
            {badTypes.map((result) => (
              <Link
                key={result.type}
                href={`/result/${result.type.toLowerCase()}`}
                className="bg-pistachio/10 hover:bg-pistachio/20 flex flex-1 flex-col items-center gap-2 rounded-xl p-3 transition-colors"
              >
                <Image
                  src={getCharacterImagePathByMbtiType(result.type)}
                  alt={result.type}
                  width={64}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <span className="text-chocolate text-xs font-semibold">
                  {result.type}
                </span>
                <span className="text-center text-xs leading-tight text-(--color-text-muted)">
                  {result.name.split(',')[1]?.trim()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
