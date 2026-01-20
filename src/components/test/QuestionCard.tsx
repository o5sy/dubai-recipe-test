import type { Question } from '@/types/question';
import type { MBTIValue } from '@/types/question';
import AnswerButton from './AnswerButton';

interface QuestionCardProps {
  /** 표시할 질문 */
  question: Question;
  /** 답변 선택 핸들러 */
  onAnswer: (value: MBTIValue) => void;
}

/**
 * 질문과 답변 선택지를 표시하는 카드 컴포넌트
 */
export default function QuestionCard({
  question,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="card animate-fade-in">
      <h2 className="text-xl font-bold text-[var(--color-chocolate)] mb-6 leading-relaxed">
        {question.question}
      </h2>
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            text={option.text}
            onClick={() => onAnswer(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
