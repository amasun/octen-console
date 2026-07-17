# Octen Console UI Refactoring - Handoff Context

## 1. 当前项目进度 (Current Project Progress)
我们正在对 Octen Console 进行全面的 UI 重构，目标是将原有的硬编码冗长 Tailwind 类名替换为遵循 `card-layer-layout` 和 `octen-ui-design` 的语义化、可复用组件类名。目前已经完成了对核心搜索控制台（Extract, Web Search, Broad Search API, Multimodal Search, Image Search, Video Search）的左右分栏 (Pane) 布局改造。

## 2. 核心设计决策 (Core Design Decisions)
- **语义化组件抽取**：我们将通用的 UI 组件抽象到了 `css/styles.css` 的末尾（包括 `.ui-label`, `.ui-input`, `.ui-btn-primary`, `.ui-btn-outline`, `.ui-checkbox`, `.ui-code-container`, `.ui-tab-bar`, `.ui-tab` 等）。
- **Segmented Control 统一**：采用 `.seg-group` 容器，其内部子元素活跃态统一为 `bg-white shadow-sm text-[#0a0a0a]`，非活跃态为 `bg-transparent text-[#737373]`，并配合 `justify-center items-center` 居中。
- **代码高亮与排版统一 (Light Theme)**：摒弃了之前散落在各处的深色代码背景。现在的代码框统一使用 `.ui-code-container` 撑满高度，并通过 `js/core/syntax-highlight.js` 强制输出带浅色背景的 `JetBrains Mono` 字体，字号统一为 `13px`。

## 3. 已解决的Bug (Resolved Bugs)
- **容器无法撑开问题**：修复了 SPA 架构下外层缺乏高度设定的问题。为 `multimodal-search` 等页面的 `.page` 和 `#mm-root` 添加了 `h-full`，保证代码区域 (`.ui-code-container`) 能够借助 `flex: 1` 占满剩余空间，避免截断。
- **Tabs 样式丢失/错乱**：在重构过程中修复了由于缺失全局 CSS 类导致的 Request/Response 选项卡连在一起且无边框的问题。
- **Extract 初始代码不可见**：修复了 Extract 页面进入时不会立刻渲染 Request 代码的问题，通过正确的初始 `innerHTML` 注入解决。
- **Multimodal 暗色代码块不协调**：清除了 `search-instances.js` 内部自带的仿 GitHub Dark 配色，统一调度了全局通用的 `PGS_codeBlock` 函数。

## 4. 下一步计划 (Next Steps)
- 检查剩下非搜索相关的控制台页面（如 Settings, API Keys, Billing），看看是否有遗留的非标输入框、按钮或表格，需要使用 `.ui-input` 和 `.ui-btn-*` 进行替换。
- 对齐所有的弹窗（Modal）和侧边栏（Sidebar）的阴影层级和圆角规范，确保复合组件不脱离 4-color 极简黑白灰（Cult UI）规范。
- 清理项目中已经废弃的旧的行内 `style="..."` 以及不再使用的冗余 Tailwind 工具类。
