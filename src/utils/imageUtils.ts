import html2canvas from 'html2canvas-pro';

interface SaveAsImageOptions {
  elementId: string;
  backgroundColor?: string;
  filename?: string;
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

    canvas.toBlob((blob) => {
      if (!blob) {
        alert('이미지 생성에 실패했습니다.');
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    console.error('이미지 저장 중 오류 발생:', error);
    alert('이미지 저장 중 오류가 발생했습니다.');
  }
}
