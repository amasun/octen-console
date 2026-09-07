# 💻 TradeCode (Trae IDE / Nimbus Core) 独立主题参考

本文档基于 `TraeCode/` 体系，系统性归纳并定义了 **TradeCode (Trae Design Library / Nimbus Core)** 的全套暗色设计系统与 Token 参考标准。

这是一套面向**下一代 AI IDE、开发者工作台与数据密集型仪表盘**的专业 Dark-First 设计系统（暗色优先、高对比度、精准层级），与 Octen Console 现行的浅色卡片（Light Cult UI）形成互补的独立主题参考。

---

## 1. 核心架构与资源导览 (System Structure)

本主题已在工作区提供了完整的工程实现与组件库原型：

| 关键文件 / 目录 | 描述与用途 |
| :--- | :--- |
| [`TraeCode/colors_and_type.css`](file:///x:/XCoding/Octen/03-console/TraeCode/colors_and_type.css) | **权威 Token 源**：包含全量暗色变量定义（颜色、排版、间距、圆角） |
| [`TraeCode/css.json`](file:///x:/XCoding/Octen/03-console/TraeCode/css.json) | 机器可读的结构化设计 Token 投射（JSON 规范） |
| [`TraeCode/components.css`](file:///x:/XCoding/Octen/03-console/TraeCode/components.css) | 聚合组件样式定义（24 个原子/复合组件） |
| [`TraeCode/ui_kits/dev-explorer/index.html`](file:///x:/XCoding/Octen/03-console/TraeCode/ui_kits/dev-explorer/index.html) | **IDE 工作台展示**：Activity Rail、文件树、编辑器选项卡、终端、状态栏 |
| [`TraeCode/ui_kits/dashboard/index.html`](file:///x:/XCoding/Octen/03-console/TraeCode/ui_kits/dashboard/index.html) | **仪表盘展示**：统计卡片、数据表格、过滤表单、图表面板 |
| [`TraeCode/preview/`](file:///x:/XCoding/Octen/03-console/TraeCode/preview/) | 24 个组件的独立隔离预览页面 (`component-*.html`) |

---

## 2. 颜色 Token 体系 (Color System)

### 2.1 表面与暗色层级 (Dark Surfaces & Canvas)

TradeCode 采用细腻的三层底色叠加透明度覆层（Overlay），创造出深邃而不压抑的层次感：

| Token 变量名 | HEX / RGBA | 用途与层级角色 |
| :--- | :--- | :--- |
| `--bg-base-default` | `#1A1B1D` | **主画布底色 (Level 0)**：全屏根背景、终端主区域 |
| `--bg-base-secondary` | `#222427` | **面板背景 (Level 1)**：侧边栏、卡片、布局拆分面板 |
| `--bg-base-tertiary` | `#2A2D31` | **升起表面 (Level 2)**：输入框背景、次级容器、选中状态 |
| `--bg-overlay-l1` | `rgba(224, 226, 242, 0.04)` | 微弱半透明覆层（列表项轻微悬浮态） |
| `--bg-overlay-l2` | `rgba(224, 226, 242, 0.06)` | 中度半透明覆层（交互点击态） |
| `--bg-overlay-l3` | `rgba(224, 226, 242, 0.08)` | 强调覆层（活动选中项背景） |
| `--bg-overlay-l4` | `rgba(224, 226, 242, 0.12)` | 高亮覆层（徽章背景、高亮行） |
| `--bg-menu` | `#202123` | 浮动下拉菜单背景 |
| `--bg-tooltip` | `#1A1B1D` | 气泡提示 (Tooltip) 背景 |

### 2.2 品牌荧光绿 (Brand Cyber Emerald)

TradeCode 的灵魂高亮色，具备极高视认性：

| Token 变量名 | HEX / RGBA | 说明 |
| :--- | :--- | :--- |
| `--bg-brand` | `#32F08C` | 核心品牌亮绿（主按钮、激活指示条、焦点高亮） |
| `--bg-brand-hover` | `#0FDC78` | 品牌按钮悬停与按压态 |
| `--bg-brand-popup` | `rgba(50, 240, 140, 0.12)` | 品牌弱光晕背景、选中项透光底色 |
| `--text-brand` | `#32F08C` | 品牌绿文字高亮 |
| `--text-onbrand` | `#0C0C0D` | 品牌绿背景上的反色前景（极致纯黑，保证可读性） |

### 2.3 文字与图标阶度 (Typography & Icons)

| Token 变量名 | HEX | 对比度等级 | 应用场景 |
| :--- | :--- | :--- | :--- |
| `--text-default` | `#D1D3DB` | 高强调 (High) | 主标题、代码常规字符、正文第一层级 |
| `--text-default-hover` | `#F5F9FE` | 超高强调 (Peak) | 悬浮高亮、选中项主文本 |
| `--text-secondary` | `#9599A6` | 中强调 (Medium) | 辅助说明、副标题、标签名、非活动 Tab |
| `--text-tertiary` | `#666B75` | 低强调 (Low) | 占位符 (Placeholder)、禁用态文字、文件路径 |

### 2.4 边框与轮廓 (Borders & Dividers)

```css
--border-neutral-l1: rgba(224, 226, 242, 0.08); /* 极细面板分割线 */
--border-neutral-l2: rgba(224, 226, 242, 0.12); /* 常规卡片边框、输入框默认描边 */
--border-neutral-l3: rgba(224, 226, 242, 0.18); /* 输入框悬浮边框、按钮轮廓 */
--border-brand:      #32F08C;                     /* 获得焦点时的主品牌高亮边框 */
--border-contrast:   #D1D3DB;                     /* 高反差对比边框 */
```

### 2.5 状态与告警全色系 (Status & Semantic Matrix)

每个状态色均配备 `default | hover | active | surface-l1..l3`：

- **Primary (Blue)**: `--status-primary-default: #3C7EFF`
- **Success (Green)**: `--status-success-default: #32F08C`
- **Alert / Info (Cyan)**: `--status-alert-default: #4DD0E1`
- **Warning (Orange/Yellow)**: `--status-warning-default: #F29D79`
- **Error (Red)**: `--status-error-default: #F2858C`

### 2.6 代码编辑器与终端语法高亮 (Syntax Tokens)

专门针对代码编辑器 (`JetBrains Mono`, 13px / 20px 行高) 配套的语法色彩：

| 语法 Token | HEX | 语义标识 |
| :--- | :--- | :--- |
| `--code-text` | `#E0E3EE` | 普通代码文本 / 变量名 |
| `--code-doc` | `#7F838C` | 文档注释与单行注释 |
| `--code-link` | `#3C7EFF` | 链接与引用 |
| `--code-number` | `#F48CCA` | 数字字面量与布尔值 |
| `--code-action` | `#B38CFF` | 关键字 (async, import, return) |
| `--code-instruction` | `#F0D8FF` | 指令与装饰器 |
| `--code-function` | `#F29D79` | 函数调用与方法名 |
| `--code-constant` | `#80BBFF` | 宏、枚举与常量 |
| `--code-parameter` | `#82D99F` | 入参形参 |
| `--code-tag` | `#F2858C` | HTML/JSX 标签与类型定义 |

---

## 3. 几何与空间规范 (Geometry & Spacers)

### 3.1 紧凑圆角阶阶 (Radius Scale)
- `--radius-2`: `2px`（标签、代码片段微圆角）
- `--radius-4`: `4px`（按钮、小徽章、输入框标准圆角）
- `--radius-6`: `6px`（下拉菜单项、卡片内嵌模块）
- `--radius-8`: `8px`（面板主卡片、模态框）
- `--radius-10`: `10px`（外层浮窗）
- `--radius-full`: `9999px`（药丸标签、圆形头像）

### 3.2 间距标尺 (Spacers)
`0px / 4px / 6px / 8px / 12px / 16px / 24px / 32px / 40px`

---

## 4. 核心组件契约 (24 Core Components Inventory)

TradeCode 提供 24 个高度抽象的组件定义，完整覆盖开发者 IDE 及控制台场景：

1. **Activity Rail** (`activity-rail.json`): 左侧极窄全局导航条 (48px)，承载主要模式切换与头像。
2. **Workbench Titlebar** (`workbench-titlebar.json`): 窗口顶栏、面包屑路径、运行控制与全局搜索。
3. **Editor Tabs** (`editor-tabs.json`): 多文件标签切换栏，支持脏标记 (Dirty dot) 与关闭按钮。
4. **File Tree** (`file-tree.json`): 虚拟目录树，带缩进导向线、文件类型图标与悬浮动作。
5. **Chat Composer** (`chat-composer.json`): AI 对话输入框、模型选择器、上下文引用徽章与发送动作。
6. **Status Bar** (`status-bar.json`): 底部 22px 极窄状态栏（Git 分支、编码、行号、错误告警）。
7. **Stat Card** (`stat-card.json`): 关键指标卡片（吞吐量、延迟、Token 消耗微图）。
8. **Table Panel** (`table-panel.json`): 紧凑数据表格、带冻结列与排序指示。
9. **Buttons & Forms** (`buttons.json`, `forms.json`): 主次按钮、开关、输入框、下拉框。
10. **Dialog & Menu & Tooltip** (`dialog.json`, `menu.json`, `atoms.json`): 弹出层完整闭环。

---

## 5. 两套主题的对比与协同建议 (Theme Synergy)

| 场景维度 | Octen Console (Light Theme) | TradeCode (Dark-First Theme) |
| :--- | :--- | :--- |
| **设计风格** | 现代极简 Cult UI、白灰高对比、清爽通透 | 专业暗色 IDE、高密度极速终端、沉浸无干扰 |
| **主色调** | 翡翠绿 `#039855` + 纯黑 `#0A0A0A` | 荧光绿 `#32F08C` + 深空黑 `#1A1B1D` |
| **适用环境** | 业务管理控制台、用户计费、多模态搜索试用 | 开发者全功能工作台、高频日志监控、代码编辑中心 |
| **圆角偏好** | 8px ~ 16px 大圆角卡片流 | 2px ~ 6px 紧凑硬朗工业风 |
| **引入方式** | `octen-console/css/styles.css` | `TraeCode/colors_and_type.css` |

> [!TIP]
> **落地建议**：
> 1. Octen Console 的白天模式维持现行 `theme/README.md` 的 Cult UI 规范。
> 2. 当用户切换到「暗色模式 (Dark Mode)」或进入「代码深度调试 (Code Inspector)」时，直接映射并消费 `TradeCode` 的颜色与组件 Token。
