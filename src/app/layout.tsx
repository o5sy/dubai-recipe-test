import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '두쫀쿠 유형 테스트 | 나와 어울리는 두바이 쫀득 쿠키는?',
  description:
    '당신의 MBTI에 맞는 두바이 쫀득 쿠키 유형을 알아보세요! 나만의 두쫀쿠 유형을 찾아보는 재미있는 테스트',
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
    description: '나와 어울리는 두바이 쫀득 쿠키는?',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
