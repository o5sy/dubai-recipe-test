import html2canvas from 'html2canvas-pro';

interface SaveAsImageOptions {
  elementId: string;
  backgroundColor?: string;
  filename?: string;
}

interface CaptureOptions {
  backgroundColor?: string;
}

/**
 * HTML 요소를 캡처하여 Blob으로 변환
 */
async function captureElementAsBlob(
  elementId: string,
  options: CaptureOptions = {}
): Promise<Blob | null> {
  const { backgroundColor = '#f5f1e8' } = options;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('캡처할 요소를 찾을 수 없습니다.');
  }

  const canvas = await html2canvas(element, {
    backgroundColor,
    useCORS: true,
    logging: false,
  });

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/png');
  });
}

/**
 * Web Share API로 이미지 파일 공유 가능 여부 확인
 */
function canShareImageFile(file: File): boolean {
  if (typeof navigator === 'undefined' || !navigator.share) {
    return false;
  }

  // canShare 메서드로 파일 공유 가능 여부 확인
  if (navigator.canShare) {
    const shareData = { files: [file] };
    return navigator.canShare(shareData);
  }

  return false;
}

/**
 * Web Share API로 이미지 파일 공유
 */
async function shareImageFile(file: File, title: string): Promise<void> {
  const shareData = {
    files: [file],
    title,
  };

  await navigator.share(shareData);
}

/**
 * Blob을 파일로 다운로드
 */
function downloadImageFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();

  // 다운로드가 시작될 충분한 시간을 준 후 정리
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 500);
}

/**
 * 이미지 저장/공유 메인 함수
 */
export async function shareAsImage({
  elementId,
  backgroundColor = '#f5f1e8',
  filename = `${new Date().toISOString()}.png`,
}: SaveAsImageOptions): Promise<void> {
  try {
    // 1. HTML 요소를 Blob으로 캡처
    const blob = await captureElementAsBlob(elementId, { backgroundColor });

    if (!blob) {
      alert('이미지 생성에 실패했습니다.');
      return;
    }

    const file = new File([blob], filename, { type: 'image/png' });

    // 2. Web Share API 지원 확인 및 공유 시도
    if (canShareImageFile(file)) {
      try {
        await shareImageFile(file, '두쫀쿠 유형 테스트 결과');
        return;
      } catch (error) {
        // 사용자가 공유를 취소한 경우
        if (
          error instanceof Error &&
          (error.name === 'AbortError' || error.name === 'NotAllowedError')
        ) {
          console.log('공유가 취소되었습니다');
          return;
        }

        // 공유 실패 시 다운로드 시도
        console.log('공유 실패, 다운로드 방식으로 전환:', error);
      }
    }

    // 3. Web Share API 미지원 또는 실패 시 다운로드 시도
    try {
      downloadImageFile(blob, filename);
    } catch (error) {
      // 다운로드도 실패한 경우
      console.error('다운로드 실패:', error);
      alert(
        '이미지 저장에 실패했습니다.\n브라우저 설정을 확인하거나 스크린샷을 이용해주세요.'
      );
    }
  } catch (error) {
    console.error('이미지 처리 중 오류 발생:', error);
    alert('이미지 처리 중 오류가 발생했습니다.');
  }
}
