'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SNSShareButtonsProps {
  onKakaoShare: () => void;
  onInstagramShare: () => void;
  onFacebookShare: () => void;
  onTwitterShare: () => void;
  onCopyLink: () => void;
}

export default function SNSShareButtons({
  onKakaoShare,
  onInstagramShare,
  onFacebookShare,
  onTwitterShare,
  onCopyLink,
}: SNSShareButtonsProps) {
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    // @ts-expect-error Kakao SDK는 전역으로 로드됨
    const kakao = window.Kakao;
    if (kakao && kakao.isInitialized()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsKakaoReady(true);
    }
  }, []);

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={onKakaoShare}
        disabled={!isKakaoReady}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="카카오톡 공유"
        title="카카오톡으로 공유"
      >
        <Image
          src="/sns/KakaoTalk.svg"
          alt="카카오톡"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </button>
      <button
        onClick={onInstagramShare}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="인스타그램 공유"
        title="인스타그램으로 공유"
      >
        <Image
          src="/sns/Instagram.svg"
          alt="인스타그램"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </button>
      <button
        onClick={onFacebookShare}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="페이스북 공유"
        title="페이스북으로 공유"
      >
        <Image
          src="/sns/Facebook.svg"
          alt="페이스북"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </button>
      <button
        onClick={onTwitterShare}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="X(트위터) 공유"
        title="X(트위터)로 공유"
      >
        <Image
          src="/sns/X.svg"
          alt="X(트위터)"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </button>
      <button
        onClick={onCopyLink}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-white shadow-sm transition-all hover:shadow-md"
        aria-label="링크 복사"
        title="링크 복사"
      >
        <span className="text-xl">🔗</span>
      </button>
    </div>
  );
}
