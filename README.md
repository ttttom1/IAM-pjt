<<<<<<< HEAD
# I AM — 자바 백엔드, 나는 이 순서로 봤다

SSAFY "I AM" 개인 프로젝트. 자바 백엔드 학습 자료를 **읽어야 할 순서와 시점** 기준으로 큐레이션한 단일 페이지.

추천 목록은 검색하면 나온다. 이 페이지의 차별점은 "언제 봐야 하는지"와 "시간을 버린 곳"이라는 판단이다.

## 구성

- **Request Path** — 요청이 지나가는 경로(HTTP → JPA → DB → Redis → Docker → Kafka → System Design → AI)를 그대로 그린 흐름도. 단계를 누르면 아래 자료가 그 구간으로 필터된다.
- **Resources** — 단계 · 유형 · 시점으로 거르는 카드. 강의 · 책 · 문서 · 유튜브 · 참고 레포 41개.
- **Traps** — 시간을 낭비한 것들.
- **How to learn** — 자료보다 중요한 학습 방식 제안.
- **Feedback** — 방문자가 남기는 좌우 스크롤 카드 (localStorage 저장).

## 기술

프레임워크 · 빌드 도구 없이 순수 HTML + CSS + Vanilla JS.
디자인 토큰은 therapist-community 프로젝트(React/shadcn)에서 순수 CSS로 이식.

### 심화 요구사항

- 반응형 (모바일 대응)
- 다크 / 라이트 모드 토글
- 상단 스크롤 진행률 바
- `IntersectionObserver` 스크롤 진입 애니메이션
- 흐름도 ↔ 필터 ↔ 카드 상태 동기화
- `prefers-reduced-motion` 대응

## 실행

별도 빌드 없이 `index.html`을 브라우저에서 열면 된다.

```
i-am/
├── index.html
├── css/
│   ├── theme.css        # 디자인 토큰 (색 · radius · 타이포)
│   └── components.css    # 컴포넌트 스타일
└── js/
    ├── data.js           # 콘텐츠 (자료 · traps · advice)
    └── main.js           # 렌더링 · 필터 · 모달 · 피드백
```
=======
# IAM-pjt
>>>>>>> fec00dc8a100bf1c830cec27921161e839a79618
