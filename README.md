# Arcana Commons Forum

Language: 中文 / English

Arcana Commons 是一個靜態論壇原型，主題聚焦於神祕學研究、公版文本、中英對照閱讀、來源核驗與學術討論。

Arcana Commons is a static prototype for an occult studies forum focused on public-domain texts, bilingual reading, source verification, and scholarly discussion.

目前版本使用純 HTML、CSS 與 JavaScript 製作。可以直接用瀏覽器開啟，也可以透過任何靜態檔案伺服器預覽。

The current build is plain HTML, CSS, and JavaScript. It can be opened directly in a browser or served with any static file server.

## 中文說明

### 主要區塊

#### 頁首導覽

頁首呈現 Arcana Commons 的網站識別，並提供前往論壇版塊、中英閱讀、主題索引與公版書庫的快速入口。右側包含主題切換按鈕與建立新主題的按鈕。

#### 論壇公告

公告列說明論壇的編輯原則：討論應以公版文本、書目整理、翻譯校勘與閱讀札記為核心。發文前應盡量標註文本來源。

#### 版塊側欄

版塊側欄將論壇整理為幾個主要分區：

- 公版文本：書目、版本、來源連結與掃描資料。
- 中英對照：譯文校勘、術語表與平行文本討論。
- 研究札記：閱讀筆記、象徵系統與方法論討論。
- 站務與共建：版規、資料提交、功能建議與社群維護。

#### 主題索引

主題索引是主要討論區。它支援依版塊篩選、搜尋、依最近活動/回覆數/瀏覽數排序，以及開啟主題詳情。預設主題用於示範論壇早期可能出現的討論方向。

#### 主題詳情

主題詳情以彈窗形式開啟。每個主題會顯示所屬版塊、標籤、作者、正文、既有回覆與回覆表單。原型階段的回覆資料會儲存在瀏覽器本機。

#### 公版書庫

公版書庫是一個簡潔的文本入口。點選書目後會進入對應的二級文本檔案頁。

#### 中英對照閱讀

閱讀面板呈現英文與中文譯稿的段落對照，並加入小型閱讀工作台。目前包含赫爾墨斯文本與比較神話相關示例。

閱讀功能包括：

- 在同一文本內切換不同段落。
- 調整閱讀字號。
- 切換雙欄與單欄閱讀模式。
- 查看核心術語卡。
- 將本機閱讀筆記儲存到 `localStorage`。
- 將當前段落或術語引用到新論壇主題中。

#### 文本檔案頁

二級界面採用文獻索引式結構，風格參考早期網路書目網站。每個文本檔案頁包含：

- 標題與副標題。
- 年代、類別、文本狀態與相關論壇版塊。
- 編輯說明。
- 原始文本資源。
- 評注與研究資源。
- 中英對照樣例。
- 前往相關版塊或引用樣例建立新主題的操作。

#### 發文器

發文器以彈窗形式提供建立新主題的介面，包括標題、版塊與正文欄位。在目前原型中，新主題會儲存在 `localStorage`。

### 檔案結構

- `index.html`：頁面結構、彈窗、導覽與文本檔案容器。
- `styles.css`：版面、字體、響應式設計、明暗主題與文本檔案頁樣式。
- `script.js`：版塊渲染、搜尋、排序、主題互動、閱讀切換、檔案頁渲染與本機資料保存。
- `README.zh-Hant.md`：獨立繁體中文說明文檔。

### 資料保存

本原型尚未接入後端。使用者建立的主題、回覆、閱讀筆記與主題偏好會儲存在瀏覽器的 `localStorage`。

### 後續計畫

- 為版塊頁與文本檔案頁加入正式路由。
- 以後端資料庫取代示範資料。
- 加入帳號系統與管理權限。
- 增加來源欄位：版權狀態、版本、頁碼與 URL。
- 加入段落級中英對齊與術語表連結。

## English

### Main Sections

#### Header Navigation

The top header introduces the Arcana Commons identity and provides quick navigation to the forum boards, bilingual reader, thread index, and public-domain library. It also includes a theme toggle and a button for creating a new thread.

#### Forum Notice

The notice strip explains the forum's editorial principle: discussions should focus on public-domain texts, bibliography, translation review, and reading notes. It reminds contributors to cite text sources before posting.

#### Board Sidebar

The board sidebar organizes the forum into several primary areas:

- Public-domain texts: bibliography, editions, source links, and scanned material.
- Bilingual reading: translation review, terminology, and parallel text discussion.
- Research notes: reading notes, symbolic systems, and methodology.
- Site operations: rules, submissions, feature requests, and community maintenance.

#### Thread Index

The thread index is the main discussion surface. It supports board filtering, search, sorting by latest activity, replies, or views, and opening a thread detail view. Seed threads model likely early conversations for the forum.

#### Thread Detail View

Thread details open in a modal interface. Each thread shows its board, tag, author, body, existing replies, and a reply form. Replies are stored locally in the browser for prototype use.

#### Public-Domain Library

The library list is a compact entry point into the text archive. Each item links into a secondary archive page for the selected work.

#### Bilingual Reader

The reader panel presents English and Chinese parallel passages with a small reading workspace. It currently includes examples for Hermetic and comparative mythology texts.

Reader features include:

- Passage switching within each selected text.
- Adjustable reading font size.
- Parallel-column and single-column layout modes.
- Glossary cards for key terms.
- Local reading notes saved in `localStorage`.
- Quoting the current passage or a glossary term into a new forum thread.

#### Text Archive Pages

The secondary interface follows a document-index style inspired by early web bibliography sites. Each archive page includes:

- Title and subtitle.
- Date, category, status, and related forum board.
- Editorial overview.
- Primary text resources.
- Commentary resources.
- Bilingual sample passage.
- Actions to open the related board or quote the sample into a new thread.

#### Composer

The composer modal allows users to create a new local thread. It includes title, board, and body fields. In this prototype, created threads are saved to `localStorage`.

### Files

- `index.html`: page structure, modals, navigation, and archive containers.
- `styles.css`: layout, typography, responsive behavior, light/dark themes, and archive styling.
- `script.js`: board rendering, search, sorting, thread interactions, reader switching, archive page rendering, and local persistence.
- `README.zh-Hant.md`: standalone Traditional Chinese documentation.

### Persistence

This prototype does not use a backend. User-created threads, replies, reading notes, and theme preference are stored in browser `localStorage`.

### Next Steps

- Add real routing for board pages and text archive pages.
- Replace seed data with a backend database.
- Add user accounts and moderation roles.
- Add source metadata fields for copyright status, edition, page, and URL.
- Add paragraph-level bilingual alignment and glossary linking.
