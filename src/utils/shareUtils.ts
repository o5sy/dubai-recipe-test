export interface ShareData {
  title: string;
  url: string;
  description: string;
}

export type ShareDataForKakao = ShareData & {
  buttonText?: string;
  imageUrl?: string;
};

/**
 * 카카오톡으로 공유
 */
export const shareToKakao = (data: ShareDataForKakao) => {
  // @ts-expect-error Kakao SDK는 전역으로 로드됨
  const kakao = window.Kakao;

  if (!kakao || !kakao.isInitialized()) {
    console.error('Kakao SDK is not initialized');
    return;
  }

  kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl || `${window.location.origin}/og-image.png`,
      link: {
        mobileWebUrl: data.url,
        webUrl: data.url,
      },
    },
    buttons: [
      {
        title: '나도 테스트하기',
        link: {
          mobileWebUrl: data.url,
          webUrl: data.url,
        },
      },
    ],
  });
};

/**
 * X(트위터)에 공유
 */
export const shareToTwitter = (data: ShareData) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    data.title
  )}&url=${encodeURIComponent(data.url)}`;
  window.open(twitterUrl, '_blank', 'width=550,height=420');
};

/**
 * 페이스북에 공유
 */
export const shareToFacebook = (data: ShareData) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    data.url
  )}`;
  window.open(facebookUrl, '_blank', 'width=550,height=420');
};

/**
 * 일반 공유 (브라우저 공유 API 또는 복사)
 */
export const shareGeneral = (data: ShareData) => {
  if (navigator.share) {
    navigator
      .share({
        title: data.title,
        text: data.description,
        url: data.url,
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('공유 실패:', error);
        }
      });
  } else {
    // 공유 API를 지원하지 않으면 URL 복사
    copyLinkToClipboard({
      link: data.url,
      onCopy: () => {
        alert('링크가 복사되었습니다!');
      },
    });
  }
};

export const copyLinkToClipboard = async ({
  link,
  onCopy,
}: {
  link: string;
  onCopy?: () => void;
}): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(link).then(onCopy);
    return true;
  } catch (error) {
    console.error('링크 복사 실패:', error);
    return false;
  }
};
