'use client';

import { SERVICE_URL } from '@/constants/app';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';
import { shareAsImage } from '@/utils/imageUtils';
import {
  copyLinkToClipboard,
  shareGeneral,
  shareToFacebook,
  shareToKakao,
  shareToTwitter,
} from '@/utils/shareUtils';
import { usePathname } from 'next/navigation';
import { createRoot } from 'react-dom/client';
import { toast } from 'sonner';
import GeneralShareButton from './GeneralShareButton';
import ResultImageCard, { ResultImageCardProps } from './ResultImageCard';
import SaveImageButton from './SaveImageButton';
import SNSShareButtons from './SNSShareButtons';

interface ShareSectionProps {
  resultCardProps: Omit<ResultImageCardProps, 'id'>;
}

export default function ShareSection({ resultCardProps }: ShareSectionProps) {
  const pathname = usePathname();
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${pathname}`
      : null;

  const shareData = {
    url: currentUrl || SERVICE_URL,
    title: `나는 어떤 두쫀쿠일까? 🍪`,
    description: `나는 ${resultCardProps.name}!`,
  };

  const imageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${getCharacterImagePathByMbtiType(resultCardProps.type)}`
      : '';

  const handleSaveImage = async () => {
    const RESULT_CARD_ID = 'result-image-card-to-save';

    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<ResultImageCard {...resultCardProps} id={RESULT_CARD_ID} />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    await shareAsImage({
      elementId: RESULT_CARD_ID,
      text: `나도 테스트 하러 가기 👉\n${SERVICE_URL}`,
    });

    root.unmount();
    document.body.removeChild(container);
  };

  return (
    <>
      {/* 버튼 영역 */}
      <div className="mb-10 flex w-full gap-3">
        <GeneralShareButton
          onShare={() =>
            shareGeneral({ title: shareData.title, url: shareData.url })
          }
        />
        <SaveImageButton onSaveImage={handleSaveImage} />
      </div>

      <div className="mb-10 w-full">
        <p className="text-secondary mb-4 text-center text-sm font-medium">
          친구에게 공유하기
        </p>

        {/* SNS 공유 섹션 */}
        <SNSShareButtons
          onKakaoShare={() => {
            console.log('=== 카카오톡 공유 데이터 ===');
            console.log('shareData:', shareData);
            console.log('imageUrl:', imageUrl);
            console.log('currentUrl:', currentUrl);
            console.log('window.location.origin:', window.location.origin);
            console.log('===========================');
            shareToKakao({ ...shareData, imageUrl });
          }}
          onInstagramShare={() => shareGeneral(shareData)}
          onFacebookShare={() => {
            console.log('=== 페이스북 공유 데이터 ===');
            console.log('shareData:', shareData);
            console.log('currentUrl:', currentUrl);
            console.log('window.location.origin:', window.location.origin);
            console.log('===========================');
            shareToFacebook(shareData);
          }}
          onTwitterShare={() => shareToTwitter(shareData)}
          onCopyLink={() =>
            copyLinkToClipboard({
              link: shareData.url,
              onCopy: () => {
                toast.success('링크가 복사되었습니다!');
              },
            })
          }
        />
      </div>
    </>
  );
}
