import Link from 'next/link';

const CONTACT_EMAIL = 'team.coply@gmail.com';
const LAST_UPDATED = '2026년 2월 6일';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-(--color-bg) px-4 py-10">
      <main className="w-full max-w-md">
        {/* 헤더 */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-sm text-(--color-text-muted) transition-colors hover:text-(--color-text-secondary)"
          >
            ← 홈
          </Link>
        </div>

        <h1 className="text-chocolate mb-1 text-xl font-bold">
          개인정보 처리방침
        </h1>
        <p className="text-muted mb-6 text-xs">마지막 수정일: {LAST_UPDATED}</p>

        {/* 섹션 */}
        <section className="mb-6">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            1. 개인정보 수집 및 이용 목적
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            두쫀쿠 유형 테스트는 사용자의 개인정보를 적극적으로 수집하지
            않습니다. 서비스 운영, 트래픽 분석, 이용자 경험 개선을 위해 아래와
            같은 비개인식별 정보가 자동으로 수집될 수 있습니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            2. 수집되는 정보의 종류
          </h2>
          <ul className="text-muted list-inside list-disc space-y-1 text-sm leading-relaxed">
            <li>방문 페이지, 체류 시간 등 사용 패턴 정보</li>
            <li>브라우저 종류, 운영체제 등 기기 정보</li>
            <li>쿠키 및 유사 추적 기술로 생성된 식별자</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            3. 쿠키 사용
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            이 서비스는 쿠키와 유사한 기술을 사용합니다. 쿠키는 방문자의 경험을
            개선하고 트래픽을 분석하는 데 사용됩니다. 해당 쿠키는 제3자 서비스에
            의해 설정될 수 있으며, 각 서비스의 개인정보 정책을 참고하세요.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            4. 제3자 서비스
          </h2>
          <p className="text-muted mb-2 text-sm leading-relaxed">
            이 서비스는 다음과 같은 제3자 플랫폼을 사용하며, 각 플랫폼은
            독립적인 개인정보 처리방침을 가지고 있습니다.
          </p>
          <ul className="text-muted space-y-2 text-sm leading-relaxed">
            <li>
              <span className="text-chocolate font-semibold">
                Google Analytics
              </span>{' '}
              — 사이트 방문자 수, 페이지 조회 등 트래픽 분석에 사용됩니다.
            </li>
            <li>
              <span className="text-chocolate font-semibold">
                Microsoft Clarity
              </span>{' '}
              — 사용자 행동 패턴(클릭, 스크롤 등) 분석을 위한 세션 기록
              서비스입니다.
            </li>
            <li>
              <span className="text-chocolate font-semibold">
                Google AdSense
              </span>{' '}
              — 결과 페이지에 광고를 표시하는 데 사용됩니다. Google은 광고
              타겟팅을 위해 쿠키를 활용할 수 있습니다.
            </li>
            <li>
              <span className="text-chocolate font-semibold">
                카카오톡 공유 API
              </span>{' '}
              — 결과를 카카오톡으로 공유할 때 사용됩니다. 공유 시에만 카카오
              서버와 통신됩니다.
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            5. 개인정보 보관 및 폐기
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            수집된 정보는 서비스 운영 및 분석 목적으로만 사용되며, 더 이상
            필요하지 않아 폐기될 수 있습니다. 제3자 서비스에 의한 데이터 보관
            기간은 각 서비스의 정책에 따라 결정됩니다.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            6. 사용자의 권리
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            사용자는 본인의 개인정보에 대한 수집, 이용, 제공 여부를 확인하고,
            해당 정보의 수정 또는 삭제를 요청할 수 있습니다. 아래 연락처로
            문의하시면 안내드리겠습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-chocolate mb-2 text-base font-semibold">
            7. 연락처
          </h2>
          <div className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-muted text-sm leading-relaxed">
              개인정보 처리방침에 대한 궁금한 사항이 있으시면 아래 이메일로
              문의해 주세요.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-chocolate mt-2 inline-block text-sm font-semibold underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>

        {/* 하단 링크 */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-sm text-(--color-text-muted) underline hover:text-(--color-text-secondary)"
          >
            처음으로 돌아가기
          </Link>
        </div>
      </main>
    </div>
  );
}
