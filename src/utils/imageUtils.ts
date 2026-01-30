import html2canvas from 'html2canvas-pro';

interface SaveAsImageOptions {
  elementId: string;
  backgroundColor?: string;
  filename?: string;
}

// 모바일 환경 감지
function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Web Share API 지원 여부 확인
function canUseWebShare(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'share' in navigator &&
    'canShare' in navigator
  );
}

export async function saveAsImage({
  elementId,
  backgroundColor = '#f5f1e8',
  filename = `${new Date().getTime()}.png`,
}: SaveAsImageOptions): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error('저장할 영역을 찾을 수 없습니다.');
      return;
    }

    const canvas = await html2canvas(element, {
      backgroundColor,
      useCORS: true,
      logging: false,
    });

    // Canvas를 Blob으로 변환 (Promise 기반)
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/png');
    });

    if (!blob) {
      alert('이미지 생성에 실패했습니다.');
      return;
    }

    // 모바일 환경에서 Web Share API 사용 가능한 경우
    if (isMobile() && canUseWebShare()) {
      const file = new File([blob], filename, { type: 'image/png' });
      const shareData = {
        files: [file],
        title: '두쫀쿠 유형 테스트 결과',
      };

      if (navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (error) {
          // 사용자가 공유를 취소하거나 에러 발생 시 폴백
          console.log('공유가 취소되었거나 실패했습니다:', error);
        }
      }
    }

    // 데스크톱 또는 Web Share API 미지원 환경: 다운로드 방식
    // 새 탭에서 이미지 열기 (모바일에서 사용자가 직접 저장 가능)
    if (isMobile()) {
      const url = URL.createObjectURL(blob);
      const newWindow = window.open(url, '_blank');
      if (newWindow) {
        // 새 탭이 열리면 사용자에게 안내
        setTimeout(() => {
          alert('이미지를 길게 눌러서 저장해주세요.');
          URL.revokeObjectURL(url);
        }, 1000);
      } else {
        alert('팝업이 차단되었습니다. 브라우저 설정에서 팝업을 허용해주세요.');
        URL.revokeObjectURL(url);
      }
    } else {
      // 데스크톱: 기존 다운로드 방식
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('이미지 저장 중 오류 발생:', error);
    alert('이미지 저장 중 오류가 발생했습니다.');
  }
}
