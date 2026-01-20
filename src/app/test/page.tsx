export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <main className="flex w-full max-w-md flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-[var(--color-chocolate)]">
          테스트 페이지
        </h1>
        <p className="mt-4 text-[var(--color-text-secondary)]">
          T4에서 질문 UI가 구현될 예정입니다
        </p>
      </main>
    </div>
  );
}