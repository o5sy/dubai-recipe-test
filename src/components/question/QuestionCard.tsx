import type { Question } from '@/types/question';
import type { MBTIValue } from '@/types/question';
import AnswerButton from './AnswerButton';

interface QuestionCardProps {
  /** 표시할 질문 */
  question: Question;
  /** 현재 질문 번호 (1부터 시작) */
  questionNumber: number;
  /** 답변 선택 핸들러 */
  onAnswer: (value: MBTIValue) => void;
  /** 선택된 답변 값 */
  selectedValue?: MBTIValue;
}

/**
 * 질문과 답변 선택지를 표시하는 카드 컴포넌트
 */
export default function QuestionCard({
  question,
  questionNumber,
  onAnswer,
  selectedValue,
}: QuestionCardProps) {
  return (
    <div className="card animate-fade-in">
      <div className="mb-6">
        <p className="mb-3 text-base font-semibold text-[var(--color-pistachio)]">
          STEP{questionNumber}. {question.situation}
        </p>
        <h2 className="text-2xl leading-relaxed font-bold text-[var(--color-chocolate)]">
          {question.question}
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            text={option.text}
            onClick={() => onAnswer(option.value)}
            isSelected={option.value === selectedValue}
          />
        ))}
      </div>
    </div>
  );
}
