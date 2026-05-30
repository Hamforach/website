const APP_CONFIG = {
  storagePrefix: "arcana",
  apiBaseUrl: "",
  persistence: "local",
};

const storageKey = (name) => `${APP_CONFIG.storagePrefix}-${name}`;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}

function makeId(prefix) {
  if (globalThis.crypto?.randomUUID) return `${prefix}-${globalThis.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readJSON(key, fallback) {
  const saved = localStorage.getItem(storageKey(key));
  if (!saved) return fallback;

  try {
    const parsed = JSON.parse(saved);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(storageKey(key), JSON.stringify(value));
}

const forumStore = {
  loadThreads() {
    const saved = readJSON("threads", seedThreads);
    return Array.isArray(saved) ? saved : seedThreads;
  },
  saveThreads(threads) {
    writeJSON("threads", threads);
  },
  loadReadingNotes() {
    const saved = readJSON("reading-notes", []);
    return Array.isArray(saved) ? saved : [];
  },
  saveReadingNotes(notes) {
    writeJSON("reading-notes", notes);
  },
  loadPreference(name, fallback) {
    return localStorage.getItem(storageKey(name)) || fallback;
  },
  savePreference(name, value) {
    localStorage.setItem(storageKey(name), value);
  },
};

const boards = [
  {
    id: "all",
    name: "全部主题",
    desc: "查看全站最新讨论",
    countLabel: "总览",
  },
  {
    id: "texts",
    name: "公版文本",
    desc: "书目、版本、原文出处与影印资源",
    countLabel: "书库",
  },
  {
    id: "translation",
    name: "中英对照",
    desc: "译文校勘、术语表和双语阅读",
    countLabel: "译稿",
  },
  {
    id: "practice",
    name: "研究札记",
    desc: "读书笔记、象征系统和方法论讨论",
    countLabel: "札记",
  },
  {
    id: "site",
    name: "站务与共建",
    desc: "版规、资料提交、功能建议",
    countLabel: "站务",
  },
];

const seedThreads = [
  {
    id: "emerald-source",
    board: "texts",
    title: "《翡翠碑》拉丁文本与英译底本整理",
    author: "Lumen",
    tag: "文本来源",
    body: "这里汇总几种常见英文底本，并标注可公开引用的版本。后续可以把每一句拆成中英对照卡片，方便逐句校勘。",
    replies: [
      { author: "Mira", body: "建议把出处字段固定下来：书名、年份、页码、扫描链接、许可证状态。", time: "09:42" },
      { author: "Archivist", body: "可以先从 WikiSource 与 Internet Archive 可核验版本开始。", time: "10:18" },
    ],
    views: 428,
    updated: "15分钟前",
    pinned: true,
  },
  {
    id: "bilingual-reader",
    board: "translation",
    title: "中英对照阅读页需要哪些基础功能？",
    author: "Sunmaker",
    tag: "产品设计",
    body: "初版希望支持左右双栏、术语高亮、引用到帖子、译注折叠。后面再考虑逐句版本对比。",
    replies: [
      { author: "Eli", body: "术语表最好能从帖子里反向链接到阅读段落。", time: "昨天" },
      { author: "Q", body: "建议加入原文段落编号，方便讨论时引用。", time: "昨天" },
      { author: "Mira", body: "移动端可以改成上下堆叠，保留一键切换。", time: "今天" },
    ],
    views: 612,
    updated: "32分钟前",
    pinned: true,
  },
  {
    id: "discuz-structure",
    board: "site",
    title: "参考 imslr / Discuz 的论坛结构草案",
    author: "Admin",
    tag: "信息架构",
    body: "保留传统论坛的分区、主题列表、楼层回复和站务公告，但视觉上更像资料馆，不照搬任何站点的具体品牌与内容。",
    replies: [
      { author: "Sunmaker", body: "首页需要一眼看到版块、热帖、公版书架和阅读入口。", time: "12:02" },
    ],
    views: 375,
    updated: "1小时前",
    pinned: false,
  },
  {
    id: "golden-bough",
    board: "practice",
    title: "《金枝》适合作为比较神话入门书单吗？",
    author: "Aster",
    tag: "读书札记",
    body: "它很适合做历史材料入口，但需要提醒读者注意现代学术对其方法的修正与批评。",
    replies: [
      { author: "Nox", body: "可以放在历史脉络区，不建议作为唯一理论框架。", time: "周五" },
      { author: "Mira", body: "搭配现代宗教学与人类学导读会更稳。", time: "周五" },
    ],
    views: 289,
    updated: "2小时前",
    pinned: false,
  },
  {
    id: "copyright-rules",
    board: "site",
    title: "资料上传前的版权状态检查清单",
    author: "Archivist",
    tag: "版规",
    body: "请优先提交公版、明确开放授权或只包含短引用的材料。仍在版权期内的整本扫描不进入公共书架。",
    replies: [
      { author: "Admin", body: "初版会把版权状态作为必填字段。", time: "周四" },
    ],
    views: 701,
    updated: "昨天",
    pinned: false,
  },
];

const readings = {
  emerald: {
    meta: "Hermetic Text · 公版译读",
    title: "Tabula Smaragdina",
    en: "That which is below is like that which is above, and that which is above is like that which is below, to accomplish the miracles of one thing.",
    zh: "下者如上，上者如下，由此成就一物之奇迹。",
  },
  kybalion: {
    meta: "Hermetic Philosophy · 术语校勘",
    title: "The Principle of Correspondence",
    en: "This principle embodies the truth that there is always a correspondence between the laws and phenomena of the various planes of being and life.",
    zh: "此原则说明：存在与生命的各个层面，其法则与现象之间总有对应关系。",
  },
  golden: {
    meta: "Comparative Mythology · 阅读札记",
    title: "The Golden Bough",
    en: "The priest who bore the title of King of the Wood had won his office by slaying his predecessor in single combat.",
    zh: "拥有林中王称号的祭司，是通过单独决斗杀死前任而取得其职分的。",
  },
};

const readingEnhancements = {
  emerald: {
    passages: [
      {
        label: "1. 上下对应",
        en: "That which is below is like that which is above, and that which is above is like that which is below, to accomplish the miracles of one thing.",
        zh: "下者如上，上者如下，由此成就一物之奇迹。",
      },
      {
        label: "2. 一物之源",
        en: "And as all things were from one, by the mediation of one, so all things were born from this one thing by adaptation.",
        zh: "万物皆由一而来，经由一之调和；万物亦因适应而从此一物生出。",
      },
      {
        label: "3. 象征性读法",
        en: "The sentence is often read as a compact statement of correspondence rather than a literal cosmology.",
        zh: "此句常被理解为对应原则的浓缩表达，而非一套字面宇宙论。",
      },
    ],
    terms: [
      ["Correspondence", "对应；上下层面之间的结构性呼应。"],
      ["One Thing", "一物；可作为统一原则、素材或象征中心来讨论。"],
      ["Adaptation", "适应/调和；指从同一来源生成差异的过程。"],
    ],
  },
  kybalion: {
    passages: [
      {
        label: "1. 对应原则",
        en: "This principle embodies the truth that there is always a correspondence between the laws and phenomena of the various planes of being and life.",
        zh: "此原则说明：存在与生命的各个层面，其法则与现象之间总有对应关系。",
      },
      {
        label: "2. 术语边界",
        en: "The value of the passage depends on how carefully its key terms are defined before interpretation.",
        zh: "这一段的价值取决于解释之前是否谨慎界定核心术语。",
      },
      {
        label: "3. 论坛讨论方向",
        en: "Readers may compare correspondence with analogy, sympathy, and symbolic parallelism.",
        zh: "读者可比较“对应”与类比、感应、象征平行之间的差异。",
      },
    ],
    terms: [
      ["Plane", "层面；存在、心理或象征秩序的分层。"],
      ["Law", "法则；文本内部用来组织现象的原则。"],
      ["Phenomenon", "现象；可被观察、分类或象征化的对象。"],
    ],
  },
  golden: {
    passages: [
      {
        label: "1. 林中王",
        en: "The priest who bore the title of King of the Wood had won his office by slaying his predecessor in single combat.",
        zh: "拥有林中王称号的祭司，是通过单独决斗杀死前任而取得其职分的。",
      },
      {
        label: "2. 阅读警示",
        en: "Frazer's comparative method is historically important, but its conclusions should be read with modern methodological caution.",
        zh: "弗雷泽的比较方法具有历史重要性，但其结论应结合现代方法论谨慎阅读。",
      },
      {
        label: "3. 讨论入口",
        en: "A useful forum thread should separate textual summary, historical claim, and later interpretation.",
        zh: "有效的论坛讨论应区分文本摘要、历史主张与后世解释。",
      },
    ],
    terms: [
      ["King of the Wood", "林中王；内米湖祭司职位的经典称谓。"],
      ["Ritual Kingship", "仪式王权；与祭司、替代和牺牲相关的比较概念。"],
      ["Comparative Method", "比较方法；需注意材料选择与时代局限。"],
    ],
  },
};

const books = [
  ["golden-bough", "The Golden Bough", "比较神话 · 英文公版"],
  ["secret-teachings", "The Secret Teachings of All Ages", "需核验版本 · 书目待定"],
  ["kybalion", "The Kybalion", "术语讨论 · 译稿整理"],
  ["corpus-hermeticum", "Corpus Hermeticum", "古典文本 · 多译本对照"],
];

const workPages = {
  "golden-bough": {
    title: "The Golden Bough",
    subtitle: "A Study in Magic and Religion",
    date: "1890 / 1922",
    category: "Comparative Mythology",
    status: "英文公版，中文译本需核验",
    board: "practice",
    intro:
      "This entry gathers public-domain information on James George Frazer's comparative study of myth, ritual, priesthood, and kingship. 本页用于收集可公开引用的英文文本、章节索引、阅读札记与现代批评提示。",
    overview:
      "《金枝》适合作为历史材料入口，而不宜作为唯一理论框架。二级页的写法故意接近早期文献目录：先给年代与类别，再列文本、译本、评注、讨论入口。",
    sampleEn:
      "The priest who bore the title of King of the Wood had won his office by slaying his predecessor in single combat.",
    sampleZh:
      "拥有林中王称号的祭司，是通过单独决斗杀死前任而取得其职分的。",
    resources: {
      texts: ["Public-domain English editions", "Chapter index by topic", "Scanned edition notes"],
      commentary: ["Methodological cautions", "Comparative mythology notes", "Reception history"],
    },
  },
  "secret-teachings": {
    title: "The Secret Teachings of All Ages",
    subtitle: "An Encyclopedic Outline of Masonic, Hermetic, Qabbalistic and Rosicrucian Symbolical Philosophy",
    date: "1928",
    category: "Esotericism / Symbolism",
    status: "版权状态需逐版本核验",
    board: "texts",
    intro:
      "This page is a bibliographic placeholder. It records editions, copyright status, and discussion notes before any full-text archive is accepted.",
    overview:
      "该书常被读者作为象征系统入门，但站内只收录明确可公开使用的材料。若版本状态不明，只保留书目信息、短摘录和讨论链接。",
    sampleEn: "A short quotation may be discussed only with source, edition, and page reference.",
    sampleZh: "短引用必须附书名、版本、页码与版权状态说明。",
    resources: {
      texts: ["Edition checklist", "Copyright status notes", "Bibliographic references"],
      commentary: ["Symbol index proposal", "Reading group notes", "Source verification thread"],
    },
  },
  kybalion: {
    title: "The Kybalion",
    subtitle: "A Study of the Hermetic Philosophy of Ancient Egypt and Greece",
    date: "1908",
    category: "Hermetic Philosophy",
    status: "英文公版，译稿整理中",
    board: "translation",
    intro:
      "This entry provides a controlled place for terminology, parallel readings, and translation notes on the seven principles commonly attributed to the Kybalion.",
    overview:
      "条目页采用术语优先的组织方式：每个术语先列英文原句，再列暂译、异译和讨论帖。这样可以把阅读页、词表和论坛主题互相链接。",
    sampleEn:
      "There is always a correspondence between the laws and phenomena of the various planes of being and life.",
    sampleZh:
      "存在与生命的各个层面，其法则与现象之间总有对应关系。",
    resources: {
      texts: ["English base text", "Term list", "Parallel paragraph map"],
      commentary: ["Correspondence / 对应", "Mentalism / 唯心原则", "Vibration / 振动"],
    },
  },
  "corpus-hermeticum": {
    title: "Corpus Hermeticum",
    subtitle: "Hermetic Treatises in Translation",
    date: "2nd-3rd century CE",
    category: "Classical Hermetica",
    status: "古典文本，多译本对照",
    board: "texts",
    intro:
      "This index collects treatise-level notes for the Hermetic corpus: title variants, translation witnesses, short summaries, and forum discussions.",
    overview:
      "二级页先作为目录，不急于堆全文。每篇文献可以逐步拥有自己的子页：题名、年代、传本、英译、中文试译、注释与讨论。",
    sampleEn: "The treatises should be cited by title, section, translator, and edition.",
    sampleZh: "引用时应标注篇名、段号、译者与版本。",
    resources: {
      texts: ["Treatise list", "Translation witnesses", "Citation format"],
      commentary: ["Dating notes", "Greek terms", "Related forum threads"],
    },
  },
};

const digest = [
  ["术语", "correspondence 暂译为“对应”，讨论是否保留“相应”作为传统译法。"],
  ["出处", "《翡翠碑》段落引用需要附底本版本，避免混用网络转抄。"],
  ["版规", "整本扫描只收录明确公版或开放授权链接。"],
];

const state = {
  board: "all",
  search: "",
  sort: "latest",
  reading: "emerald",
  readingPassage: 0,
  readerFont: Number(forumStore.loadPreference("reader-font", 1)),
  readerLayout: forumStore.loadPreference("reader-layout", "parallel"),
  notes: loadReadingNotes(),
  work: "golden-bough",
  threads: loadThreads(),
};

const boardList = document.querySelector("#boardList");
const threadList = document.querySelector("#threadList");
const boardTitle = document.querySelector("#boardTitle");
const threadCount = document.querySelector("#threadCount");
const replyCount = document.querySelector("#replyCount");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const threadDialog = document.querySelector("#threadDialog");
const threadDetail = document.querySelector("#threadDetail");
const composerDialog = document.querySelector("#composerDialog");
const composerForm = document.querySelector("#composerForm");
const boardSelect = composerForm.elements.board;
const workPage = document.querySelector("#workPage");
const workMain = document.querySelector("#workMain");
const workLinks = document.querySelector("#workLinks");
const workIndexList = document.querySelector("#workIndexList");
const passageSelect = document.querySelector("#readingPassageSelect");
const parallelReader = document.querySelector(".parallel-reader");
const termList = document.querySelector("#termList");
const readingNoteForm = document.querySelector("#readingNoteForm");
const readingNotes = document.querySelector("#readingNotes");

function loadThreads() {
  return forumStore.loadThreads();
}

function saveThreads() {
  forumStore.saveThreads(state.threads);
}

function loadReadingNotes() {
  return forumStore.loadReadingNotes();
}

function saveReadingNotes() {
  forumStore.saveReadingNotes(state.notes);
}

function getBoard(id) {
  return boards.find((board) => board.id === id) || boards[0];
}

function getVisibleThreads() {
  const query = state.search.trim().toLowerCase();
  let items = state.threads.filter((thread) => {
    const inBoard = state.board === "all" || thread.board === state.board;
    const text = `${thread.title} ${thread.author} ${thread.tag} ${thread.body}`.toLowerCase();
    return inBoard && (!query || text.includes(query));
  });

  items = [...items].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (state.sort === "replies") return b.replies.length - a.replies.length;
    if (state.sort === "views") return b.views - a.views;
    return state.threads.indexOf(a) - state.threads.indexOf(b);
  });

  return items;
}

function renderBoards() {
  boardList.innerHTML = boards
    .map((board) => {
      const total =
        board.id === "all"
          ? state.threads.length
          : state.threads.filter((thread) => thread.board === board.id).length;
      return `
        <button class="board-button ${state.board === board.id ? "is-active" : ""}" type="button" data-board="${board.id}">
          <span class="board-name">${escapeHTML(board.name)}<span>${total}</span></span>
          <span class="board-meta">${escapeHTML(board.countLabel)} · ${escapeHTML(board.desc)}</span>
        </button>
      `;
    })
    .join("");

  boardSelect.innerHTML = boards
    .filter((board) => board.id !== "all")
    .map((board) => `<option value="${escapeHTML(board.id)}">${escapeHTML(board.name)}</option>`)
    .join("");
}

function renderBooks() {
  document.querySelector("#bookList").innerHTML = books
    .map(
      ([id, title, meta]) => `
        <li>
          <button class="book-button" type="button" data-work="${id}">
            <span class="book-title">${escapeHTML(title)}</span>
            <span class="book-meta">${escapeHTML(meta)}</span>
          </button>
        </li>
      `,
    )
    .join("");
}

function renderDigest() {
  document.querySelector("#digestList").innerHTML = digest
    .map(([title, text]) => `<div class="digest-item"><strong>${escapeHTML(title)}</strong><p>${escapeHTML(text)}</p></div>`)
    .join("");
}

function renderThreads() {
  const visible = getVisibleThreads();
  const board = getBoard(state.board);
  boardTitle.textContent = board.name;
  threadCount.textContent = visible.length;
  replyCount.textContent = visible.reduce((sum, thread) => sum + thread.replies.length, 0);

  if (!visible.length) {
    threadList.innerHTML = `<div class="empty-state">没有找到相关主题。换个关键词，或者发布第一篇讨论。</div>`;
    return;
  }

  threadList.innerHTML = visible
    .map(
      (thread) => `
        <button class="thread-row" type="button" data-thread="${escapeHTML(thread.id)}">
          <span>
            <span class="thread-title">
              ${thread.pinned ? '<span class="pin">置顶</span>' : ""}
              ${escapeHTML(thread.title)}
            </span>
            <span class="thread-meta">${escapeHTML(getBoard(thread.board).name)} · ${escapeHTML(thread.author)} · <span class="tag">${escapeHTML(thread.tag)}</span></span>
          </span>
          <span class="thread-cell"><strong>${thread.replies.length}</strong>回复</span>
          <span class="thread-cell"><strong>${thread.views}</strong>浏览</span>
          <span class="thread-cell"><strong>${escapeHTML(thread.updated)}</strong>最近回复</span>
        </button>
      `,
    )
    .join("");
}

function getCurrentPassage() {
  const reading = readings[state.reading];
  const extra = readingEnhancements[state.reading];
  const passages = extra?.passages || [{ label: "摘录", en: reading.en, zh: reading.zh }];
  if (state.readingPassage >= passages.length) state.readingPassage = 0;
  return passages[state.readingPassage];
}

function renderReadingNotes() {
  const related = state.notes.filter(
    (note) => note.reading === state.reading && note.passage === state.readingPassage,
  );

  if (!related.length) {
    readingNotes.innerHTML = `<p class="note-meta">这一段还没有本地笔记。</p>`;
    return;
  }

  readingNotes.innerHTML = related
    .slice()
    .reverse()
    .map(
      (note) => `
        <article class="note-card">
          <span class="note-meta">${escapeHTML(note.title)} · ${escapeHTML(note.time)}</span>
          <p>${escapeHTML(note.body)}</p>
        </article>
      `,
    )
    .join("");
}

function renderReading() {
  const reading = readings[state.reading];
  const extra = readingEnhancements[state.reading];
  const passages = extra?.passages || [{ label: "摘录", en: reading.en, zh: reading.zh }];
  const passage = getCurrentPassage();

  document.querySelector("#readingMeta").textContent = reading.meta;
  document.querySelector("#readingTitle").textContent = reading.title;
  document.querySelector("#readingEn").textContent = passage.en;
  document.querySelector("#readingZh").textContent = passage.zh;

  passageSelect.innerHTML = passages
    .map((item, index) => `<option value="${index}">${escapeHTML(item.label)}</option>`)
    .join("");
  passageSelect.value = String(state.readingPassage);

  termList.innerHTML = (extra?.terms || [])
    .map(
      ([term, note]) => `
        <button class="term-button" type="button" data-term="${escapeHTML(term)}" data-term-note="${escapeHTML(note)}">
          <strong>${escapeHTML(term)}</strong>
          <span>${escapeHTML(note)}</span>
        </button>
      `,
    )
    .join("");

  parallelReader.style.setProperty("--reader-font", `${state.readerFont}rem`);
  parallelReader.classList.toggle("is-stacked", state.readerLayout === "stacked");
  document.querySelector("#toggleReaderLayout").textContent =
    state.readerLayout === "stacked" ? "双栏" : "单栏";

  document.querySelectorAll(".reader-tabs button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.reading === state.reading);
  });

  renderReadingNotes();
}

function renderWorkPage() {
  const work = workPages[state.work];
  if (!work) return;

  workLinks.innerHTML = `
    <a href="#work-overview">Overview</a>
    <a href="#work-texts">Texts</a>
    <a href="#work-reading">Parallel Reading</a>
    <a href="#work-discussion">Discussion</a>
  `;

  workIndexList.innerHTML = books
    .map(
      ([id, title, meta]) => `
        <button class="${state.work === id ? "is-active" : ""}" type="button" data-work="${escapeHTML(id)}">
          <strong>${escapeHTML(title)}</strong>
          <span>${escapeHTML(meta)}</span>
        </button>
      `,
    )
    .join("");

  workMain.innerHTML = `
    <header>
      <p class="eyebrow">Text Archive</p>
      <h1>${escapeHTML(work.title)}</h1>
      <p class="work-subtitle">${escapeHTML(work.subtitle)}</p>
    </header>

    <div class="work-facts">
      <div class="work-fact"><span>Date</span><strong>${escapeHTML(work.date)}</strong></div>
      <div class="work-fact"><span>Category</span><strong>${escapeHTML(work.category)}</strong></div>
      <div class="work-fact"><span>Status</span><strong>${escapeHTML(work.status)}</strong></div>
      <div class="work-fact"><span>Forum</span><strong>${escapeHTML(getBoard(work.board).name)}</strong></div>
    </div>

    <section class="work-section" id="work-overview">
      <h2>About This Text</h2>
      <p>${escapeHTML(work.intro)}</p>
    </section>

    <section class="work-section">
      <h2>Editorial Note</h2>
      <p>${escapeHTML(work.overview)}</p>
    </section>

    <section class="work-section" id="work-texts">
      <h2>Texts and Resources</h2>
      <div class="resource-grid">
        <div class="resource-list">
          <span>Primary Texts</span>
          <ul>${work.resources.texts.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        </div>
        <div class="resource-list">
          <span>Commentary</span>
          <ul>${work.resources.commentary.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="work-section" id="work-reading">
      <h2>Parallel Reading Sample</h2>
      <div class="parallel-sample">
        <div>
          <h3>English</h3>
          <p>${escapeHTML(work.sampleEn)}</p>
        </div>
        <div>
          <h3>中文译稿</h3>
          <p>${escapeHTML(work.sampleZh)}</p>
        </div>
      </div>
    </section>

    <section class="work-section" id="work-discussion">
      <h2>Forum Discussion</h2>
      <p>Use the forum thread for source notes, translation proposals, corrections, and reading questions. 每条讨论都应尽量附上版本、页码或段落编号。</p>
      <div class="work-actions">
        <button class="primary-button" type="button" data-work-discuss="${escapeHTML(work.board)}">查看相关版块</button>
        <button class="secondary-button" type="button" data-work-quote="${escapeHTML(state.work)}">引用样例发帖</button>
      </div>
    </section>
  `;
}

function openWork(id) {
  state.work = workPages[id] ? id : "golden-bough";
  renderWorkPage();
  workPage.hidden = false;
  workPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openThread(id, incrementView = true) {
  const thread = state.threads.find((item) => item.id === id);
  if (!thread) return;

  if (incrementView) thread.views += 1;
  saveThreads();
  renderThreads();

  threadDetail.innerHTML = `
    <p class="eyebrow">${escapeHTML(getBoard(thread.board).name)} · ${escapeHTML(thread.tag)}</p>
    <h2>${escapeHTML(thread.title)}</h2>
    <p class="thread-meta">${escapeHTML(thread.author)} · ${escapeHTML(thread.updated)} · ${thread.views} 浏览</p>
    <p class="thread-body">${escapeHTML(thread.body)}</p>
    <h3>回复</h3>
    <div class="reply-list">
      ${thread.replies
        .map(
          (reply, index) => `
            <article class="reply-card">
              <span class="reply-meta">#${index + 1} · ${escapeHTML(reply.author)} · ${escapeHTML(reply.time)}</span>
              <p>${escapeHTML(reply.body)}</p>
            </article>
          `,
        )
        .join("")}
    </div>
    <form class="reply-form" data-reply-thread="${escapeHTML(thread.id)}">
      <textarea required rows="4" placeholder="补充来源、译法或阅读意见"></textarea>
      <button class="primary-button" type="submit">回复</button>
    </form>
  `;

  if (!threadDialog.open) threadDialog.showModal();
}

function openComposer(prefill = "") {
  composerForm.reset();
  if (state.board !== "all") boardSelect.value = state.board;
  composerForm.elements.body.value = prefill;
  composerDialog.showModal();
}

function createThread(formData) {
  const thread = {
    id: makeId("thread"),
    board: formData.get("board"),
    title: formData.get("title").trim(),
    author: "Sunmaker",
    tag: "新主题",
    body: formData.get("body").trim(),
    replies: [],
    views: 1,
    updated: "刚刚",
    pinned: false,
  };

  state.threads.unshift(thread);
  state.board = thread.board;
  saveThreads();
  render();
  composerDialog.close();
}

function render() {
  renderBoards();
  renderBooks();
  renderDigest();
  renderThreads();
  renderReading();
  renderWorkPage();
}

boardList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-board]");
  if (!button) return;
  state.board = button.dataset.board;
  render();
});

document.querySelector("#bookList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-work]");
  if (button) openWork(button.dataset.work);
});

threadList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-thread]");
  if (button) openThread(button.dataset.thread);
});

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  renderThreads();
});

sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderThreads();
});

document.querySelector("#openComposer").addEventListener("click", () => openComposer());
document.querySelector("#closeComposer").addEventListener("click", () => composerDialog.close());
document.querySelector("#cancelComposer").addEventListener("click", () => composerDialog.close());
document.querySelector("#closeThread").addEventListener("click", () => threadDialog.close());
document.querySelector("#closeWorkPage").addEventListener("click", () => {
  workPage.hidden = true;
  document.querySelector("#forums").scrollIntoView({ behavior: "smooth", block: "start" });
});

composerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createThread(new FormData(composerForm));
});

threadDetail.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-reply-thread]");
  if (!form) return;
  event.preventDefault();

  const thread = state.threads.find((item) => item.id === form.dataset.replyThread);
  const textarea = form.querySelector("textarea");
  const body = textarea.value.trim();
  if (!thread || !body) return;

  thread.replies.push({ author: "Sunmaker", body, time: "刚刚" });
  thread.updated = "刚刚";
  saveThreads();
  openThread(thread.id, false);
});

document.querySelector(".reader-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-reading]");
  if (!button) return;
  state.reading = button.dataset.reading;
  state.readingPassage = 0;
  renderReading();
});

passageSelect.addEventListener("change", (event) => {
  state.readingPassage = Number(event.target.value);
  renderReading();
});

document.querySelector("#decreaseReaderFont").addEventListener("click", () => {
  state.readerFont = Math.max(0.88, Number((state.readerFont - 0.08).toFixed(2)));
  forumStore.savePreference("reader-font", String(state.readerFont));
  renderReading();
});

document.querySelector("#increaseReaderFont").addEventListener("click", () => {
  state.readerFont = Math.min(1.32, Number((state.readerFont + 0.08).toFixed(2)));
  forumStore.savePreference("reader-font", String(state.readerFont));
  renderReading();
});

document.querySelector("#toggleReaderLayout").addEventListener("click", () => {
  state.readerLayout = state.readerLayout === "stacked" ? "parallel" : "stacked";
  forumStore.savePreference("reader-layout", state.readerLayout);
  renderReading();
});

document.querySelector("#quoteToPost").addEventListener("click", () => {
  const reading = readings[state.reading];
  const passage = getCurrentPassage();
  const prefill = `引用《${reading.title}》${passage.label}：\n\nEnglish: ${passage.en}\n\n中文译稿：${passage.zh}\n\n我的问题：`;
  openComposer(prefill);
  boardSelect.value = "translation";
});

termList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-term]");
  if (!button) return;
  const reading = readings[state.reading];
  const prefill = `术语讨论：${button.dataset.term}\n\n出处：《${reading.title}》\n说明：${button.dataset.termNote}\n\n我的问题：`;
  openComposer(prefill);
  boardSelect.value = "translation";
});

readingNoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const textarea = readingNoteForm.elements.note;
  const body = textarea.value.trim();
  if (!body) return;

  state.notes.push({
    reading: state.reading,
    passage: state.readingPassage,
    title: `${readings[state.reading].title} / ${getCurrentPassage().label}`,
    body,
    time: "刚刚",
  });
  textarea.value = "";
  saveReadingNotes();
  renderReadingNotes();
});

document.querySelector("#openReadingArchive").addEventListener("click", () => {
  const map = { emerald: "corpus-hermeticum", kybalion: "kybalion", golden: "golden-bough" };
  openWork(map[state.reading]);
});

workPage.addEventListener("click", (event) => {
  const workButton = event.target.closest("[data-work]");
  if (workButton) {
    openWork(workButton.dataset.work);
    return;
  }

  const discussButton = event.target.closest("[data-work-discuss]");
  if (discussButton) {
    state.board = discussButton.dataset.workDiscuss;
    renderBoards();
    renderThreads();
    document.querySelector("#threads").scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const quoteButton = event.target.closest("[data-work-quote]");
  if (quoteButton) {
    const work = workPages[quoteButton.dataset.workQuote];
    const prefill = `引用《${work.title}》：\n\nEnglish: ${work.sampleEn}\n\n中文译稿：${work.sampleZh}\n\n我的问题：`;
    openComposer(prefill);
    boardSelect.value = work.board;
  }
});

document.querySelector("#themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  forumStore.savePreference("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (forumStore.loadPreference("theme", "light") === "dark") {
  document.body.classList.add("dark");
}

render();
