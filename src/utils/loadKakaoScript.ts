export const initKakao = () => {
  // @ts-expect-error Kakao SDK는 전역으로 로드됨
  const kakaoScript = window.Kakao;
  if (kakaoScript && !kakaoScript.isInitialized()) {
    // 카카오 JavaScript 앱 키
    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    kakaoScript.init(kakaoAppKey);
    console.log('Kakao SDK initialized');
  }
};
