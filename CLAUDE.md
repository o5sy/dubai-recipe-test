# 프로젝트 개요

두쫀쿠 유형 테스트 - Next.js 웹 애플리케이션

## 기술 스택

- **프레임워크**: Next.js (React)
- **언어**: TypeScript
- **패키지 매니저**: pnpm
- **린터/포맷터**: ESLint + Prettier
- **테스트**: 설정 예정

## 명령어

```bash
pnpm install      # 의존성 설치
pnpm dev          # 개발 서버 실행
pnpm build        # 프로덕션 빌드
pnpm lint         # 린트 검사
pnpm format       # 코드 포맷팅
```

## Git 브랜치 전략

- **main**: 기본 브랜치, 릴리즈 버전 코드 형상 관리
- **develop**: 주 개발 브랜치
- **feat/***: 기능 단위 브랜치 (develop에서 분기)

```
main ← develop ← feat/feature-name
```

## 개발 원칙

TDD & Tidy First 원칙 준수 (.claude/plan.md 참고)

- Red → Green → Refactor 사이클
- 구조적 변경과 동작적 변경 분리하여 커밋
- 테스트 통과 후에만 커밋
