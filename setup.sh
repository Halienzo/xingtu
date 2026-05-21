#!/bin/bash
set -e

PROJECT_DIR="$HOME/projects/english-star-map"
ZIP_FILE="${1:-app-project.zip}"

echo "========================================"
echo "  英语星途系统 - Codex CLI 初始化脚本"
echo "========================================"
echo ""

# 检查 zip 文件
if [ ! -f "$ZIP_FILE" ]; then
    echo "错误: 找不到 $ZIP_FILE"
    echo ""
    echo "请将 app-project.zip 放到以下位置之一:"
    echo "  1. 当前目录 ($(pwd))"
    echo "  2. 通过参数指定路径: bash setup.sh /path/to/app-project.zip"
    echo ""
    echo "从 Kimi 下载的 app-project.zip 后，运行:"
    echo "  bash setup.sh"
    exit 1
fi

# 创建项目目录
echo "[1/7] 创建项目目录: $PROJECT_DIR"
mkdir -p "$PROJECT_DIR"

# 获取 zip 绝对路径
ZIP_PATH="$(cd "$(dirname "$ZIP_FILE")" && pwd)/$(basename "$ZIP_FILE")"

# 解压
echo "[2/7] 解压项目文件..."
cd "$PROJECT_DIR"
unzip -q -o "$ZIP_PATH"

# 检查解压结果
if [ ! -d "app" ]; then
    echo "错误: 解压后未找到 app/ 目录"
    exit 1
fi

cd app
echo "      项目路径: $(pwd)"

# 检查关键文件
echo "[3/7] 验证项目结构..."
REQUIRED_FILES=(
    "package.json"
    "vite.config.ts"
    "src/App.tsx"
    "src/main.tsx"
    "src/data/calendarData.json"
    "src/sections/HomePage.tsx"
    "src/sections/GrammarSystem.tsx"
    "src/sections/PunctuationSandbox.tsx"
    "src/sections/WordFlashcards.tsx"
    "src/sections/ComprehensiveReader.tsx"
    "src/components/StarBackground.tsx"
)

MISSING=0
for f in "${REQUIRED_FILES[@]}"; do
    if [ -f "$f" ]; then
        echo "      [OK] $f"
    else
        echo "      [MISSING] $f"
        MISSING=$((MISSING + 1))
    fi
done

if [ $MISSING -gt 0 ]; then
    echo "警告: $MISSING 个关键文件缺失"
fi

# 安装依赖
echo "[4/7] 安装 npm 依赖..."
npm install

# 安装额外依赖（如果不存在）
echo "[5/7] 检查额外依赖..."
npm list framer-motion >/dev/null 2>&1 || npm install framer-motion
npm list lucide-react >/dev/null 2>&1 || npm install lucide-react
npm list vite-plugin-singlefile >/dev/null 2>&1 || npm install -D vite-plugin-singlefile

# 验证 Vite 配置
echo "[6/7] 验证构建配置..."
if ! grep -q "vite-plugin-singlefile" vite.config.ts 2>/dev/null; then
    echo "      警告: vite.config.ts 中未找到 singlefile 插件"
    echo "      如需单文件构建，请确保配置中包含:"
    echo "        import { viteSingleFile } from 'vite-plugin-singlefile'"
    echo "        plugins: [react(), viteSingleFile()]"
fi

# 尝试首次构建
echo "[7/7] 首次构建验证..."
npm run build 2>&1 | tail -5

BUILD_SIZE=$(du -h dist/index.html 2>/dev/null | cut -f1 || echo "N/A")
echo "      构建成功: dist/index.html ($BUILD_SIZE)"

echo ""
echo "========================================"
echo "  初始化完成! 接下来:"
echo "========================================"
echo ""
echo "  1. 启动开发服务器:"
echo "     cd $PROJECT_DIR/app"
echo "     npm run dev"
echo ""
echo "  2. 启动 Codex CLI:"
echo "     cd $PROJECT_DIR/app"
echo "     codex --full-context"
echo ""
echo "  3. 在 Codex 中开始工作:"
echo "     > 帮我安装所有依赖并启动开发服务器"
echo "     > 请扫描整个项目并输出架构"
echo "     > [你的开发任务]"
echo ""
echo "  4. 生产构建:"
echo "     npm run build"
echo "     # 输出: dist/index.html (单文件，双击运行)"
echo ""
echo "========================================"
