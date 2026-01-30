interface AnswerButtonProps {
  /** 답변 텍스트 */
  text: string;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 질문에 대한 답변 선택 버튼 컴포넌트
 */
export default function AnswerButton({
  text,
  onClick,
  className = '',
}: AnswerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn-secondary w-full px-6 py-4 text-left transition-transform hover:scale-[1.02] ${className}`}
    >
      {text}
    </button>
  );
}
