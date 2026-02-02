import { GoogleAnalytics } from '@next/third-parties/google';
import AdSenseScript from './AdSenseScript';
import ClarityScript from './ClarityScript';
import KakaoScript from './KakaoScript';

export default function ThirdPartyScripts() {
  return (
    <>
      <KakaoScript />
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
      <AdSenseScript />
      <ClarityScript />
    </>
  );
}