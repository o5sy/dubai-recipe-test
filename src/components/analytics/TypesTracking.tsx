'use client';

import { useTrackTypes } from '@/lib/analytics';
import type { ReactNode } from 'react';

interface TypesTrackingProps {
  children: ReactNode;
}

/**
 * 유형 페이지 진입 추적 컴포넌트
 * 서버 컴포넌트에서 사용
 */
export function TypesTracking({ children }: TypesTrackingProps) {
  useTrackTypes();
  return <>{children}</>;
}