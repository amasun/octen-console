# Octen Console — 项目交接文档

> **更新时间**：2026-07-16  
> **当前分支**：master  
> **最新 commit**：2106409

---

## 一、本轮完成的重大改动（SPA 架构重构）

### 文件拆分（原 2239 行 → 56 行）

| 文件 | 说明 |
|------|------|
| index.html | 56 行骨架，仅含容器 + script 引用 |
| js/app.js | SPA 路由器，go(pageId) 函数 |
| js/sidebar.js | 侧边栏 HTML 模板（动态注入） |
| js/modals.js | 全部弹窗 HTML（动态注入 body） |
| js/pages/page-overview.js | Overview 页面模板 |
| js/pages/page-billing.js | Billing 页面模板 |
| js/pages/page-broad-search-api.js | Broad Search API 页面模板 |

### 修复列表

| 问题 | 修复方案 |
|------|------|
| Overview 布局错乱 | 从 prototype 重新提取正确 HTML |
| Model 未改为 Model Gateway | 侧边栏和卡片均已统一，SVG viewBox="0 0 18 18" |
| Overview 最大宽度 | max-w-[1440px] |
| Broad Search API Python 代码空白 | go() 后调用 bsaSetLang('python') |
| 乱码（U+FFFD） | 修复 index.html、sidebar.js、modals.js |

---

## 二、路由机制

`
window.go(pageId):
  1. 更新侧边栏 active 状态
  2. 将 window.pageHtml[page-pageId] 注入 #page-container
  3. 调用页面初始化 hook

DOMContentLoaded → go('overview')
`

### 页面 Hook 注册（app.js）

- overview → setupOverviewTabs()  
- broad-search-api → initBroadSearchApi() + bsaSetLang('python')

---

## 三、Script 加载顺序（重要！）

modals.js → app.js → sidebar.js → page-*.js

---

## 四、未完成事项

- [ ] 其余页面未拆分：broad-search、web-search、image-search、video-search、extract、model、api-keys、usage、settings、deep-research 等，仍在 octen-console-prototype.html 中
- [ ] response-preview-fragment.html 已删除（git status 显示 D），需确认

---

## 五、设计规范要点

- 主色：#039855（green）
- 文字：#0a0a0a / #737373 / #a3a3a3
- 边框：#dbdbdb
- Overview 最大宽度：max-w-[1440px]
- Model Gateway SVG：viewBox="0 0 18 18"，stroke+fill 组合
- 侧边栏 icon 与 Overview 卡片 icon 保持一致

---

## 六、关键文件路径

- octen-console/index.html ← 骨架 56 行
- octen-console/js/app.js ← SPA 路由器
- octen-console/js/sidebar.js ← 侧边栏模板
- octen-console/js/modals.js ← 所有弹窗
- octen-console/js/pages/ ← 页面模板目录
- octen-console-prototype.html ← 原始参考文件，勿删
- .agents/skills/octen-ui-design/ ← Cult UI 设计规范 Skill

---

## 七、多 AI 协同注意事项

- 修改前先读取最新文件内容，不依赖上下文记忆
- 怀疑冲突时先 git status 确认，发现不一致立即报告用户
- 不自动覆盖可能被另一 AI 修改的内容
