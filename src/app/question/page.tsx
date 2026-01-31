'use client';

import ProgressBar from '@/components/question/ProgressBar';
import QuestionCard from '@/components/question/QuestionCard';
import NavigationButtons from '@/components/question/NavigationButtons';
import { questions } from '@/data/questions';
import type { MBTIValue } from '@/types/question';
import { calculateMBTI } from '@/utils/calculateMBTI';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function QuestionPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, MBTIValue>>({});

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const hasAnsweredCurrent = !!answers[currentQuestion.id];

  const handleAnswer = (value: MBTIValue) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const mbtiType = calculateMBTI(newAnswers);
      router.push(`/result/${mbtiType.toLowerCase()}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (hasAnsweredCurrent) {
      const mbtiType = calculateMBTI(answers);
      router.push(`/result/${mbtiType.toLowerCase()}`);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-10">
      <div className="w-full max-w-md">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={totalQuestions}
        />
        <QuestionCard
          key={currentQuestionIndex}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          onAnswer={handleAnswer}
          selectedValue={answers[currentQuestion.id]}
        />
        <NavigationButtons
          onPrevious={handlePrevious}
          onNext={handleNext}
          showPrevious={currentQuestionIndex > 0}
          showNext={true}
          nextDisabled={!hasAnsweredCurrent}
        />
      </div>
    </div>
  );
}
