import html2canvas from 'html2canvas-pro';
import { toast } from 'sonner';

interface SaveAsImageOptions {
  elementId: string;
  backgroundColor?: string;
  filename?: string;
  text?: string;
  timeout?: number;
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
    scale: 1, // 원본 크기로 설정 (기기 픽셀 비율의 기본값 무시)
  });

  return new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(null);
      }
    }, 'image/png');
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
async function shareImageFile(file: File, title?: string): Promise<void> {
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
  }, 300);
}

/**
 * 타임아웃 적용하여 이미지 캡처
 */
async function captureWithTimeout(
  elementId: string,
  backgroundColor: string,
  timeout: number
): Promise<Blob | null> {
  const timeoutPromise = new Promise<null>((_, reject) => {
    setTimeout(() => reject(new Error('TIMEOUT')), timeout);
  });

  try {
    return await Promise.race([
      captureElementAsBlob(elementId, { backgroundColor }),
      timeoutPromise,
    ]);
  } catch (error) {
    if (error instanceof Error && error.message === 'TIMEOUT') {
      console.error('이미지 생성 타임아웃');
    }
    return null;
  }
}

/**
 * Web Share API로 이미지 공유 시도
 * @returns 성공 또는 사용자 취소 시 true, 실패 시 false
 */
async function tryShareImage(file: File, text?: string): Promise<boolean> {
  if (!canShareImageFile(file)) {
    return false;
  }

  try {
    await shareImageFile(file, text);
    return true;
  } catch (error) {
    // 사용자가 취소한 경우 - 더 이상 진행하지 않음
    if (error instanceof Error && error.name === 'AbortError') {
      return true;
    }

    // NotAllowedError 등 - 다운로드로 폴백
    console.error('이미지 공유 실패, 다운로드로 전환:', error);
    return false;
  }
}

/**
 * 이미지 저장/공유 메인 함수
 */
export async function shareAsImage({
  elementId,
  text,
  backgroundColor = '#f5f1e8',
  filename = `${new Date().toISOString()}.png`,
  timeout = 3000,
}: SaveAsImageOptions): Promise<void> {
  try {
    const blob = await captureWithTimeout(elementId, backgroundColor, timeout);

    if (!blob) {
      toast.warning('이미지 생성에 실패했습니다.\n스크린샷을 이용해주세요.');
      return;
    }

    const file = new File([blob], filename, { type: 'image/png' });

    // 공유 시도, 성공하면 종료
    const shared = await tryShareImage(file, text);
    if (shared) return;

    // 공유 실패 시 다운로드
    downloadImageFile(blob, filename);
  } catch (error) {
    console.error('이미지 처리 중 오류:', error);
    toast.warning(
      '이미지 처리 중 오류가 발생했습니다. 스크린샷을 이용해주세요.'
    );
  }
}
