@echo off
chcp 65001 >nul
title Octen Console Preview

:: 自动定位至包含 index.html 的 octen-console 目录
set "TARGET_DIR=%~dp0"
if exist "%~dp0octen-console\index.html" (
    set "TARGET_DIR=%~dp0octen-console"
)

cd /d "%TARGET_DIR%"

echo ========================================================
echo   Octen Console - 本地预览启动器
echo ========================================================
echo.
echo 工作目录: %CD%
echo 预览地址: http://localhost:3001
echo.
echo 正在打开默认浏览器...
start "" "http://localhost:3001"

echo 正在启动静态服务...
echo (提示: 保持此窗口开启以维持预览，按 Ctrl+C 可停止服务)
echo.

where pnpm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    pnpm dlx serve -l 3001 .
) else (
    where npx >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        npx -y serve -l 3001 .
    ) else (
        where node >nul 2>nul
        if %ERRORLEVEL% EQU 0 (
            node scripts\preview.js
        ) else (
            echo [错误] 未检测到 pnpm/node 环境，请先安装 Node.js！
            pause
        )
    )
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 服务已退出，按任意键关闭窗口...
    pause >nul
)
