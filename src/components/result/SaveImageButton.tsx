'use client';

interface SaveImageButtonProps {
  onSaveImage: () => void | Promise<void>;
}

export default function SaveImageButton({ onSaveImage }: SaveImageButtonProps) {
  return (
    <button
      onClick={onSaveImage}
      className="bg-chocolate flex-1 cursor-pointer rounded-full px-6 py-4 text-sm font-semibold text-white transition-all hover:opacity-90"
    >
      이미지로 저장하기
    </button>
  );
}
