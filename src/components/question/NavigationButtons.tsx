interface NavigationButtonsProps {
  /** 이전 버튼 클릭 핸들러 */
  onPrevious: () => void;
  /** 다음 버튼 클릭 핸들러 */
  onNext: () => void;
  /** 이전 버튼 표시 여부 */
  showPrevious: boolean;
  /** 다음 버튼 표시 여부 */
  showNext: boolean;
  /** 다음 버튼 활성화 여부 */
  nextDisabled: boolean;
}

/**
 * 문항 이동을 위한 이전/다음 버튼 컴포넌트
 */
export default function NavigationButtons({
  onPrevious,
  onNext,
  showPrevious,
  showNext,
  nextDisabled,
}: NavigationButtonsProps) {
  return (
    <div className="mt-8 flex justify-between gap-4">
      {showPrevious ? (
        <button
          onClick={onPrevious}
          className="select-none rounded-lg px-6 py-4 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200"
        >
          ← 이전
        </button>
      ) : (
        <div />
      )}
      {showNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="select-none rounded-lg px-6 py-4 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
        >
          다음 →
        </button>
      )}
    </div>
  );
}
