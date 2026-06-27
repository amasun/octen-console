# Octen Console — Billing Tab Progress

## Style Reference
所有样式以 `log/octen-console-prototype.html` billing tab（`#page-billing`，line 2127–2693）为唯一基准。

---

## Working Files

| File | Description |
|------|-------------|
| `billing-invoiced-v2.html` | **主工作文件** — Invoiced billing 独立页面 |
| `log/` | 原始参考文件（只读） |

---

## Completed Changes

### `billing-invoiced-v2.html`
- 初始状态：`applyStatus('normal')`（Normal 按钮高亮激活）
- 标题 Title Case 统一：
  - `Current Cycle Usage`
  - `Payment Methods`
  - `Unpaid Invoices`
  - `Invoice History`
  - 表头 `Due Date`、`Date / Period`
- 删除 `#unpaid-invoice-card` 组件（方案A）：移除顶部悬浮未付款警告卡片的 HTML div 及对应 JS 控制块
- 布局调整 + 全局日期格式化

---

## Git History

| Hash | Date | Message |
|------|------|---------|
| `73c2e71` | 2026-06-27 | feat: layout adjustments and global date formatting for billing-invoiced-v2.html |
| `33f783b` | 2026-06-27 | refactor: promote billing-invoiced-v2.html to root as main working file |
| `ae65a3e` | 2026-06-27 | chore: add .gitignore, untrack _archive |
| `8809b2a` | 2026-06-27 | chore: archive unrelated files (src, index, server, package.json) |
| `fddac38` | 2026-06-27 | docs: add git history to PROGRESS.md |
| `71b1072` | 2026-06-27 | Initial commit: billing tab work in progress |

---

## Pending / Notes
