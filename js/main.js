/* ============================================
   main.js — 프레임워크 없음. 이게 요구사항입니다.
   ============================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

/* --------------------------------------------
   1. 다크모드 토글
   원본의 .dark 변수 세트를 그대로 씁니다.
-------------------------------------------- */
function initTheme() {
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) document.documentElement.classList.add('dark');

  $('#theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
}

/* --------------------------------------------
   2. 스크롤 진행률 바
-------------------------------------------- */
function initProgress() {
  const bar = $('#progress');
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

/* --------------------------------------------
   3. FilterChips — 드래그 가로 스크롤
   원본 FilterChips.tsx 의 dragRef 로직 이식.
   5px 넘게 끌었으면 클릭으로 치지 않습니다.
-------------------------------------------- */
function initDragScroll(el) {
  let isDown = false;
  let dragged = false;
  let startX = 0;
  let startScroll = 0;

  el.addEventListener('mousedown', (e) => {
    isDown = true;
    dragged = false;
    startX = e.pageX;
    startScroll = el.scrollLeft;
    el.classList.add('is-dragging');
  });

  el.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = e.pageX - startX;
    if (Math.abs(walk) > 5) dragged = true;
    el.scrollLeft = startScroll - walk;
  });

  const stop = () => {
    isDown = false;
    el.classList.remove('is-dragging');
  };
  el.addEventListener('mouseup', stop);
  el.addEventListener('mouseleave', stop);

  return () => dragged;
}

/* --------------------------------------------
   4. 필터 상태 + 렌더링
-------------------------------------------- */
const filters = { stage: '', type: '', timing: '' };

function matches(r) {
  return (
    (!filters.stage || r.stage === filters.stage) &&
    (!filters.type || r.type === filters.type) &&
    (!filters.timing || r.timing === filters.timing)
  );
}

function cardHTML(r) {
  return `
    <button class="card" data-id="${r.id}">
      <div class="card__top">
        <span class="card__type">${r.type}</span>
        <span class="badge badge--${r.timing.toLowerCase()}">${r.timing}</span>
      </div>
      <h3 class="card__title">${r.title}</h3>
      <p class="card__author">${r.author}${r.cost ? ` · ${r.cost}` : ''}</p>
      <p class="card__takeaway">${r.takeaway}</p>
    </button>`;
}

function render() {
  const list = RESOURCES.filter(matches);
  const grid = $('#grid');

  grid.innerHTML = list.length
    ? list.map(cardHTML).join('')
    : `<p class="empty">조건에 맞는 자료가 없습니다. 필터를 풀어보세요.</p>`;

  $('#count').textContent = `${list.length}개`;
}

/* --------------------------------------------
   5. 칩 그룹 만들기
-------------------------------------------- */
function buildChipGroup(containerId, key, options) {
  const el = $(containerId);
  const wasDragged = initDragScroll(el);

  const items = [{ value: '', label: '전체' }, ...options];
  el.innerHTML = items
    .map(
      (o) => `<button class="chip" role="button"
        aria-pressed="${o.value === ''}"
        data-value="${o.value}">${o.label}</button>`
    )
    .join('');

  el.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip || wasDragged()) return;
    setFilter(key, chip.dataset.value);
  });
}

/* 칩 그룹의 선택 표시를 현재 필터에 맞춥니다 */
function syncChipGroup(containerId, key) {
  $(containerId)
    .querySelectorAll('.chip')
    .forEach((c) =>
      c.setAttribute('aria-pressed', String(c.dataset.value === filters[key]))
    );
}

/* 필터를 한 곳에서만 바꿉니다 → 흐름도·칩·카드가 항상 같은 상태 */
function setFilter(key, value) {
  // 같은 값을 다시 누르면 해제 (토글)
  filters[key] = filters[key] === value && value !== '' ? '' : value;
  syncChipGroup('#chips-stage', 'stage');
  syncChipGroup('#chips-type', 'type');
  syncChipGroup('#chips-timing', 'timing');
  syncFlow();
  render();
}

/* --------------------------------------------
   6. 요청 흐름도 — signature
   노드 = STAGES. 클릭하면 stage 필터가 걸립니다.
-------------------------------------------- */
function buildFlow() {
  const el = $('#flow');
  const nodes = STAGES.map(
    (s) => `
    <button class="flow__node" data-stage="${s.id}" aria-pressed="false">
      <span class="flow__name">${s.node}</span>
      <span class="flow__desc">${s.label}</span>
    </button>`
  ).join('<div class="flow__link" aria-hidden="true"></div>');

  el.innerHTML = nodes +
    `<button class="flow__reset" id="flow-reset" hidden>← 전체 자료 보기</button>`;

  el.addEventListener('click', (e) => {
    const node = e.target.closest('.flow__node');
    if (node) {
      setFilter('stage', node.dataset.stage);
      $('#flow-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (e.target.closest('#flow-reset')) setFilter('stage', '');
  });
}

/* 흐름도 노드 강조 + reset 버튼 표시를 현재 필터에 맞춥니다 */
function syncFlow() {
  $('#flow')
    .querySelectorAll('.flow__node')
    .forEach((n) =>
      n.setAttribute('aria-pressed', String(n.dataset.stage === filters.stage))
    );
  $('#flow-reset').hidden = filters.stage === '';
}

/* --------------------------------------------
   7. Traps 렌더링
-------------------------------------------- */
function buildTraps() {
  $('#traps').innerHTML = TRAPS.map(
    (t) => `
    <div class="trap">
      <p class="trap__title">${t.title}</p>
      <p class="trap__detail">${t.detail}</p>
    </div>`
  ).join('');
}

/* Advice 렌더링 — 번호가 있는 건 실제 순서 제안이라서 */
function buildAdvice() {
  const el = $('#advice');
  if (!el || typeof ADVICE === 'undefined') return;
  el.innerHTML = ADVICE.map(
    (a, i) => `
    <div class="advice__item">
      <span class="advice__num">${String(i + 1).padStart(2, '0')}</span>
      <div>
        <p class="advice__title">${a.title}</p>
        <p class="advice__detail">${a.detail}</p>
      </div>
    </div>`
  ).join('');
}

/* --------------------------------------------
   8. 모달 — <dialog> 하나로 끝납니다
-------------------------------------------- */
function initModal() {
  const dlg = $('#modal');

  $('#grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;

    const r = RESOURCES.find((x) => x.id === Number(card.dataset.id));
    if (!r) return;

    $('#modal-title').textContent = r.title;
    $('#modal-body').innerHTML = `
      <div class="modal__row">
        <p class="modal__key">얻은 것</p>
        <p class="modal__val">${r.takeaway}</p>
      </div>
      <div class="modal__row">
        <p class="modal__key">누구에게</p>
        <p class="modal__val">${r.forWhom}</p>
      </div>
      <div class="modal__row">
        <p class="modal__key">주의할 점</p>
        <p class="modal__val">${r.warning}</p>
      </div>
      ${r.url ? `<a class="modal__link" href="${r.url}" target="_blank" rel="noopener">보러 가기</a>` : ''}
    `;
    dlg.showModal();
  });

  $('#modal-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close();
  });
}

/* --------------------------------------------
   9. 스크롤 진입 애니메이션
-------------------------------------------- */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = 'none';
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  $$('.section').forEach((s) => {
    s.style.opacity = 0;
    s.style.transform = 'translateY(16px)';
    s.style.transition = 'opacity .5s ease, transform .5s ease';
    io.observe(s);
  });
}

/* --------------------------------------------
   10. 피드백 — localStorage 기반, 좌우 스크롤 카드
   방문자가 남긴 글은 이 브라우저에 저장됩니다.
-------------------------------------------- */
const FB_KEY = 'iam_feedback_v1';

function fbLoad() {
  try {
    return JSON.parse(localStorage.getItem(FB_KEY)) || [];
  } catch {
    return [];
  }
}

function fbSave(list) {
  try {
    localStorage.setItem(FB_KEY, JSON.stringify(list));
  } catch {
    /* 저장 공간이 꽉 찼거나 차단된 경우 — 화면 표시는 유지 */
  }
}

function fbTimeLabel(ts) {
  const d = new Date(ts);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}.${dd}`;
}

/* 카드 하나를 안전하게 생성 (사용자 입력은 textContent로 — XSS 방지) */
function fbCardEl(item) {
  const card = document.createElement('div');
  card.className = 'fb-card';

  const text = document.createElement('p');
  text.className = 'fb-card__text';
  text.textContent = item.text;

  const meta = document.createElement('div');
  meta.className = 'fb-card__meta';

  const name = document.createElement('span');
  name.className = 'fb-card__name';
  name.textContent = item.name || '익명';

  const time = document.createElement('span');
  time.textContent = fbTimeLabel(item.ts);

  meta.append(name, time);
  card.append(text, meta);
  return card;
}

function fbRender() {
  const track = $('#fb-track');
  const list = fbLoad();

  track.innerHTML = '';
  if (!list.length) {
    const empty = document.createElement('p');
    empty.className = 'fb-track__empty';
    empty.textContent = '아직 남긴 말이 없어요. 첫 번째로 남겨보세요.';
    track.append(empty);
    return;
  }
  // 최신이 왼쪽
  list.forEach((item) => track.append(fbCardEl(item)));
}

function initFeedback() {
  const nameEl = $('#fb-name');
  const textEl = $('#fb-text');
  const countEl = $('#fb-count');
  const submitEl = $('#fb-submit');
  const track = $('#fb-track');

  const refreshCount = () => {
    const n = textEl.value.length;
    countEl.textContent = `${n} / 200`;
    submitEl.disabled = textEl.value.trim().length === 0;
  };
  refreshCount();
  textEl.addEventListener('input', refreshCount);

  const submit = () => {
    const text = textEl.value.trim();
    if (!text) return;

    const list = fbLoad();
    list.unshift({
      name: nameEl.value.trim().slice(0, 20),
      text: text.slice(0, 200),
      ts: Date.now(),
    });
    fbSave(list);
    fbRender();

    textEl.value = '';
    nameEl.value = '';
    refreshCount();
    track.scrollTo({ left: 0, behavior: 'smooth' });
  };

  submitEl.addEventListener('click', submit);
  // Ctrl/Cmd+Enter 로도 제출
  textEl.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') submit();
  });

  initDragScroll(track); // 칩과 같은 드래그 스크롤 재사용
  fbRender();
}

/* --------------------------------------------
   11. 첫 진입 인사 모달
-------------------------------------------- */
function initWelcome() {
  const dlg = $('#welcome');
  if (!dlg) return;

  const close = () => dlg.close();
  $('#welcome-close').addEventListener('click', close);
  $('#welcome-start').addEventListener('click', close);
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) close();
  });

  // 페이지가 자리를 잡은 뒤 부드럽게 노출
  requestAnimationFrame(() => dlg.showModal());
}


initTheme();
initProgress();
buildFlow();
buildChipGroup('#chips-stage', 'stage', STAGES.map((s) => ({ value: s.id, label: s.node })));
buildChipGroup('#chips-type', 'type', TYPES.map((t) => ({ value: t, label: t })));
buildChipGroup('#chips-timing', 'timing', TIMINGS.map((t) => ({ value: t, label: t })));
buildTraps();
buildAdvice();
initFeedback();
initModal();
initReveal();
render();
initWelcome();