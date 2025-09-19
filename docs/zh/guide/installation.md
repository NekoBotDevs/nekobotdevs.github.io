# 安装指南

本指南提供NekoBot的详细安装步骤，支持多种安装方式。

## 系统要求

### 最低要求
- **操作系统**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Python**: 3.8 或更高版本
- **内存**: 4GB RAM
- **存储**: 1GB 可用空间
- **网络**: 稳定的互联网连接

### 推荐配置
- **操作系统**: Windows 11, macOS 12+, Ubuntu 20.04+
- **Python**: 3.10 或更高版本
- **内存**: 8GB+ RAM
- **存储**: 5GB+ 可用空间
- **网络**: 高速互联网连接

## 安装方式

### 方式一：源码安装（推荐）

#### 1. 克隆仓库

```bash
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot
```

#### 2. 创建虚拟环境

使用venv（Python内置）：

```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

或使用uv（推荐，更快）：

```bash
# 安装uv
pip install uv

# 创建虚拟环境
uv venv

# 激活虚拟环境
# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

#### 3. 安装依赖

```bash
pip install -r requirements.txt
```

#### 4. 初始化配置

```bash
python main.py --init
```

### 方式二：Docker安装

#### 1. 安装Docker

确保已安装Docker和Docker Compose：

```bash
# 检查Docker版本
docker --version
docker-compose --version
```

#### 2. 下载配置文件

```bash
# 下载docker-compose.yml
curl -O https://raw.githubusercontent.com/NekoBotDevs/NekoBot/main/docker-compose.yml

# 下载环境变量文件
curl -O https://raw.githubusercontent.com/NekoBotDevs/NekoBot/main/.env.example
cp .env.example .env
```

#### 3. 启动服务

```bash
docker-compose up -d
```

### 方式三：预编译包

::: warning 注意
预编译包正在开发中，敬请期待！
:::

## 配置说明

### 环境变量

创建`.env`文件配置环境变量：

```env
# 基础配置
NEKOBOT_HOST=0.0.0.0
NEKOBOT_PORT=8080
NEKOBOT_DEBUG=false

# 数据库配置
DATABASE_URL=sqlite:///nekobot.db

# JWT配置
JWT_SECRET_KEY=your-secret-key-here

# CORS配置
CORS_ORIGINS=http://localhost:3000,http://localhost:8080

# 日志配置
LOG_LEVEL=INFO
LOG_FILE=logs/nekobot.log

# 插件配置
PLUGIN_DIR=data/plugins
PLUGIN_AUTO_RELOAD=true

# LLM配置（可选）
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

### 配置文件

主要配置文件位于`config/`目录：

- `config.yaml` - 主配置文件
- `platforms.yaml` - 平台配置
- `llm.yaml` - LLM服务商配置
- `plugins.yaml` - 插件配置

## 平台特定安装

### Windows

#### 使用PowerShell

```powershell
# 克隆项目
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# 创建虚拟环境
python -m venv venv
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 启动服务
python main.py
```

#### 使用Chocolatey

```powershell
# 安装Python（如果未安装）
choco install python

# 后续步骤同上
```

### macOS

#### 使用Homebrew

```bash
# 安装Python（如果未安装）
brew install python

# 克隆项目
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 启动服务
python main.py
```

### Linux (Ubuntu/Debian)

```bash
# 更新包管理器
sudo apt update

# 安装Python和依赖
sudo apt install python3 python3-pip python3-venv git

# 克隆项目
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 启动服务
python main.py
```

### Linux (CentOS/RHEL)

```bash
# 安装Python和依赖
sudo yum install python3 python3-pip git

# 后续步骤同上
```

## 验证安装

### 1. 检查服务状态

```bash
# 检查进程
ps aux | grep python

# 检查端口
netstat -tlnp | grep 8080
```

### 2. 访问仪表盘

打开浏览器访问 `http://localhost:8080`

### 3. 检查日志

```bash
# 查看日志
tail -f logs/nekobot.log

# 或使用CLI工具
nekobot-cli status
```

## 更新升级

### 使用Git更新

```bash
# 拉取最新代码
git pull origin main

# 更新依赖
pip install -r requirements.txt --upgrade

# 重启服务
python main.py
```

### 使用CLI工具

```bash
# 检查更新
nekobot-cli check

# 自动更新
nekobot-cli update
```

## 卸载

### 完全卸载

```bash
# 停止服务
pkill -f "python main.py"

# 删除项目目录
rm -rf NekoBot

# 删除数据目录（可选）
rm -rf ~/.nekobot
```

### 保留数据卸载

```bash
# 备份数据
cp -r data/ backup/

# 停止服务
pkill -f "python main.py"

# 删除项目目录
rm -rf NekoBot

# 恢复数据（重新安装后）
cp -r backup/ data/
```

## 故障排除

### 常见问题

#### 1. Python版本不兼容

```bash
# 检查Python版本
python --version

# 如果版本过低，请升级Python
```

#### 2. 依赖安装失败

```bash
# 升级pip
pip install --upgrade pip

# 使用国内镜像源
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 3. 端口被占用

```bash
# 查看端口占用
netstat -tlnp | grep 8080

# 杀死占用进程
kill -9 <PID>

# 或修改端口
export NEKOBOT_PORT=8081
```

#### 4. 权限问题

```bash
# 给脚本执行权限
chmod +x main.py

# 或使用sudo（不推荐）
sudo python main.py
```

### 获取帮助

如果遇到问题，请：

1. 查看[故障排除指南](/zh/guide/troubleshooting)
2. 搜索[已知问题](https://github.com/NekoBotDevs/NekoBot/issues)
3. 提交[新问题](https://github.com/NekoBotDevs/NekoBot/issues/new)
4. 加入[社区讨论](https://github.com/NekoBotDevs/NekoBot/discussions)
