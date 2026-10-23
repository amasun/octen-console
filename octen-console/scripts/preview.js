const { exec, spawn } = require('child_process');
const path = require('path');

const PORT = 3001;
const URL = `http://localhost:${PORT}`;
const APP_DIR = path.resolve(__dirname, '..');

console.log('\x1b[32m%s\x1b[0m', '========================================');
console.log('\x1b[32m%s\x1b[0m', '  Octen Console - 正在启动本地预览...');
console.log('\x1b[32m%s\x1b[0m', '========================================');

// 打开默认浏览器 (跨平台适配)
const openBrowser = () => {
  console.log('\x1b[36m%s\x1b[0m', `正在打开浏览器: ${URL}`);
  const startCmd = process.platform === 'win32' ? `start "" "${URL}"` :
                   process.platform === 'darwin' ? `open "${URL}"` : `xdg-open "${URL}"`;
  exec(startCmd, (err) => {
    if (err) console.warn('无法自动打开浏览器，请手动访问:', URL);
  });
};

setTimeout(openBrowser, 800);

console.log('\x1b[33m%s\x1b[0m', `正在启动静态服务 (端口: ${PORT})...`);

const isWin = process.platform === 'win32';
const shellCmd = isWin ? 'cmd.exe' : 'sh';
const shellArgs = isWin
  ? ['/c', `where pnpm >nul 2>nul && pnpm dlx serve -l ${PORT} . || npx -y serve -l ${PORT} .`]
  : ['-c', `command -v pnpm >/dev/null 2>&1 && pnpm dlx serve -l ${PORT} . || npx -y serve -l ${PORT} .`];

const server = spawn(shellCmd, shellArgs, {
  cwd: APP_DIR,
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error('启动服务失败:', err.message);
  console.log(`请直接在终端运行: cd octen-console && pnpm dlx serve -l ${PORT} .`);
});
