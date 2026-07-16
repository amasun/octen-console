# 项目级 AI 行为准则 (Workspace AGENTS Rules)

## 本地 Web 服务访问规则
- **固定 IP 预览**：当通过浏览器或 HTTP 检查/预览本地开发服务（例如 Live Preview、Live Server、Vite 等）时，URL 必须统一使用 `http://127.0.0.1:<port>`，禁止默认使用 `http://localhost:<port>`，以确保与本地开发服务器监听地址一致。
