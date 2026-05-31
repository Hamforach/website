# Arcana Commons Forum

繁體中文 / English

Arcana Commons 是一個面向公版文本、神祕學研究、中英對照閱讀、來源核驗與學術討論的論壇原型。前端可部署到 Cloudflare Pages，以取得跨國 CDN 訪問能力；後端使用 Convex 儲存共享論壇資料。未配置 Convex 時，網站仍可運行，但資料會回退到瀏覽器本機的 `localStorage`。

Arcana Commons is a forum prototype for public-domain texts, occult studies, bilingual reading, source verification, and scholarly discussion. The frontend can be deployed on Cloudflare Pages for global CDN access, while Convex stores shared forum data. Without Convex configuration, the site still runs, but data falls back to browser `localStorage`.

## 最新更新 / Latest Updates

- 已加入 Cloudflare Pages 部署流程：`npm run build` 會輸出 `dist/`。
- Added Cloudflare Pages deployment flow: `npm run build` outputs `dist/`.

- 已加入 Convex 後端接入：主題、回覆、瀏覽數與閱讀筆記可寫入 Convex。
- Added Convex backend integration: threads, replies, view counts, and reading notes can be stored in Convex.

- 已加入專業多標籤體系：每個主題可有多個 `tags`，並按研究分類標註。
- Added a professional multi-tag system: each thread can have multiple `tags` grouped by research categories.

- 已加入角落題銘：
  「人子啊，要吃你所得的；要吃這書卷，去對以色列家講說。——《以西結書》3:1」
- Added a corner scripture slogan:
  "Son of man, eat what you find; eat this scroll, and go, speak to the house of Israel. — Ezekiel 3:1"

## 功能概覽 / Features

- 論壇分區：公版文本、平行文本、研究札記、站務與共建。
- Forum boards: public-domain texts, parallel texts, research notes, and site operations.

- 主題索引：支援版塊篩選、關鍵詞搜尋、回覆數/瀏覽數/最近活動排序。
- Thread index: board filtering, keyword search, and sorting by replies, views, or recent activity.

- 主題詳情：彈窗查看正文、標籤、作者、回覆與回覆表單。
- Thread detail view: modal display for body, tags, author, replies, and reply form.

- 平行文本校勘台：支援段落切換、字號調整、雙欄/單欄切換、術語卡和引用發帖。
- Parallel Text Desk: passage switching, font-size controls, parallel/single-column layouts, glossary cards, and quote-to-thread actions.

- 閱讀二級界面：首頁只保留閱讀入口，完整閱讀工作台進入專門界面，避免資訊堆疊。
- Dedicated reader page: the full reading workspace opens in a focused secondary interface.

- 側邊術語卡：首頁側邊欄保留可隨機刷新的研究術語卡。
- Sidebar term card: the home sidebar keeps a refreshable research term card.

- 公版書庫：提供文本檔案入口，並展示年代、類別、狀態、資源與討論入口。
- Public-domain library: archive entries with date, category, status, resources, and discussion links.

- 閱讀筆記：按閱讀文本和段落保存筆記。
- Reading notes: notes are saved by reading text and passage.

- Convex 後端：可保存主題、回覆、閱讀筆記與瀏覽數。
- Convex backend: stores threads, replies, reading notes, and view counts.

- 專業標籤體系：主題支援多標籤，並按 `period`、`language`、`tradition`、`topic`、`source-type` 分類。
- Professional tag system: threads support multiple tags categorized by `period`, `language`, `tradition`, `topic`, and `source-type`.

## 技術棧 / Tech Stack

- 前端：原生 HTML、CSS、JavaScript。
- Frontend: plain HTML, CSS, and JavaScript.

- 全球前端部署：Cloudflare Pages。
- Global frontend deployment: Cloudflare Pages.

- 後端：Convex。
- Backend: Convex.

- 本機回退：`localStorage`。
- Local fallback: `localStorage`.

## 檔案結構 / File Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── config.js
├── config.example.js
├── convex/
│   ├── schema.js
│   ├── forum.js
│   └── _generated/
├── scripts/
│   └── build-static.mjs
├── package.json
├── package-lock.json
├── CONVEX_INTEGRATION.md
└── README.md
```

- `index.html`：頁面結構、導覽、彈窗、題銘與文本檔案容器。
- `index.html`: page structure, navigation, modals, slogan, and archive containers.

- `styles.css`：版面、主題、響應式樣式、標籤 chips、閱讀/檔案頁視覺。
- `styles.css`: layout, themes, responsive styling, tag chips, and reader/archive visuals.

- `script.js`：論壇渲染、搜尋排序、閱讀器互動、發帖回覆、多標籤、Convex/本機儲存切換。
- `script.js`: forum rendering, search and sorting, reader interactions, posting/replying, multi-tags, and Convex/local persistence switching.

- `scripts/build-static.mjs`：Cloudflare Pages 靜態構建腳本，輸出 `dist/`。
- `scripts/build-static.mjs`: static build script for Cloudflare Pages, outputting `dist/`.

- `convex/schema.js`：Convex 資料表定義。
- `convex/schema.js`: Convex table schema.

- `convex/forum.js`：Convex 查詢與 mutation 函數。
- `convex/forum.js`: Convex queries and mutations.

## 本機運行 / Local Usage

安裝依賴：

Install dependencies:

```bash
npm install
```

啟動 Convex 本機開發環境：

Start local Convex development:

```bash
npx convex dev
```

複製示例配置：

Copy the example config:

```bash
cp config.example.js config.js
```

將 `config.js` 中的地址改成你的 Convex 部署地址：

Update `config.js` with your Convex deployment URL:

```js
window.CONVEX_URL = "https://your-deployment.convex.cloud";
```

本機 Convex 開發也可使用：

For local Convex development:

```js
window.CONVEX_URL = "http://127.0.0.1:3210";
```

最後直接用瀏覽器打開 `index.html`，或透過任何靜態檔案伺服器預覽。

Finally, open `index.html` directly in a browser or serve the folder with any static file server.

## Cloudflare Pages 部署 / Cloudflare Pages Deployment

推薦在 Cloudflare Pages 後台使用 **Connect to Git** 連接此 GitHub 倉庫。

Use **Connect to Git** in Cloudflare Pages to connect this GitHub repository.

設定：

Settings:

```text
Repository: Hamforach/website
Framework preset: None
Build command: npm run build
Build output directory: dist
```

若要讓線上論壇共享資料，請在 Cloudflare Pages 的環境變數中加入：

To make the online forum share data, add this environment variable in Cloudflare Pages:

```text
CONVEX_URL=https://your-production-deployment.convex.cloud
```

構建腳本會把 `CONVEX_URL` 寫入線上 `dist/config.js`。如果沒有設定該環境變數，網站仍會載入，但訪客資料只會存在各自瀏覽器的 `localStorage`。

The build script writes `CONVEX_URL` into the deployed `dist/config.js`. If the variable is not set, the site still loads, but visitor data remains in each user's browser `localStorage`.

## Convex 後端 / Convex Backend

部署生產後端：

Deploy production backend:

```bash
npx convex login
npx convex deploy
```

部署完成後，把生產 `CONVEX_URL` 填入 Cloudflare Pages 的環境變數。

After deployment, place the production `CONVEX_URL` in Cloudflare Pages environment variables.

## 資料保存 / Persistence

配置 Convex 後：

When Convex is configured:

- 主題保存到 `threads` 表。
- Threads are saved to the `threads` table.

- 回覆保存到 `replies` 表。
- Replies are saved to the `replies` table.

- 閱讀筆記保存到 `readingNotes` 表。
- Reading notes are saved to the `readingNotes` table.

- 瀏覽數透過 Convex mutation 更新。
- View counts are updated through a Convex mutation.

- 主題標籤以 `tags` 陣列保存，每個標籤包含 `name` 與 `category`。
- Thread tags are stored as a `tags` array, where each tag has a `name` and `category`.

標籤分類：

Tag categories:

```text
period       Antiquity, Late Antiquity, Renaissance
language     Latin, Greek, Chinese, English
tradition    Hermeticism, Neoplatonism, Gnosticism
topic        translation, commentary, source-check
source-type  public-domain, uncertain-source, needs-verification
```

未配置 Convex 或連線失敗時：

When Convex is not configured or unavailable:

- 應用會自動回退到瀏覽器 `localStorage`。
- The app automatically falls back to browser `localStorage`.

## 後續計畫 / Roadmap

- 增加正式路由，用於版塊頁與文本檔案頁。
- Add real routing for board pages and archive pages.

- 增加帳號系統與作者身份。
- Add accounts and author identity.

- 增加管理與審核權限。
- Add moderation and admin permissions.

- 將靜態書庫資料遷移為可編輯資料。
- Move static library/archive data into editable backend data.

- 增加來源欄位：版權狀態、版本、頁碼、URL。
- Add source metadata: copyright status, edition, page, and URL.

- 增加段落級中英對齊與術語表連結。
- Add paragraph-level bilingual alignment and glossary linking.
