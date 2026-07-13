/* ============================================
   data.js — 이 파일이 곧 콘텐츠입니다.
   출처: 옵시디언 백엔드_부트캠프_공유_로드맵 + 공유_강의안
   ============================================ */

/**
 * 요청이 지나가는 경로 = 공부 순서.
 * 노트의 핵심 메시지: "요청 하나가 어떤 객체들을 지나가는지 따라가라."
 * 그래서 화면도 요청 경로 그대로 그립니다.
 * 흐름도 노드를 클릭하면 아래 Resources가 그 단계로 필터됩니다.
 */
const STAGES = [
  { id: 'http',   node: 'HTTP',            label: 'HTTP / Spring' },
  { id: 'jpa',    node: 'JPA · Tx',        label: 'JPA / 트랜잭션' },
  { id: 'db',     node: 'RDB',             label: 'DB / 실행계획' },
  { id: 'redis',  node: 'Redis',           label: 'Redis / 캐시' },
  { id: 'infra',  node: 'Linux · Docker',  label: 'Linux / Docker' },
  { id: 'kafka',  node: 'Kafka',           label: 'Kafka / 비동기' },
  { id: 'design', node: 'System Design',   label: '시스템 설계' },
  { id: 'ai',     node: 'AI System',       label: 'AI 활용' },
];

const TYPES = ['강의', '책', '문서', '유튜브', '레포'];
const TIMINGS = ['NOW', 'SOON', 'LATER'];

/**
 * timing:
 *   NOW   — 부트캠프 시작 시점에 바로
 *   SOON  — 기초가 잡히고, 프로젝트에서 문제를 만난 뒤
 *   LATER — 프로젝트를 한 번 굴려보고, 규모/장애를 상상하게 됐을 때
 */
const RESOURCES = [
  /* ---------- 1단계 HTTP / Spring ---------- */
  {
    id: 1, title: '모든 개발자를 위한 HTTP 웹 기본 지식', author: '김영한',
    type: '강의', stage: 'http', timing: 'NOW', cost: '유료',
    takeaway: 'Controller 코드를 이해하려면 요청/응답 구조가 먼저다.',
    forWhom: '스프링을 처음 켜기 직전인 사람',
    warning: 'Spring부터 보고 싶겠지만, 이걸 건너뛰면 어노테이션이 전부 마법으로 보인다.',
    url: '',
  },
  {
    id: 2, title: '스프링 입문 — 코드로 배우는 스프링 부트', author: '김영한',
    type: '강의', stage: 'http', timing: 'NOW', cost: '무료',
    takeaway: '무료인데 스프링 기본이 거의 다 들어있다. 유명한 데는 이유가 있다. 여기부터 시작.',
    forWhom: '자바 문법이 손에 붙은 사람',
    warning: '기능을 다 알려고 하지 말 것. 흐름 하나만 따라가면 된다.',
    url: '',
  },
  {
    id: 3, title: '스프링 핵심 원리 — 기본편', author: '김영한',
    type: '강의', stage: 'http', timing: 'SOON', cost: '유료',
    takeaway: 'DI와 Bean을 "마법"이 아니라 객체 생성·연결 방식으로 설명하게 된다.',
    forWhom: '입문을 끝내고 @Transactional·AOP가 궁금해진 사람',
    warning: 'Bean과 proxy 감각이 없으면 나중에 트랜잭션·시큐리티에서 막힌다.',
    url: '',
  },

  /* ---------- 2단계 JPA / 트랜잭션 ---------- */
  {
    id: 4, title: '자바 ORM 표준 JPA 프로그래밍 — 기본편', author: '김영한',
    type: '강의', stage: 'jpa', timing: 'SOON', cost: '유료',
    takeaway: 'JPA는 SQL을 없애는 도구가 아니라, 객체 상태와 DB row를 맞추는 도구다.',
    forWhom: '엔티티를 저장/조회하기 시작한 사람',
    warning: '영속성 컨텍스트를 건너뛰고 CRUD만 외우면 N+1에서 반드시 막힌다.',
    url: '',
  },
  {
    id: 5, title: '자바 ORM 표준 JPA 프로그래밍 (책)', author: '김영한',
    type: '책', stage: 'jpa', timing: 'SOON', cost: '유료',
    takeaway: '영속성 컨텍스트·flush·dirty checking을 글로 다시 눌러 담는 용도.',
    forWhom: '강의를 봤는데 개념이 손에 안 남는 사람',
    warning: '처음부터 완독하려 들면 지친다. 강의 본 챕터만 찾아 읽는 게 낫다.',
    url: '',
  },
  {
    id: 6, title: '스프링 부트와 JPA 활용 2 — API 개발과 성능 최적화', author: '김영한',
    type: '강의', stage: 'jpa', timing: 'LATER', cost: '유료',
    takeaway: 'N+1을 재현하고, fetch join·DTO 조회로 줄이는 걸 손으로 해본다.',
    forWhom: '이미 조회 API를 만들어보고 느려본 사람',
    warning: '문제를 겪기 전에 보면 "왜 이렇게까지?" 싶어 안 남는다. 겪고 나서 봐라.',
    url: '',
  },

  /* ---------- 3단계 DB / 실행계획 ---------- */
  {
    id: 7, title: 'Real MySQL 8.0', author: '백은빈 · 이성욱',
    type: '책', stage: 'db', timing: 'LATER', cost: '유료',
    takeaway: '인덱스가 왜 빠른지, 실행계획에서 scan·rows·cost를 읽는 눈이 생긴다.',
    forWhom: '"빨라졌다" 대신 "어느 쿼리가 어떻게 바뀌었다"를 말하고 싶은 사람',
    warning: '벽돌책이다. 처음부터 완독 금지. 실행계획·인덱스 장부터 발췌해서 봐라.',
    url: '',
  },

  /* ---------- 4단계 Redis ---------- */
  {
    id: 8, title: '개발자를 위한 레디스', author: '',
    type: '책', stage: 'redis', timing: 'SOON', cost: '유료',
    takeaway: 'cache-aside·TTL·무효화를 언제 쓰고 언제 위험한지 구분하게 된다.',
    forWhom: 'DB 조회를 줄이고 싶어 캐시를 떠올린 사람',
    warning: '빠르다는 이유로 source of truth로 쓰면 안 된다. 이 경계를 먼저 잡아라.',
    url: '',
  },

  /* ---------- 5단계 Linux / Docker ---------- */
  {
    id: 9, title: '만화로 배우는 리눅스 시스템 관리·명령어', author: '',
    type: '책', stage: 'infra', timing: 'SOON', cost: '유료',
    takeaway: '서버에서 프로세스·포트·로그·메모리·권한을 확인하는 손이 생긴다.',
    forWhom: '"서버가 이상해요"에서 벗어나고 싶은 사람',
    warning: '가볍게 시작하기 좋지만, 여기서 멈추지 말고 Docker kernel로 넘어가야 한다.',
    url: '',
  },

  /* ---------- 6단계 Kafka / 비동기 ---------- */
  {
    id: 10, title: '아파치 카프카 애플리케이션 프로그래밍', author: '권철민',
    type: '강의', stage: 'kafka', timing: 'LATER', cost: '유료',
    takeaway: 'partition·consumer group·offset·순서·재시도·DLQ를 손으로 만진다.',
    forWhom: 'Outbox 패턴을 먼저 이해한 사람',
    warning: '"멋진 대규모 기술"로 접근하면 안 남는다. 재시도·중복 문제로 접근해라.',
    url: '',
  },
  {
    id: 11, title: 'Confluent Kafka 101', author: 'Confluent',
    type: '문서', stage: 'kafka', timing: 'LATER', cost: '무료',
    takeaway: '카프카 핵심 개념을 공식 자료로 짧게 정리하는 용도.',
    forWhom: '강의 전에 큰 그림만 빠르게 훑고 싶은 사람',
    warning: '',
    url: '',
  },

  /* ---------- 7단계 시스템 설계 ---------- */
  {
    id: 12, title: '가상 면접 사례로 배우는 대규모 시스템 설계 기초', author: 'Alex Xu',
    type: '책', stage: 'design', timing: 'LATER', cost: '유료',
    takeaway: '요구사항→추정→데이터·캐시·큐→장애 복구 순서로 말하는 훈련.',
    forWhom: '작은 서비스가 커질 때 어디가 깨지는지 상상하고 싶은 사람',
    warning: '정답 암기용이 아니다. trade-off를 말하는 연습으로 써라.',
    url: '',
  },
  {
    id: 13, title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann',
    type: '책', stage: 'design', timing: 'LATER', cost: '유료',
    takeaway: '데이터가 시스템을 지날 때 무엇이 깨지는지의 원리편.',
    forWhom: '시스템 설계를 개념이 아니라 근거로 말하고 싶은 사람',
    warning: '난이도 높음. 부트캠프 초반에 펴면 좌절한다. 한참 뒤로 미뤄라.',
    url: '',
  },

  /* ---------- 8단계 AI 활용 ---------- */
  {
    id: 14, title: 'lablab.ai 우승작 3개 비교 (활동)', author: '',
    type: '문서', stage: 'ai', timing: 'LATER', cost: '무료',
    takeaway: '"잘 되는 AI 서비스"의 구조를 실제 결과물에서 역으로 뜯어본다.',
    forWhom: 'AI 기능을 프롬프트 이상으로 설계하고 싶은 백엔드 지망',
    warning: 'AI 기능은 프롬프트만의 문제가 아니다 — 검색 품질·비용·latency·검토·eval이 붙는다.',
    url: '',
  },
  {
    id: 15, title: 'eval harness 비교 (OpenAI Evals · LangSmith · lm-eval-harness)', author: '',
    type: '문서', stage: 'ai', timing: 'LATER', cost: '무료',
    takeaway: 'AI 기능도 결국 검증 가능한 상태로 흐르게 만드는 백엔드 문제임을 본다.',
    forWhom: 'AI 답변 품질을 측정하고 싶어진 사람',
    warning: '',
    url: '',
  },

  /* ---------- 참고 코드 레포 (읽으며 배우는 실물) ---------- */
  {
    id: 20, title: 'spring-projects/spring-petclinic', author: 'Spring 공식',
    type: '레포', stage: 'http', timing: 'NOW', cost: '무료',
    takeaway: 'Spring 팀이 직접 관리하는 표준 예제. Controller·Service·Repository 계층이 교과서처럼 깔끔하다.',
    forWhom: '"잘 짠 스프링 프로젝트"의 기준을 한 번 눈에 담고 싶은 사람',
    warning: '따라 치기만 하면 안 남는다. 요청 하나를 골라 계층을 훑어 내려가며 읽어라.',
    url: 'https://github.com/spring-projects/spring-petclinic',
  },
  {
    id: 21, title: 'spring-petclinic/spring-petclinic-rest', author: 'Spring 커뮤니티',
    type: '레포', stage: 'http', timing: 'SOON', cost: '무료',
    takeaway: '같은 도메인의 REST + Swagger 버전. API를 어떻게 설계하고 문서화하는지 대조해 볼 수 있다.',
    forWhom: 'petclinic 기본형을 본 뒤 REST 설계를 비교하고 싶은 사람',
    warning: '',
    url: 'https://github.com/spring-petclinic/spring-petclinic-rest',
  },
  {
    id: 22, title: 'boostcampwm2025/web30-TADAK', author: '네이버 부스트캠프',
    type: '레포', stage: 'redis', timing: 'LATER', cost: '무료',
    takeaway: '실시간 알고리즘 배틀. Judge Server, 격리 Runner, Redis Pub/Sub, 세션 오케스트레이션이 실물로 있다.',
    forWhom: 'Redis를 캐시 너머 (pub/sub·세션)로 쓰는 실제 코드를 보고 싶은 사람',
    warning: '규모가 크다. 처음엔 전체를 이해하려 말고 Redis 사용처만 따라가라.',
    url: 'https://github.com/boostcampwm2025/web30-TADAK',
  },
  {
    id: 23, title: 'boostcampwm2025/web10-beastcamp', author: '네이버 부스트캠프',
    type: '레포', stage: 'design', timing: 'LATER', cost: '무료',
    takeaway: '티켓팅 시뮬레이션. API/티켓/대기열 서버 분리, Redis Lua atomic reservation, 큐 워커.',
    forWhom: '트래픽 몰림·대기열 설계를 코드로 보고 싶은 사람',
    warning: '시스템 설계 책을 먼저 훑고 오면 훨씬 잘 읽힌다.',
    url: 'https://github.com/boostcampwm2025/web10-beastcamp',
  },
  {
    id: 24, title: 'SKALA-TEAM5/backend', author: 'SKALA (SK 부트캠프)',
    type: '레포', stage: 'ai', timing: 'LATER', cost: '무료',
    takeaway: '부트캠프 팀 프로젝트 실물. AI 에이전트 로그·상태 관리가 들어간 Spring 백엔드.',
    forWhom: '"내 또래가 부트캠프에서 어디까지 짜는가"를 가늠하고 싶은 사람',
    warning: '완성도는 팀마다 다르다. 정답이 아니라 동료의 수준으로 보고 참고만 해라.',
    url: 'https://github.com/SKALA-TEAM5/backend',
  },

  /* ---------- 인프런 로드맵 이어지는 강의 ---------- */
  {
    id: 30, title: '스프링 MVC 1·2편 — 백엔드 웹 개발 기술', author: '김영한',
    type: '강의', stage: 'http', timing: 'SOON', cost: '유료',
    takeaway: '서블릿부터 MVC 패턴이 왜 나왔는지 손으로 만들며 이해한다. 빠르게 훑어도 된다.',
    forWhom: '입문·기본을 끝내고 웹 계층을 제대로 보고 싶은 사람',
    warning: '분량이 많다. 처음엔 1편 위주로 빠르게, 2편은 필요할 때 발췌.',
    url: '',
  },
  {
    id: 31, title: '스프링 DB 1·2편 — 데이터 접근 핵심 원리', author: '김영한',
    type: '강의', stage: 'jpa', timing: 'SOON', cost: '유료',
    takeaway: '트랜잭션·커넥션·예외 추상화가 JPA 밑에서 뭘 하는지 보인다. 빠르게 통과.',
    forWhom: 'JPA로 서비스를 한 번 만들어본 뒤 밑단이 궁금해진 사람',
    warning: '',
    url: '',
  },
  {
    id: 32, title: '스프링 핵심 원리 — 고급편', author: '김영한',
    type: '강의', stage: 'jpa', timing: 'LATER', cost: '유료',
    takeaway: 'AOP·프록시가 어떻게 @Transactional을 굴리는지 바닥까지 판다.',
    forWhom: '@Transactional의 동작을 말로 설명하고 싶어진 사람',
    warning: '기본편 프록시 개념 없이 오면 어렵다. 순서를 지켜라.',
    url: '',
  },
  {
    id: 33, title: '스프링 부트 — 핵심 원리와 활용', author: '김영한',
    type: '강의', stage: 'infra', timing: 'LATER', cost: '유료',
    takeaway: '자동 설정·내장 톰캣·액추에이터 등 "부트가 대신 해주던 것"의 정체를 본다.',
    forWhom: '스프링에 익숙해진 뒤 배포·운영 감각을 붙이려는 사람',
    warning: '',
    url: '',
  },
  {
    id: 34, title: '스프링 시큐리티 (입문·실전)', author: '',
    type: '강의', stage: 'http', timing: 'LATER', cost: '유료',
    takeaway: '인증·인가 필터 체인이 어떻게 요청을 가로채는지. JWT·세션 선택의 근거가 생긴다.',
    forWhom: '로그인·권한을 직접 붙여야 하는 프로젝트를 만난 사람',
    warning: '시큐리티는 프록시·필터 감각이 없으면 통째로 마법처럼 보인다. 스프링 원리 뒤에.',
    url: '',
  },
  {
    id: 35, title: '카프카 완벽 가이드 (코어·커넥트·스트림즈)', author: '권철민',
    type: '강의', stage: 'kafka', timing: 'LATER', cost: '유료',
    takeaway: '카프카를 개념이 아니라 실습으로 끝까지 판다. 권철민 강의는 깊이로 정평.',
    forWhom: '카프카를 제대로 파보기로 마음먹은 사람',
    warning: '입문용은 아니다. Outbox·비동기 문제를 먼저 겪고 와라.',
    url: '',
  },
  {
    id: 36, title: '백기선 강의·유튜브 (JPA·테스트·자바)', author: '백기선',
    type: '강의', stage: 'jpa', timing: 'LATER', cost: '유료',
    takeaway: '자바·JPA·테스트를 원리부터 짚는다. 김영한과 다른 관점으로 교차 검증용.',
    forWhom: '한 강사에 갇히지 않고 시야를 넓히고 싶은 사람',
    warning: '',
    url: '',
  },
  {
    id: 37, title: 'BradKim (김재원) 강의', author: 'BradKim',
    type: '강의', stage: 'http', timing: 'SOON', cost: '유료',
    takeaway: '라이트하게 빠르게 듣기 좋다. 큰 그림을 가볍게 훑을 때.',
    forWhom: '무거운 강의 전에 개념을 빠르게 얹고 싶은 사람',
    warning: '',
    url: '',
  },

  /* ---------- 유튜브 · 백엔드 ---------- */
  {
    id: 40, title: '개발바닥 (향로·호돌맨)', author: '이동욱 · 이주현',
    type: '유튜브', stage: 'design', timing: 'NOW', cost: '무료',
    takeaway: '현업 커리어·문화·성장 토크. 기술보다 "개발자로 어떻게 살아남나"를 먼저 알려준다.',
    forWhom: '방향을 잡고 싶은 부트캠프 시작 시점의 사람',
    warning: '기술 강의는 아니다. 동기부여·커리어 감각용으로 봐라.',
    url: 'https://www.youtube.com/@devbadak',
  },
  {
    id: 41, title: '토비의 봄 TV (토비)', author: '이일민',
    type: '유튜브', stage: 'jpa', timing: 'LATER', cost: '무료',
    takeaway: '스프링·객체지향의 원리를 가장 깊게 파는 채널. IoC·트랜잭션·리액티브까지.',
    forWhom: '"왜 이렇게 동작하는가"를 끝까지 알고 싶은 사람',
    warning: '깊고 어렵다. 기본기 없이 보면 튕긴다. 개념이 쌓인 뒤에.',
    url: '',
  },
  {
    id: 42, title: '우아한Tech (우아한형제들)', author: '우아한형제들',
    type: '유튜브', stage: 'design', timing: 'LATER', cost: '무료',
    takeaway: '실무 기술 세미나·테크톡. 실제 서비스에서 나온 문제와 해법을 본다.',
    forWhom: '현업이 어떤 문제를 어떻게 푸는지 궁금한 사람',
    warning: '',
    url: '',
  },
  {
    id: 43, title: '조코딩 (JoCoding)', author: '조동근',
    type: '유튜브', stage: 'http', timing: 'NOW', cost: '무료',
    takeaway: '빠르게 뭔가 만들어보는 실습형. 흥미를 붙이고 완성의 재미를 먼저 맛본다.',
    forWhom: '이론에 지치기 전에 결과물을 보고 싶은 사람',
    warning: '깊이보다 속도다. 개념 정리는 정식 강의로 따로.',
    url: '',
  },
  {
    id: 44, title: '얄팍한 코딩사전 (얄코)', author: '',
    type: '유튜브', stage: 'db', timing: 'SOON', cost: '무료',
    takeaway: 'Git·SQL·네트워크 같은 기반 개념을 짧고 명확하게. 애매하게 아는 걸 정리할 때.',
    forWhom: '기초 개념의 구멍을 빠르게 메우고 싶은 사람',
    warning: '',
    url: '',
  },
  {
    id: 45, title: '널널한 개발자 (널널)', author: '',
    type: '유튜브', stage: 'infra', timing: 'SOON', cost: '무료',
    takeaway: '네트워크·OS·컴퓨터 구조 같은 CS 기반을 편하게 풀어준다.',
    forWhom: 'CS 기초가 약해서 서버 얘기가 겉도는 사람',
    warning: '',
    url: '',
  },

  /* ---------- 유튜브 · AI ---------- */
  {
    id: 50, title: '노정석 (AI·스타트업)', author: '노정석',
    type: '유튜브', stage: 'ai', timing: 'LATER', cost: '무료',
    takeaway: 'AI 시대 제품·창업 관점. 기술 위에서 "무엇을 만들 것인가"를 보게 한다.',
    forWhom: 'AI를 기능이 아니라 제품으로 생각하고 싶은 사람',
    warning: '',
    url: '',
  },
  {
    id: 51, title: 'bridgemind (브릿지마인드)', author: '',
    type: '유튜브', stage: 'ai', timing: 'SOON', cost: '무료',
    takeaway: 'AI·머신러닝 개념을 시각적으로 풀어준다. 배경 지식을 빠르게 얹는 용도.',
    forWhom: 'AI 개념이 아직 뿌옇게 느껴지는 사람',
    warning: '',
    url: '',
  },

  /* ---------- 키워드 (검색해서 직접 파는 주제) ---------- */
  {
    id: 60, title: 'TDD — 테스트 주도 개발', author: '키워드',
    type: '문서', stage: 'jpa', timing: 'SOON', cost: '무료',
    takeaway: '테스트를 먼저 쓰면 설계가 바뀐다. 프로젝트 초반에 습관으로 들이는 게 가장 싸다.',
    forWhom: '"나중에 테스트 붙이지 뭐" 하다 매번 못 붙이는 사람',
    warning: '완벽한 TDD보다, 핵심 로직에 테스트 하나 붙이는 것부터.',
    url: '',
  },
  {
    id: 61, title: 'k6 · JMeter — 부하 테스트', author: '키워드',
    type: '문서', stage: 'design', timing: 'LATER', cost: '무료',
    takeaway: '"느려졌다" 대신 "몇 명일 때 몇 ms"를 숫자로 말하게 해준다.',
    forWhom: '성능 개선을 감이 아니라 근거로 말하고 싶은 사람',
    warning: '측정 없는 최적화는 추측이다. 먼저 재라.',
    url: '',
  },
  {
    id: 62, title: 'DDD — 도메인 주도 설계', author: '키워드',
    type: '문서', stage: 'design', timing: 'LATER', cost: '무료',
    takeaway: '코드를 기술이 아니라 도메인 언어로 나누는 법. 서비스가 커질 때 무너지지 않게.',
    forWhom: '엔티티·서비스가 뒤엉키기 시작한 사람',
    warning: '작은 프로젝트에 과하게 넣으면 오히려 복잡해진다. 필요를 느낀 뒤에.',
    url: '',
  },
  {
    id: 63, title: 'MSA — 마이크로서비스', author: '키워드',
    type: '문서', stage: 'design', timing: 'LATER', cost: '무료',
    takeaway: '서비스를 쪼갤 때 생기는 이득과 비용(분산 트랜잭션·통신·운영)을 안다.',
    forWhom: '모놀리식을 충분히 겪고 한계를 느낀 사람',
    warning: '모놀리식도 안 해봤다면 아직 이르다. MSA는 대부분 과설계다.',
    url: '',
  },
  {
    id: 64, title: 'JVM — 동작 원리와 GC', author: '키워드',
    type: '문서', stage: 'infra', timing: 'LATER', cost: '무료',
    takeaway: '메모리 구조·GC·클래스 로딩을 알면 OOM·성능 문제를 원인부터 짚는다.',
    forWhom: '자바가 서버에서 왜 이렇게 도는지 궁금해진 사람',
    warning: '면접 단골이지만, 코드 한 줄 못 짜면서 GC부터 외우는 건 순서가 틀렸다.',
    url: '',
  },
];

/** 시간을 낭비한 것들. 이 페이지에서 제일 강한 섹션. */
const TRAPS = [
  {
    title: '기술 이름부터 모으기',
    detail: 'Kafka·Redis·k8s를 초반에 리스트로 모았지만, 문제를 안 겪어서 하나도 안 남았다. 순서가 먼저다.',
  },
  {
    title: '벽돌책 1페이지부터 완독',
    detail: 'Real MySQL·DDIA를 앞에서부터 읽다가 지쳐서 덮었다. 필요한 장만 발췌해 읽는 게 훨씬 오래 간다.',
  },
  {
    title: '@Transactional 붙이면 끝이라는 착각',
    detail: 'S3 copy 성공 후 DB insert 실패처럼, 외부 시스템은 트랜잭션에 안 묶인다. 이걸 늦게 알았다.',
  },
  {
    title: '성능 최적화 강의를 문제 없이 보기',
    detail: 'N+1을 겪기 전에 활용2를 봐서 안 남았다. 느려본 다음에 봐야 몸에 붙는다.',
  },
];

/** 자료보다 중요한, 공부하는 방식에 대한 제안 (선택). */
const ADVICE = [
  {
    title: '프로젝트는 작게 잡아라',
    detail: '도메인이 적고 화면 수가 많지 않은 걸 골라라. 핫딜 상품 결제 상황, 수상 구조 AI 에이전트처럼 좁고 깊은 주제가 성장이 빠르다. 넓히면 관리에 시간을 다 뺏긴다.',
  },
  {
    title: '자바 문법은 빠르게 띄우고 넘어가라',
    detail: '늦어도 2주 안에 훑고 스프링으로 넘어가라. 문법을 완벽히 끝내고 시작하려 하면 시작을 못 한다. 나머지는 프로젝트하며 찾아보고 책 보며 채운다.',
  },
  {
    title: '만들면서 흥미로 끌고 가라',
    detail: 'SSE든 Redis든 Kafka든, 작은 클라이언트를 붙여 직접 연결해보는 게 강의 완주보다 오래 남는다. 재미를 느끼는 지점을 따라가라.',
  },
  {
    title: 'AI는 많이 써보는 게 공부다',
    detail: '국내외 공모전·기업 과제테스트를 풀고, 수상작 코드와 오픈소스를 뜯어봐라. AI와 함께 모르는 걸 그때그때 찾는 습관이 핵심이다.',
  },
];
