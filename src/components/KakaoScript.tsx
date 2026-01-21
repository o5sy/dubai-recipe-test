'use client';

import { initKakao } from '@/utils/loadKakaoScript';
import Script from 'next/script';

export default function KakaoScript() {
  const handleLoad = () => {
    console.log('Kakao SDK loaded');
    if (typeof window !== 'undefined') {
      initKakao();
    }
  };

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.9/kakao.min.js"
      integrity="sha384-JpLApTkB8lPskhVMhT+m5Ln8aHlnS0bsIexhaak0jOhAkMYedQoVghPfSpjNi9K1"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={handleLoad}
    />
  );
}
