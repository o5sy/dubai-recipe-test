'use client';

import { useTrackResult } from '@/lib/analytics';
import type { ReactNode } from 'react';

interface ResultPageTrackingProps {
  mbtiType: string;
  resultName: string;
  children: ReactNode;
}

/**
 * 결과 페이지 추적 래퍼
 * 페이지 진입 시 자동으로 완료 이벤트 전송
 */
export function ResultPageTracking({
  mbtiType,
  resultName,
  children,
}: ResultPageTrackingProps) {
  useTrackResult({
    mbtiType,
    resultName,
    autoTrackComplete: true,
  });

  return <>{children}</>;
}
