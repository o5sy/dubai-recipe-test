interface AnswerButtonProps {
  /** 답변 텍스트 */
  text: string;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 선택 여부 */
  isSelected?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 질문에 대한 답변 선택 버튼 컴포넌트
 */
export default function AnswerButton({
  text,
  onClick,
  isSelected = false,
  className = '',
}: AnswerButtonProps) {
  const handleInteraction = (
    e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>
  ) => {
    // 포커스 제거하여 active 상태 해제
    e.currentTarget.blur();
    onClick();
  };

  const buttonClass = isSelected ? 'btn-primary' : 'btn-secondary';

  return (
    <button
      className={`${buttonClass} w-full px-6 py-4 text-left transition-transform select-none hover:scale-[1.02] ${className}`}
      onMouseUp={handleInteraction}
      onTouchEnd={handleInteraction}
    >
      {text}
    </button>
  );
}
