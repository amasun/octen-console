# Octen Console — Billing Tab Progress

## Style Reference
所有样式以 `log/octen-console-prototype.html` billing tab（`#page-billing`，line 2127–2693）为唯一基准。

---

## Working Files

| File | Description |
|------|-------------|
| `log/octen-console-prototype.html` | 原始原型（只读参考） |
| `octen-console-prototype-sun.html` | 主工作文件（从原型复制） |
| `log/billing-invoiced-v2.html` | Invoiced billing 独立页面 |

---

## Completed Changes

### `octen-console-prototype-sun.html`
- 删除 hero 右侧 "QPS Plan · Pro · 100" chip（postpaid btns 区）
- 页面初始固定在 billing tab（`go('billing')`，解除前保持）
- 初始 demo 状态锁定为：Owner · Active · Invoiced · Apply · First month

### `log/billing-invoiced-v2.html`
- 初始状态：`applyStatus('normal')`（Normal 按钮高亮激活）
- 标题 Title Case 统一：
  - `Current Cycle Usage`
  - `Payment Methods`
  - `Unpaid Invoices`
  - `Invoice History`
  - 表头 `Due Date`、`Date / Period`

---

## Pending / Notes
- `octen-console-prototype-sun.html` billing tab 固定初始状态待解除（用户确认后恢复 `go('overview')`）
