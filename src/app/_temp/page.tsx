import CitizenCard from '@/components/result/CitizenCard';
import { getCharacterImagePathByMbtiType } from '@/utils/getImagePath';

export default function TempPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <CitizenCard
        name="승욘"
        regDate="2026.01.24"
        siteUrl="www.dujjonku.fun"
        type="은은한 장인형 두쫀쿠"
        imageUrl={getCharacterImagePathByMbtiType('ISTJ')}
        traits={[
          '성실하고 책임감이 강함',
          '논리적이고 분석적인 사고방식',
          '전통과 규칙을 중시함',
        ]}
      />
    </div>
  );
}
