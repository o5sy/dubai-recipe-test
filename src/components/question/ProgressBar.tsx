interface ProgressBarProps {
  /** 현재 질문 번호 (1-based) */
  current: number;
  /** 전체 질문 수 */
  total: number;
}

/**
 * 테스트 진행도를 표시하는 프로그레스 바 컴포넌트
 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2 text-sm text-[var(--color-text-secondary)]">
        <span>
          질문 {current}/{total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
