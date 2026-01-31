import KakaoScript from '@/components/KakaoScript';
import { Toaster } from '@/components/ui/toaster';
import { SERVICE_URL } from '@/constants/app';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '두쫀쿠 유형 테스트 | 내가 만약 두쫀쿠라면?',
  description:
    '당신과 똑닮은 두바이 쫀득 쿠키 유형을 알아보세요! 나만의 두쫀쿠 유형을 찾아보는 재미있는 테스트',
  keywords: [
    '두쫀쿠',
    '두바이 쫀득 쿠키',
    '두바이 초콜릿',
    'MBTI',
    '유형 테스트',
    '성격 테스트',
  ],
  openGraph: {
    title: '두쫀쿠 유형 테스트',
    description: '내가 만약 두쫀쿠라면 어떤 유형일까?',
    type: 'website',
    images: [
      {
        url: `${SERVICE_URL}/img/characters/default.png`,
      },
    ],
  },
  other: {
    'google-adsense-account': 'ca-pub-5479939835330556',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>
        <KakaoScript />
        {children}
        <Toaster />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
