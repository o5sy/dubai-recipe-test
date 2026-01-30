import Image from 'next/image';

import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';

interface ResultCardProps {
  type: string;
  name: string;
  tags: string[];
  description: {
    coreTexture: string[];
    hiddenFilling: string[];
  };
}

export default function ResultCard({
  type,
  name,
  tags,
  description,
}: ResultCardProps) {
  return (
    <>
      {/* 결과 헤더 */}
      <div className="mb-5 text-center">
        <h1 className="mt-10 mb-4">
          <span className="mb-2 block text-2xl font-medium text-(--color-text-secondary)">
            {name.split(',')[0]}
          </span>
          <span className="text-chocolate block text-5xl font-bold break-keep">
            {name.split(',')[1]}
          </span>
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map((tag, index) => (
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
          className="mx-auto mb-4 rounded-xl object-cover"
          src={getCharacterImagePathByMbtiType(type)}
          alt="Result Character Image"
          width={300}
          height={400}
          draggable={false}
        />
      </div>

      {/* 유형 설명 */}
      <div className="mb-10 w-full">
        <h2 className="text-chocolate mb-3 text-xl font-bold">
          <span className="mr-1 inline-block">✨</span>
          당신은 이런 두쫀쿠예요
          <span className="ml-1 inline-block">✨</span>
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-pistachio-dark mb-3 text-base font-semibold">
              쫀득한 본모습
            </h3>
            <div className="text-secondary flex flex-col gap-1">
              {description.coreTexture.slice(0, 3).map((core, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="text-pistachio self-start text-sm">•</span>
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
              {description.hiddenFilling.slice(0, 3).map((hidden, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="text-pistachio self-start text-sm">•</span>
                  <span className="text-chocolate text-sm">{hidden}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
