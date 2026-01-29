'use client';

import { shareGeneral } from '@/utils/shareUtils';

interface GeneralShareButtonProps {
  url: string;
  title: string;
  description: string;
}

export default function GeneralShareButton({
  url,
  title,
  description,
}: GeneralShareButtonProps) {
  const handleShare = () => {
    shareGeneral({ url, title, description });
  };

  return (
    <button
      onClick={handleShare}
      className="flex-1 cursor-pointer rounded-full bg-[var(--color-pistachio)] px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--color-pistachio-dark)]"
    >
      공유하기
    </button>
  );
}
