'use client';

import { SERVICE_URL } from '@/constants/app';
import ResultCard from './ResultCard';

export interface ResultImageCardProps {
  id: string;
  type: string;
  name: string;
  tags: string[];
  description: {
    coreTexture: string[];
    hiddenFilling: string[];
  };
}

export default function ResultImageCard({
  id,
  type,
  name,
  tags,
  description,
}: ResultImageCardProps) {
  return (
    <div id={id} className="bg-cream fixed left-[-9999px] w-150 px-8 py-12">
      <ResultCard
        type={type}
        name={name}
        tags={tags}
        description={description}
      />

      {/* 하단 URL */}
      <div className="border-cookie/20 border-t pt-6 text-center">
        <p className="text-chocolate text-sm font-medium">
          나도 테스트 하러 가기 👉
        </p>
        <a
          className="text-chocolate mt-1 text-base font-bold"
          href={SERVICE_URL}
          target="_blank"
        >
          {SERVICE_URL}
        </a>
      </div>
    </div>
  );
}
