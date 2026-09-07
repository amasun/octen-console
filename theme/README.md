# 🎨 Octen Console 颜色 Token 规范 (Theme Tokens)

本文档归纳并抽象了 **Octen Console** 现行界面的全部设计系统颜色 Token（Design Tokens），遵循 **Cult UI 4-Color 极简灰阶体系** 与语义化规范，为后续组件复用、跨端还原及样式维护提供标准参考。

---

## 1. 核心设计原则 (Design Principles)

1. **4-Color Grayscale (极简 4 阶灰)**：界面的基础中性色严格收敛至 4 个基准阶度，避免任意 Tailwind 灰阶（如 slate-500, gray-400）造成的视觉混乱。
2. **High-Contrast Surface (高反差基底)**：采用 `#F5F5F5` 工作区背景叠加 `#FFFFFF` 纯白内容卡片，通过背景明度对比与 1px 微轮廓分隔层级，而非厚重硬边框。
3. **Emerald Brand Signature (翡翠绿品牌标识)**：以 `#039855` 作为品牌主色、活跃指示与主要动作强调，辅以 OKLab 混合微透色。
4. **Data & Code Elegance (浅色代码优雅度)**：摒弃传统全黑高对比代码块，采用半透明柔和基底与 `JetBrains Mono` 浅色高亮。

---

## 2. 基础色彩矩阵 (Base Color System)

### 2.1 极简 4-Color 主中性色 (Primary Grayscale)

| Token 变量名 | HEX / 格式 | 角色定位 | 应用场景 |
| :--- | :--- | :--- | :--- |
| `--color-primary` | `#0A0A0A` | 高强调 (High Emphasis) | 大标题、主要按钮文本、活动 Tab 文字、主要图标、代码主文本 |
| `--color-secondary` | `#737373` | 中强调 (Medium Emphasis) | 正文描述、次要标签、未激活 Tab、导航未选中文本、辅助提示 |
| `--color-tertiary` | `#A3A3A3` | 低强调 (Low Emphasis) | 输入框占位符 (Placeholder)、次级元数据、禁用状态、微弱图标 |
| `--color-surface` | `#F5F5F5` | 基底强调 (Surface / Canvas) | 工作区总背景 (`--bg-workspace`)、分段控制器背景、输入框悬浮态 |
| `--color-white` | `#FFFFFF` | 纯白承载 (Card / Surface) | 主布局面板 (`.layout-pane`)、弹窗背景、选中的分段控制器卡片 |

### 2.2 边框与分割线 (Borders & Dividers)

| Token 变量名 | HEX / 格式 | 应用规范 |
| :--- | :--- | :--- |
| `--border-form` | `#DBDBDB` | 所有表单控件的基准边框（输入框、下拉选框、分段药丸组外框） |
| `--border-pane` | `#E7E7E7` | 主布局面板 (`.layout-pane`) 1px 细微物理边框 |
| `--border-subtle` | `rgba(0, 0, 0, 0.05)` | 列表项分割线、极弱内部线条 |
| `--border-focus` | `#039855` | 元素获得焦点（Focus-Visible）时的轮廓边框 |

---

## 3. 品牌与语义辅助色 (Brand & Semantic Tokens)

### 3.1 品牌翡翠绿阶 (Octen Cyber Emerald)

| Token 变量名 | 值 / 计算式 | 说明 |
| :--- | :--- | :--- |
| `--color-accent` | `#039855` | Octen 品牌主绿，用于主 CTA 按钮、激活状态、选中边框 |
| `--color-accent-hover` | `#027A44` | 主按钮悬浮态、深沉按压态 |
| `--color-accent-1` | `color-mix(in oklab, #039855 64%, #fff 36%)` | 浅绿高亮微光、标签浅色边框 |
| `--color-accent-3` | `color-mix(in oklab, #039855 50%, transparent 75%)` | 激活光晕、输入框聚焦阴影 (`--shadow-input-active`) |
| `--badge-ea-bg` | `#E3FFE2` | Early Access / 新功能标签浅色药丸底色 |
| `--badge-ea-border` | `#6FD1A5` | Early Access 标签描边 |
| `--badge-ea-text` | `#1B9C62` | Early Access 标签字色 |

### 3.2 功能状态色 (Functional & Status)

| 语义类型 | Token 变量名 | HEX / 格式 | 含义与场景 |
| :--- | :--- | :--- | :--- |
| **Success** | `--color-success` | `#039855` / `rgb(18, 170, 95)` | API 成功返回 200、服务健康状态正常 |
| **Error / Danger**| `--color-danger` | `#E13C42` / `rgb(225, 60, 66)` | API 错误 500、危险操作（删除 Key、注销账户） |
| **Warning** | `--color-warning` | `#DC7828` / `rgb(220, 120, 40)` | 配额告警、即达限额、黄色警戒提示 |
| **Info / Blue** | `--color-info` | `#286EEB` / `rgb(40, 110, 235)` | 引导提示、文档跳转链接、信息高亮 |
| **Purple** | `--color-purple` | `#8C5AEB` / `rgb(140, 90, 235)` | 特殊多模态能力、高阶模型网关标识 |

---

## 4. 阴影与微光系统 (Elevation & Glassmorphism)

```css
/* 精细轮廓与浮层阴影 */
--shadow-outline: 0 0 0 1px rgba(0, 0, 0, 0.04);
--shadow-faint:   0px 3px 15px 0px rgba(0, 0, 0, 0.03);
--shadow-muted:   0px 3px 18px 0px rgba(0, 0, 0, 0.04);
--shadow-normal:  0px 8px 30px 0px rgba(0, 0, 0, 0.05); /* 卡片浮起主阴影 */
--shadow-strong:  0px 6px 28px 0px rgba(0, 0, 0, 0.12); /* 模态弹窗阴影 */

/* 复合引用阴影 */
--shadow-s: var(--shadow-outline), var(--shadow-normal);
--shadow-l: var(--shadow-outline), var(--shadow-strong);

/* 控件交互状态 */
--shadow-input: 0 0 0 0.5px rgba(0, 0, 0, 0.08);
--shadow-input-active: 0 0 0 2.5px var(--color-accent-3);
```

---

## 5. 组件级语义 Token 映射 (Component Tokens)

### 5.1 主面板容器 (`.layout-pane`)
- **背景**: `#FFFFFF` (`var(--background-primary)`)
- **边框**: `1px solid #E7E7E7`
- **圆角**: `16px` (`rounded-2xl`)
- **阴影**: `var(--shadow-s)`

### 5.2 浅色代码视窗 (`.ui-code-container`)
- **背景**: `rgba(245, 245, 245, 0.50)` (`bg-[#f5f5f5]/50`)
- **边框**: `1px solid #F5F5F5`
- **圆角**: `8px` (`rounded-lg`)
- **字体**: `'JetBrains Mono', ui-monospace, monospace` (字号 13px, 行高 1.6)

### 5.3 分段控制器与药丸组 (`.ui-pills` / `.seg-group`)
- **容器背景**: `#F5F5F5`
- **未激活项**: 背景透明，文字 `#737373`
- **激活项**: 背景 `#FFFFFF`，文字 `#0A0A0A`，阴影 `0 1px 3px rgba(0, 0, 0, 0.05)`
- **标准高度**: `32px`

### 5.4 表单输入与按钮 (`.ui-input` / `.ui-btn-*`)
- **输入框高度**: `32px`
- **输入框边框**: `1px solid #DBDBDB` (Focus: `#039855`)
- **主按钮**: 背景 `#0A0A0A`，文字 `#FFFFFF` (Hover: `#262626`)
- **品牌按钮**: 背景 `#039855`，文字 `#FFFFFF` (Hover: `#027A44`)
- **线框按钮**: 背景 `#FFFFFF`，边框 `1px solid #DBDBDB`，文字 `#0A0A0A`

---

## 6. CSS 变量一键引入清单 (Tokens Ready-to-use)

```css
:root {
  /* 基础 4-Color */
  --color-primary: #0A0A0A;
  --color-secondary: #737373;
  --color-tertiary: #A3A3A3;
  --color-surface: #F5F5F5;
  --color-white: #FFFFFF;

  /* 边框 */
  --border-form: #DBDBDB;
  --border-pane: #E7E7E7;

  /* 品牌色 */
  --color-accent: #039855;
  --color-accent-hover: #027A44;
  --color-accent-1: color-mix(in oklab, var(--color-accent) 64%, #fff 36%);
  --color-accent-3: color-mix(in oklab, var(--color-accent) 50%, transparent 75%);

  /* 状态色 */
  --color-success: #039855;
  --color-danger: #E13C42;
  --color-warning: #DC7828;
  --color-info: #286EEB;

  /* 阴影 */
  --shadow-outline: 0 0 0 1px rgba(0, 0, 0, 0.04);
  --shadow-normal: 0px 8px 30px 0px rgba(0, 0, 0, 0.05);
  --shadow-strong: 0px 6px 28px 0px rgba(0, 0, 0, 0.12);
}
```
