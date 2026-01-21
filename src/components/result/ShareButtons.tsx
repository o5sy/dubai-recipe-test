'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  type: string;
  resultName: string;
}

export default function ShareButtons({ type, resultName }: ShareButtonsProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  // 공유할 URL 생성
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/result/${type.toLowerCase()}`
      : '';

  // 공유 메시지
  const shareText = `나는 ${resultName}! 두쫀쿠 유형 테스트 결과를 확인해보세요 🍪`;

  // 링크 복사 기능
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('링크 복사 실패:', error);
      alert('링크 복사에 실패했습니다.');
    }
  };

  // X(트위터) 공유
  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  // 인스타그램 스토리 공유 (모바일 전용)
  const handleShareInstagram = () => {
    // 인스타그램은 웹에서 직접 스토리 공유가 불가능하므로
    // 모바일에서는 클립보드에 링크를 복사하고 안내 메시지 표시
    if (navigator.share) {
      navigator
        .share({
          title: '두쫀쿠 유형 테스트',
          text: shareText,
          url: shareUrl,
        })
        .catch((error) => {
          if (error.name !== 'AbortError') {
            console.error('공유 실패:', error);
          }
        });
    } else {
      handleCopyLink();
      alert(
        '링크가 복사되었습니다! 인스타그램 앱에서 스토리에 붙여넣어 주세요.',
      );
    }
  };

  // 카카오톡 공유
  const handleShareKakao = () => {
    if (typeof window === 'undefined') return;

    // @ts-expect-error Kakao SDK는 전역으로 로드됨
    if (!window.Kakao) {
      alert('카카오톡 공유 기능을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // @ts-expect-error Kakao SDK는 전역으로 로드됨
    if (!window.Kakao.isInitialized()) {
      alert('카카오톡 공유 기능을 초기화하는 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // @ts-expect-error Kakao SDK는 전역으로 로드됨
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '두쫀쿠 유형 테스트 🍪',
        description: shareText,
        imageUrl: `${window.location.origin}/og-image.png`,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: '나도 테스트하기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  return (
    <div className="mb-8 w-full">
      <h2 className="mb-4 text-center text-lg font-semibold text-[var(--color-chocolate)]">
        결과 공유하기
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <button
          onClick={handleShareKakao}
          className="btn-secondary text-sm"
          aria-label="카카오톡으로 공유하기"
        >
          카카오톡
        </button>
        <button
          onClick={handleShareInstagram}
          className="btn-secondary text-sm"
          aria-label="인스타그램으로 공유하기"
        >
          인스타그램
        </button>
        <button
          onClick={handleShareTwitter}
          className="btn-secondary text-sm"
          aria-label="X(트위터)로 공유하기"
        >
          X (트위터)
        </button>
        <button
          onClick={handleCopyLink}
          className="btn-secondary text-sm"
          aria-label="링크 복사하기"
        >
          {copySuccess ? '복사 완료!' : '링크 복사'}
        </button>
      </div>
    </div>
  );
}
