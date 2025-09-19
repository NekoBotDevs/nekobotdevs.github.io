# Installation Guide

This guide provides detailed installation steps for NekoBot, supporting multiple installation methods.

## System Requirements

### Minimum Requirements
- **Operating System**: Windows 10+, macOS 10.15+, Ubuntu 18.04+
- **Python**: 3.8 or higher
- **Memory**: 4GB RAM
- **Storage**: 1GB available space
- **Network**: Stable internet connection

### Recommended Configuration
- **Operating System**: Windows 11, macOS 12+, Ubuntu 20.04+
- **Python**: 3.10 or higher
- **Memory**: 8GB+ RAM
- **Storage**: 5GB+ available space
- **Network**: High-speed internet connection

## Installation Methods

### Method 1: Source Installation (Recommended)

#### 1. Clone Repository

```bash
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot
```

#### 2. Create Virtual Environment

Using venv (Python built-in):

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

Or using uv (recommended, faster):

```bash
# Install uv
pip install uv

# Create virtual environment
uv venv

# Activate virtual environment
# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Initialize Configuration

```bash
python main.py --init
```

### Method 2: Docker Installation

#### 1. Install Docker

Ensure Docker and Docker Compose are installed:

```bash
# Check Docker version
docker --version
docker-compose --version
```

#### 2. Download Configuration Files

```bash
# Download docker-compose.yml
curl -O https://raw.githubusercontent.com/NekoBotDevs/NekoBot/main/docker-compose.yml

# Download environment variables file
curl -O https://raw.githubusercontent.com/NekoBotDevs/NekoBot/main/.env.example
cp .env.example .env
```

#### 3. Start Service

```bash
docker-compose up -d
```

### Method 3: Pre-compiled Package

::: warning Note
Pre-compiled packages are under development, stay tuned!
:::

## Configuration

### Environment Variables

Create `.env` file to configure environment variables:

```env
# Basic configuration
NEKOBOT_HOST=0.0.0.0
NEKOBOT_PORT=8080
NEKOBOT_DEBUG=false

# Database configuration
DATABASE_URL=sqlite:///nekobot.db

# JWT configuration
JWT_SECRET_KEY=your-secret-key-here

# CORS configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:8080

# Logging configuration
LOG_LEVEL=INFO
LOG_FILE=logs/nekobot.log

# Plugin configuration
PLUGIN_DIR=data/plugins
PLUGIN_AUTO_RELOAD=true

# LLM configuration (optional)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

### Configuration Files

Main configuration files are located in `config/` directory:

- `config.yaml` - Main configuration file
- `platforms.yaml` - Platform configuration
- `llm.yaml` - LLM provider configuration
- `plugins.yaml` - Plugin configuration

## Platform-Specific Installation

### Windows

#### Using PowerShell

```powershell
# Clone project
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start service
python main.py
```

#### Using Chocolatey

```powershell
# Install Python (if not installed)
choco install python

# Follow steps above
```

### macOS

#### Using Homebrew

```bash
# Install Python (if not installed)
brew install python

# Clone project
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start service
python main.py
```

### Linux (Ubuntu/Debian)

```bash
# Update package manager
sudo apt update

# Install Python and dependencies
sudo apt install python3 python3-pip python3-venv git

# Clone project
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start service
python main.py
```

### Linux (CentOS/RHEL)

```bash
# Install Python and dependencies
sudo yum install python3 python3-pip git

# Follow steps above
```

## Verify Installation

### 1. Check Service Status

```bash
# Check processes
ps aux | grep python

# Check ports
netstat -tlnp | grep 8080
```

### 2. Access Dashboard

Open browser and visit `http://localhost:8080`

### 3. Check Logs

```bash
# View logs
tail -f logs/nekobot.log

# Or use CLI tool
nekobot-cli status
```

## Updates

### Using Git Update

```bash
# Pull latest code
git pull origin main

# Update dependencies
pip install -r requirements.txt --upgrade

# Restart service
python main.py
```

### Using CLI Tool

```bash
# Check for updates
nekobot-cli check

# Auto update
nekobot-cli update
```

## Uninstall

### Complete Uninstall

```bash
# Stop service
pkill -f "python main.py"

# Delete project directory
rm -rf NekoBot

# Delete data directory (optional)
rm -rf ~/.nekobot
```

### Keep Data Uninstall

```bash
# Backup data
cp -r data/ backup/

# Stop service
pkill -f "python main.py"

# Delete project directory
rm -rf NekoBot

# Restore data (after reinstallation)
cp -r backup/ data/
```

## Troubleshooting

### Common Issues

#### 1. Python Version Incompatible

```bash
# Check Python version
python --version

# If version is too low, please upgrade Python
```

#### 2. Dependency Installation Failed

```bash
# Upgrade pip
pip install --upgrade pip

# Use domestic mirror source
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

#### 3. Port Occupied

```bash
# Check port usage
netstat -tlnp | grep 8080

# Kill occupying process
kill -9 <PID>

# Or change port
export NEKOBOT_PORT=8081
```

#### 4. Permission Issues

```bash
# Give script execution permission
chmod +x main.py

# Or use sudo (not recommended)
sudo python main.py
```

### Get Help

If you encounter problems, please:

1. Check [Troubleshooting Guide](/en/guide/troubleshooting)
2. Search [Known Issues](https://github.com/NekoBotDevs/NekoBot/issues)
3. Submit [New Issue](https://github.com/NekoBotDevs/NekoBot/issues/new)
4. Join [Community Discussions](https://github.com/NekoBotDevs/NekoBot/discussions)

