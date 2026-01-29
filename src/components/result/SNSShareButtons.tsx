'use client';

import { useState } from 'react';

interface SNSShareButtonsProps {
  onKakaoShare: () => void;
  onInstagramShare: () => void;
  onFacebookShare: () => void;
  onTwitterShare: () => void;
}

export default function SNSShareButtons({
  onKakaoShare,
  onInstagramShare,
  onFacebookShare,
  onTwitterShare,
}: SNSShareButtonsProps) {
  const [isKakaoReady] = useState(() => {
    // @ts-expect-error Kakao SDK는 전역으로 로드됨
    const kakao = window.Kakao;
    if (!kakao || !kakao.isInitialized()) {
      console.error('Kakao SDK is not initialized');
      return false;
    }
    return true;
  });

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onKakaoShare}
        disabled={!isKakaoReady}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow-md disabled:opacity-50"
        aria-label="카카오톡 공유"
        title="카카오톡으로 공유"
      >
        <span className="text-xl">💬</span>
      </button>
      <button
        onClick={onInstagramShare}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="인스타그램 공유"
        title="인스타그램으로 공유"
      >
        <span className="text-xl">📷</span>
      </button>
      <button
        onClick={onFacebookShare}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="페이스북 공유"
        title="페이스북으로 공유"
      >
        <span className="text-xl">👥</span>
      </button>
      <button
        onClick={onTwitterShare}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="X(트위터) 공유"
        title="X(트위터)로 공유"
      >
        <span className="text-xl">🐦</span>
      </button>
    </div>
  );
}
