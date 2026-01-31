export const initKakao = () => {
  const kakaoScript = window.Kakao;
  if (kakaoScript && !kakaoScript.isInitialized()) {
    // 카카오 JavaScript 앱 키
    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    kakaoScript.init(kakaoAppKey);
    console.log('Kakao SDK initialized');
  }
};
