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
    <div className="mt-6 flex gap-3">
      {showPrevious && (
        <button onClick={onPrevious} className="btn-secondary flex-1 px-6 py-3">
          ← 이전
        </button>
      )}
      {showNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="btn-primary flex-1 px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
        >
          다음 →
        </button>
      )}
    </div>
  );
}
