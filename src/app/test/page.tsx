'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import type { MBTIValue } from '@/types/question';
import { calculateMBTI } from '@/utils/calculateMBTI';
import ProgressBar from '@/components/test/ProgressBar';
import QuestionCard from '@/components/test/QuestionCard';

export default function TestPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, MBTIValue>>({});

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
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
        />
      </div>
    </div>
  );
}
