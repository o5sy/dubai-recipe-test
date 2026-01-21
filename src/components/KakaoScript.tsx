'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function KakaoScript() {
  useEffect(() => {
    // 카카오 SDK 초기화
    const initKakao = () => {
      // @ts-expect-error Kakao SDK는 전역으로 로드됨
      if (window.Kakao && !window.Kakao.isInitialized()) {
        // 카카오 JavaScript 앱 키 (환경 변수 또는 기본값 사용)
        const kakaoAppKey =
          process.env.NEXT_PUBLIC_KAKAO_APP_KEY || 'YOUR_KAKAO_APP_KEY';
        // @ts-expect-error Kakao SDK는 전역으로 로드됨
        window.Kakao.init(kakaoAppKey);
        console.log('Kakao SDK initialized');
      }
    };

    // SDK 로드 완료 후 초기화
    if (typeof window !== 'undefined') {
      initKakao();
    }
  }, []);

  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
      integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Kakao SDK loaded');
      }}
    />
  );
}
