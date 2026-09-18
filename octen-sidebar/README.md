# Octen Sidebar — 独立侧边栏工程化套件

本目录是专为**单独调整与优化侧边栏结构**而构建的独立工程套件。通过将侧边栏从原主项目（`octen-console`）中彻底解耦，提供纯净的独立调试预览画板与数据驱动配置，让您无需受到主项目繁重代码干扰，即可快速重构与打磨侧边栏。

---

## 📁 目录结构

```
octen-sidebar/
├── index.html                 # 独立调试与预览工作台入口
├── package.json               # 本地预览启动脚本
├── README.md                  # 本说明文档
├── css/
│   ├── tokens.css             # Octen 标准设计变量 (Light & TraeWork Dark 双主题)
│   ├── sidebar.css            # 侧边栏独立组件样式 (纯净模块化，无全局污染)
│   └── workbench.css          # 调试工作台画板与交互日志样式
└── js/
    ├── sidebar-config.js      # 核心结构配置表（数据驱动：菜单分组/路由/图标/组织/用户）
    ├── sidebar-component.js   # 侧边栏核心组件 (DOM 渲染、事件生命周期、下拉与弹窗控制)
    ├── theme.js               # 独立主题服务 (Light / Dark / System 切换与持久化)
    └── app.js                 # 工作台初始化入口、事件联动与调试监听
```

---

## 🚀 启动与预览

在 `octen-sidebar` 目录下运行：

```bash
# 启动独立侧边栏预览服务 (默认端口 3001)
pnpm dev
```

在浏览器中打开：[http://localhost:3001](http://localhost:3001)

> **小贴士**：如果您使用的是主项目静态服务（3000 端口），也可以通过直接访问 [http://localhost:3000/../octen-sidebar/index.html](http://localhost:3000) 或同类静态路径进行调试。

---

## ⚙️ 如何调整侧边栏结构

侧边栏采用**数据驱动设计**，所有菜单结构、图标、徽标、分组与组织选项全部声明在 [`js/sidebar-config.js`](file:///x:/XCoding/Octen/03-console/octen-sidebar/js/sidebar-config.js) 中：

### 1. 增减或修改导航项与分组
在 `navigation` 数组中修改对应分组：
```javascript
{
  group: 'API',
  items: [
    {
      id: 'my-new-api',               // 唯一路由标识
      title: 'My New API',            // 菜单展示名称
      icon: `<svg>...</svg>`,         // 内联 SVG 图标
      badge: 'New',                   // 可选徽标：'New' / 'Beta' / null
      disabled: false,                // 是否置灰禁用
      external: false,                // 是否为外链 (target="_blank")
      href: '#'                       // 目标跳转链接
    }
  ]
}
```

### 2. 调整组织与工作空间
在 `workspace.organizations` 中增删团队或组织：
```javascript
workspace: {
  currentId: 'org',
  organizations: [
    { id: 'personal', name: "Jane Niu's Personal" },
    { id: 'org', name: 'Acme Inc' },
    { id: 'custom-team', name: 'AI Core Team' }
  ]
}
```

### 3. 自定义底部账户弹层菜单
在 `user.popoverLinks` 中配置快捷入口（如 API Keys、Docs、Contact us 等）。

---

## 🎨 主题与样式微调

- **设计变量**：在 [`css/tokens.css`](file:///x:/XCoding/Octen/03-console/octen-sidebar/css/tokens.css) 中定义了 `--sidebar-width`、`--sidebar-primary`、`--sidebar-bg` 等变量，修改后在浅色与暗色模式下即时生效。
- **组件样式**：所有侧边栏类名均以语义化命名存放在 [`css/sidebar.css`](file:///x:/XCoding/Octen/03-console/octen-sidebar/css/sidebar.css)，便于后期打包或回合。

---

## 🔄 同步回主项目说明

当您在此独立工程中调整满意后，同步回主项目 `octen-console` 只需：
1. 将 `sidebar-component.js` 的渲染逻辑或者新生成的 HTML 结构替换到 `octen-console/js/core/sidebar.js`。
2. 如有新的 CSS 类，补充至 `octen-console/css/styles.css`。
