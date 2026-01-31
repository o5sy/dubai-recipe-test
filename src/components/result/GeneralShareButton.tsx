'use client';

interface GeneralShareButtonProps {
  onShare: () => void;
}

export default function GeneralShareButton({
  onShare,
}: GeneralShareButtonProps) {
  return (
    <button
      onClick={onShare}
      className="bg-pistachio flex-1 cursor-pointer rounded-full px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-[var(--color-pistachio-dark)]"
    >
      공유하기
    </button>
  );
}
