'use client';

export default function SaveImageButton() {
  const handleSaveImage = () => {
    // TODO: html2canvas를 사용하여 카드를 이미지로 저장하기
    console.log('이미지 저장 기능 준비 중입니다.');
    alert('이미지 저장 기능은 준비 중입니다.');
  };

  return (
    <button
      onClick={handleSaveImage}
      className="flex-1 rounded-full bg-[var(--color-chocolate)] px-6 py-4 text-sm font-semibold text-white transition-all hover:opacity-90"
    >
      이미지로 저장하기
    </button>
  );
}