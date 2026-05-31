# Arcana Commons Forum

中文 / English

Arcana Commons 是一个面向公版文本、神秘学研究、中英对照阅读、来源核验与学术讨论的静态论坛原型。项目现在已经加入 Convex 后端接入层，可以在配置后把主题、回复、浏览数与阅读笔记保存到 Convex；未配置 Convex 时会自动回退到浏览器 `localStorage`。

Arcana Commons is a static forum prototype for public-domain texts, occult studies, bilingual reading, source verification, and scholarly discussion. The project now includes a Convex backend integration layer. When configured, threads, replies, view counts, and reading notes are stored in Convex; without Convex configuration, the app falls back to browser `localStorage`.

## 功能概览 / Features

- 论坛分区：公版文本、中英对照、研究札记、站务与共建。
- Forum boards: public-domain texts, bilingual reading, research notes, and site operations.

- 主题索引：支持版块筛选、关键词搜索、回复数/浏览数/最近活动排序。
- Thread index: board filtering, keyword search, and sorting by replies, views, or recent activity.

- 主题详情：弹窗查看正文、标签、作者、回复与回复表单。
- Thread detail view: modal display for body, tags, author, replies, and reply form.

- 中英对照阅读：支持段落切换、字号调整、双栏/单栏切换、术语卡和引用发帖。
- Bilingual reader: passage switching, font-size controls, parallel/single-column layouts, glossary cards, and quote-to-thread actions.

- 公版书库：提供文本档案入口，并展示年代、类别、状态、资源与讨论入口。
- Public-domain library: archive entries with date, category, status, resources, and discussion links.

- 阅读笔记：按阅读文本和段落保存笔记。
- Reading notes: notes are saved by reading text and passage.

- Convex 后端：可保存主题、回复、阅读笔记与浏览数。
- Convex backend: stores threads, replies, reading notes, and view counts.

- 专业标签体系：主题支持多标签，并按 period、language、tradition、topic、source-type 分类。
- Professional tag system: threads support multiple tags categorized by period, language, tradition, topic, and source-type.

## 技术栈 / Tech Stack

- 前端：原生 HTML、CSS、JavaScript。
- Frontend: plain HTML, CSS, and JavaScript.

- 后端：Convex。
- Backend: Convex.

- 本地回退：`localStorage`。
- Local fallback: `localStorage`.

## 文件结构 / File Structure

```text
.
├── index.html
├── styles.css
├── script.js
├── config.example.js
├── convex/
│   ├── schema.js
│   ├── forum.js
│   └── _generated/
├── package.json
├── package-lock.json
├── CONVEX_INTEGRATION.md
└── README.md
```

- `index.html`：页面结构、导航、弹窗与文本档案容器。
- `index.html`: page structure, navigation, modals, and archive containers.

- `styles.css`：布局、主题、响应式样式与阅读/档案页面视觉。
- `styles.css`: layout, themes, responsive styling, and reader/archive visuals.

- `script.js`：论坛渲染、搜索排序、阅读器交互、发帖回复、Convex/本地存储切换。
- `script.js`: forum rendering, search and sorting, reader interactions, posting/replying, and Convex/local persistence switching.

- `convex/schema.js`：Convex 数据表定义。
- `convex/schema.js`: Convex table schema.

- `convex/forum.js`：Convex 查询与 mutation 函数。
- `convex/forum.js`: Convex queries and mutations.

- `config.example.js`：Convex URL 配置示例。
- `config.example.js`: example Convex URL configuration.

## 本地运行 / Local Usage

安装依赖：

Install dependencies:

```bash
npm install
```

启动 Convex：

Start Convex:

```bash
npx convex dev
```

复制示例配置：

Copy the example config:

```bash
cp config.example.js config.js
```

然后把 `config.js` 中的地址改成你的 Convex 部署地址：

Then update `config.js` with your Convex deployment URL:

```js
window.CONVEX_URL = "https://your-deployment.convex.cloud";
```

如果使用本地 Convex 开发环境，也可以填入：

For local Convex development, you can use:

```js
window.CONVEX_URL = "http://127.0.0.1:3210";
```

最后直接用浏览器打开 `index.html`，或通过任意静态文件服务器预览。

Finally, open `index.html` directly in a browser or serve the folder with any static file server.

## Cloudflare Pages 部署 / Cloudflare Pages Deployment

推荐部署方式：

Recommended deployment:

1. 在 Cloudflare Pages 后台选择 **Connect to Git**。
2. In Cloudflare Pages, choose **Connect to Git**.

3. 选择 GitHub 仓库 `Hamforach/website`。
4. Select the GitHub repository `Hamforach/website`.

5. Framework preset 选择 `None`。
6. Set framework preset to `None`.

7. Build command 填写：
8. Use this build command:

```bash
npm run build
```

9. Build output directory 填写：
10. Use this build output directory:

```text
dist
```

如果要让线上论坛共享数据，请在 Cloudflare Pages 的环境变量里加入：

To make the online forum share data, add this environment variable in Cloudflare Pages:

```text
CONVEX_URL=https://your-production-deployment.convex.cloud
```

构建脚本会把 `CONVEX_URL` 写入线上 `dist/config.js`。如果没有设置该环境变量，网站仍会运行，但每个访问者的数据只会保存在自己的浏览器 `localStorage` 中。

The build script writes `CONVEX_URL` into the deployed `dist/config.js`. If the variable is not set, the site still runs, but each visitor's data is stored only in their own browser `localStorage`.

## 数据保存 / Persistence

配置 Convex 后：

When Convex is configured:

- 主题保存到 `threads` 表。
- Threads are saved to the `threads` table.

- 回复保存到 `replies` 表。
- Replies are saved to the `replies` table.

- 阅读笔记保存到 `readingNotes` 表。
- Reading notes are saved to the `readingNotes` table.

- 浏览数通过 Convex mutation 更新。
- View counts are updated through a Convex mutation.

- 主题标签以 `tags` 数组保存，每个标签包含 `name` 和 `category`。
- Thread tags are stored as a `tags` array, where each tag has a `name` and `category`.

标签分类：

Tag categories:

```text
period       Antiquity, Late Antiquity, Renaissance
language     Latin, Greek, Chinese, English
tradition    Hermeticism, Neoplatonism, Gnosticism
topic        translation, commentary, source-check
source-type  public-domain, uncertain-source, needs-verification
```

未配置 Convex 或连接失败时：

When Convex is not configured or unavailable:

- 应用会自动回退到浏览器 `localStorage`。
- The app automatically falls back to browser `localStorage`.

## 后续计划 / Roadmap

- 增加正式路由，用于版块页与文本档案页。
- Add real routing for board pages and archive pages.

- 增加账号系统与作者身份。
- Add accounts and author identity.

- 增加管理与审核权限。
- Add moderation and admin permissions.

- 将静态书库数据迁移为可编辑数据。
- Move static library/archive data into editable backend data.

- 增加来源字段：版权状态、版本、页码、URL。
- Add source metadata: copyright status, edition, page, and URL.

- 增加段落级中英对齐与术语表链接。
- Add paragraph-level bilingual alignment and glossary linking.
