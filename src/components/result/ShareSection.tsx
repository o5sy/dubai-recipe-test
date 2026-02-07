'use client';

import { SERVICE_URL } from '@/constants/app';
import { analytics } from '@/lib/analytics';
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
  mbtiType: string;
  resultCardProps: Omit<ResultImageCardProps, 'id'>;
}

export default function ShareSection({
  mbtiType,
  resultCardProps,
}: ShareSectionProps) {
  const pathname = usePathname();

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${pathname}`
      : null;

  const shareData = {
    url: currentUrl || SERVICE_URL,
    title: '나는 어떤 두쫀쿠일까? 🧆',
    description: `나는 ${resultCardProps.name}!`,
  };

  const imageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${getCharacterImagePathByMbtiType(resultCardProps.type)}`
      : '';

  const handleSaveImage = async () => {
    analytics.trackImageSave(mbtiType);

    const RESULT_CARD_ID = 'result-image-card-to-save';

    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(<ResultImageCard {...resultCardProps} id={RESULT_CARD_ID} />);

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      await shareAsImage({
        elementId: RESULT_CARD_ID,
        text: `나도 테스트 하러 가기 👉\n${SERVICE_URL}`,
      });
      analytics.trackImageSaveSuccess(mbtiType);
    } catch {
      // 이미지 저장 실패 시 에러는 무시
    } finally {
      root.unmount();
      document.body.removeChild(container);
    }
  };

  return (
    <>
      {/* 버튼 영역 */}
      <div className="mb-10 flex w-full gap-3">
        <GeneralShareButton
          onShare={() => {
            analytics.trackShareClick({
              mbti_type: mbtiType,
              share_platform: 'instagram',
              share_method: 'general',
            });
            shareGeneral({ title: shareData.title, url: shareData.url });
          }}
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
            analytics.trackShareClick({
              mbti_type: mbtiType,
              share_platform: 'kakao',
            });
            shareToKakao({ ...shareData, imageUrl });
            analytics.trackShareSuccess({
              mbti_type: mbtiType,
              share_platform: 'kakao',
            });
          }}
          onInstagramShare={() => {
            analytics.trackShareClick({
              mbti_type: mbtiType,
              share_platform: 'instagram',
            });
            shareGeneral(shareData);
          }}
          onFacebookShare={() => {
            analytics.trackShareClick({
              mbti_type: mbtiType,
              share_platform: 'facebook',
            });
            shareToFacebook(shareData);
            analytics.trackShareSuccess({
              mbti_type: mbtiType,
              share_platform: 'facebook',
            });
          }}
          onTwitterShare={() => {
            analytics.trackShareClick({
              mbti_type: mbtiType,
              share_platform: 'twitter',
            });
            shareToTwitter(shareData);
            analytics.trackShareSuccess({
              mbti_type: mbtiType,
              share_platform: 'twitter',
            });
          }}
          onCopyLink={() => {
            copyLinkToClipboard({
              link: shareData.url,
              onCopy: () => {
                toast.success('링크가 복사되었습니다!');
                analytics.trackLinkCopy(mbtiType);
              },
            });
          }}
        />
      </div>
    </>
  );
}
