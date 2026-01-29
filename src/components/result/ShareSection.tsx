'use client';

import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';
import {
  copyLinkToClipboard,
  shareGeneral,
  shareToFacebook,
  shareToKakao,
  shareToTwitter,
} from '@/utils/shareUtils';
import GeneralShareButton from './GeneralShareButton';
import SaveImageButton from './SaveImageButton';
import SNSShareButtons from './SNSShareButtons';

interface ShareSectionProps {
  resultType: string;
  resultName: string;
}

export default function ShareSection({
  resultType,
  resultName,
}: ShareSectionProps) {
  const shareData = {
    url: typeof window !== 'undefined' ? window.location.href : '',
    title: `나는 어떤 두쫀쿠일까? 🍪`,
    description: `나는 ${resultName}!`,
  };

  const imageUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${getCharacterImagePathByMbtiType(resultType)}`
      : '';

  return (
    <>
      {/* 버튼 영역 */}
      <div className="mb-8 flex w-full gap-3">
        <GeneralShareButton
          url={shareData.url}
          title={shareData.title}
          description={shareData.description}
        />
        <SaveImageButton />
      </div>

      <div className="mb-8 w-full">
        <p className="mb-4 text-center text-sm font-medium text-secondary">
          친구에게 공유하기
        </p>

        {/* SNS 공유 섹션 */}
        <SNSShareButtons
          onKakaoShare={() => shareToKakao({ ...shareData, imageUrl })}
          onInstagramShare={() => shareGeneral(shareData)}
          onFacebookShare={() => shareToFacebook(shareData)}
          onTwitterShare={() => shareToTwitter(shareData)}
          onCopyLink={() =>
            copyLinkToClipboard({
              link: shareData.url,
              onCopy: () => {
                // TODO: 토스트로 변경하기
                alert('링크가 복사되었습니다!');
              },
            })
          }
        />
      </div>
    </>
  );
}
