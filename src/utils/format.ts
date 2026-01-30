/**
 * 쉼표로 구분된 텍스트에서 뒤의 부분만 추출
 * 예: "입안에서 터지는 영감, 꿈빛 파티시엘 두쫀쿠" → "꿈빛 파티시엘 두쫀쿠"
 */
export const extractTypeNameFromTitle = (title: string): string => {
  const parts = title.split(',');
  return parts.length > 1 ? parts[1].trim() : title;
};

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
export const getTodayDateString = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const date = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
};
