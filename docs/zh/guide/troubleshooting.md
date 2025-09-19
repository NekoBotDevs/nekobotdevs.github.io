# 故障排除

本章节提供了NekoBot使用过程中常见问题的解决方案和调试方法。

## 安装和启动问题

### NekoBot无法启动

**问题描述**：运行`python main.py`时程序无法正常启动。

**可能原因及解决方案**：

1. **Python版本不兼容**
   ```bash
   # 检查Python版本
   python --version
   # 确保使用Python 3.10或更高版本
   ```

2. **依赖包未安装**
   ```bash
   # 创建虚拟环境
   uv venv
   # 激活虚拟环境
   .\venv\Scripts\activate
   # 安装依赖
   pip install -r requirements.txt
   ```

3. **端口被占用**
   ```bash
   # 检查端口占用情况
   netstat -ano | findstr :8080
   # 终止占用进程
   taskkill /PID <进程ID> /F
   ```

### 数据库连接失败

**问题描述**：启动时提示数据库连接错误。

**解决方案**：

1. **检查SQLite数据库文件**
   ```bash
   # 确保数据库文件存在
   ls -la data/
   # 如果不存在，重新创建
   python -c "import aiosqlite; import asyncio; asyncio.run(aiosqlite.connect('data/nekobot.db'))"
   ```

2. **检查数据库权限**
   ```bash
   # 确保程序有读写权限
   chmod 755 data/
   chmod 644 data/nekobot.db
   ```

## 插件相关问题

### 插件安装失败

**问题描述**：插件安装过程中出现错误。

**可能原因及解决方案**：

1. **网络连接问题**
   - 检查网络连接
   - 尝试使用GitHub代理
   - 检查防火墙设置

2. **插件格式不正确**
   ```bash
   # 检查插件结构
   unzip -l plugin.zip
   # 确保包含必要文件
   # - metadata.yaml
   # - main.py
   # - requirements.txt
   # - README.md
   ```

3. **依赖安装失败**
   ```bash
   # 手动安装依赖
   pip install -r requirements.txt
   # 检查pip源配置
   pip config list
   ```

### 插件无法启用

**问题描述**：插件安装成功但无法启用。

**解决方案**：

1. **检查插件代码**
   ```python
   # 确保插件类继承正确
   from nekobot.base import Neko
   
   class MyPlugin(Neko.base):
       def __init__(self):
           super().__init__()
   ```

2. **检查装饰器使用**
   ```python
   # 确保使用必要的装饰器
   @Neko.base.Register
   def register_commands(self):
       pass
   ```

3. **查看插件日志**
   ```bash
   # 查看插件相关日志
   tail -f logs/plugins.log
   # 检查错误信息
   grep "ERROR" logs/plugins.log
   ```

### 插件热重载失败

**问题描述**：插件重载时出现错误或无响应。

**解决方案**：

1. **检查文件监控**
   ```bash
   # 检查文件变化监控状态
   ps aux | grep watchfiles
   ```

2. **手动重载插件**
   ```bash
   # 使用CLI命令重载
   nekobot-cli reload-plugin <插件名称>
   ```

3. **清理模块缓存**
   ```python
   # 在插件中添加清理逻辑
   import sys
   if 'data.plugins.my_plugin' in sys.modules:
       del sys.modules['data.plugins.my_plugin']
   ```

## LLM/TTL服务问题

### API连接失败

**问题描述**：无法连接到LLM/TTL服务提供商。

**解决方案**：

1. **检查API配置**
   ```bash
   # 检查数据库中的配置
   sqlite3 data/nekobot.db "SELECT * FROM llm_providers;"
   ```

2. **验证API密钥**
   ```python
   # 测试API连接
   import openai
   client = OpenAI(api_key="your-api-key")
   try:
       response = client.chat.completions.create(
           model="gpt-3.5-turbo",
           messages=[{"role": "user", "content": "Hello"}]
       )
       print("API连接成功")
   except Exception as e:
       print(f"API连接失败: {e}")
   ```

3. **检查网络代理**
   ```bash
   # 检查环境变量
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   # 设置代理（如果需要）
   export HTTP_PROXY=http://proxy.example.com:8080
   export HTTPS_PROXY=http://proxy.example.com:8080
   ```

### 模型响应超时

**问题描述**：LLM模型响应时间过长或超时。

**解决方案**：

1. **调整超时设置**
   ```python
   # 在配置中增加超时时间
   config = {
       "timeout": 60,  # 增加到60秒
       "max_retries": 3
   }
   ```

2. **优化提示词**
   - 减少提示词长度
   - 明确指令要求
   - 避免复杂的推理任务

3. **使用更快的模型**
   ```json
   {
     "model": "gpt-3.5-turbo",
     "max_tokens": 1000
   }
   ```

## 平台对接问题

### QQ机器人连接失败

**问题描述**：QQ机器人无法连接或消息发送失败。

**解决方案**：

1. **检查OneBot协议配置**
   ```yaml
   # config.yaml
   qq:
     protocol: "onebot-v11"
     ws_url: "ws://localhost:8080"
     http_url: "http://localhost:8080"
   ```

2. **检查aiocqhttp状态**
   ```bash
   # 检查服务状态
   ps aux | grep aiocqhttp
   # 查看日志
   tail -f logs/qq.log
   ```

3. **验证消息格式**
   ```python
   # 确保消息格式正确
   message = {
       "message_type": "group",
       "group_id": 123456,
       "message": "Hello World"
   }
   ```

### Discord机器人问题

**问题描述**：Discord机器人无响应或权限错误。

**解决方案**：

1. **检查Bot Token**
   ```python
   # 验证Token有效性
   import discord
   bot = discord.Client()
   @bot.event
   async def on_ready():
       print(f'Logged in as {bot.user}')
   bot.run('your-bot-token')
   ```

2. **检查权限设置**
   - 确保Bot有发送消息权限
   - 检查频道权限设置
   - 验证Bot邀请链接权限

3. **检查Intent配置**
   ```python
   # 确保启用必要的Intent
   intents = discord.Intents.default()
   intents.message_content = True
   bot = discord.Client(intents=intents)
   ```

## 仪表盘问题

### 无法登录仪表盘

**问题描述**：无法访问Web仪表盘或登录失败。

**解决方案**：

1. **检查服务状态**
   ```bash
   # 检查Quart服务
   ps aux | grep quart
   # 检查端口占用
   netstat -ano | findstr :5000
   ```

2. **重置密码**
   ```bash
   # 使用CLI重置密码
   nekobot-cli reset-passwd
   ```

3. **检查JWT配置**
   ```python
   # 验证JWT密钥
   import jwt
   try:
       token = jwt.encode({"user": "admin"}, "your-secret-key", algorithm="HS256")
       print("JWT配置正常")
   except Exception as e:
       print(f"JWT配置错误: {e}")
   ```

### 实时日志不显示

**问题描述**：仪表盘中实时日志功能无法正常工作。

**解决方案**：

1. **检查WebSocket连接**
   ```javascript
   // 在浏览器控制台检查
   const ws = new WebSocket('ws://localhost:5000/api/v1/logs/stream');
   ws.onopen = () => console.log('WebSocket连接成功');
   ws.onerror = (error) => console.error('WebSocket错误:', error);
   ```

2. **检查日志配置**
   ```python
   # 确保日志级别正确
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

3. **检查防火墙设置**
   ```bash
   # 确保WebSocket端口开放
   firewall-cmd --list-ports
   firewall-cmd --add-port=5000/tcp --permanent
   ```

## Docker沙盒问题

### 容器启动失败

**问题描述**：Docker容器无法启动或执行代码失败。

**解决方案**：

1. **检查Docker服务**
   ```bash
   # 检查Docker状态
   docker --version
   docker info
   # 重启Docker服务
   sudo systemctl restart docker
   ```

2. **检查镜像配置**
   ```bash
   # 检查镜像是否存在
   docker images | grep nekobot-sandbox
   # 拉取镜像
   docker pull nekobot/sandbox:latest
   ```

3. **检查资源限制**
   ```bash
   # 检查内存和CPU限制
   docker run --memory=512m --cpus=1.0 nekobot/sandbox python --version
   ```

### 代码执行超时

**问题描述**：在Docker容器中执行代码超时。

**解决方案**：

1. **调整超时设置**
   ```python
   # 增加执行超时时间
   config = {
       "timeout": 30,  # 增加到30秒
       "memory_limit": "512m"
   }
   ```

2. **优化代码性能**
   - 减少循环次数
   - 优化算法复杂度
   - 使用更高效的库

3. **检查输出格式**
   ```python
   # 确保使用正确的输出格式
   print("[NEKOBOT_TEXT_OUTPUT#magic_code]: Hello World")
   ```

## 性能问题

### 内存占用过高

**问题描述**：NekoBot进程内存占用持续增长。

**解决方案**：

1. **监控内存使用**
   ```bash
   # 监控进程内存
   ps aux | grep nekobot
   # 使用内存分析工具
   mprof run --include-children python main.py
   ```

2. **清理缓存**
   ```python
   # 定期清理缓存
   import gc
   gc.collect()
   ```

3. **优化数据库连接**
   ```python
   # 使用连接池
   from aiosqlite import create_pool
   db_pool = await create_pool('data/nekobot.db')
   ```

### CPU使用率过高

**问题描述**：CPU使用率持续处于高位。

**解决方案**：

1. **分析CPU使用**
   ```bash
   # 分析CPU使用情况
   top -p <nekobot-pid>
   # 使用性能分析工具
   python -m cProfile -o profile.prof main.py
   ```

2. **优化异步操作**
   ```python
   # 使用异步IO
   import asyncio
   async def async_operation():
       # 异步操作
       pass
   ```

3. **限制并发数**
   ```python
   # 限制并发请求数
   semaphore = asyncio.Semaphore(10)
   
   async def limited_operation():
       async with semaphore:
           # 执行操作
           pass
   ```

## 日志分析

### 查看错误日志

**问题描述**：需要快速定位和解决问题。

**解决方案**：

1. **过滤错误日志**
   ```bash
   # 查看所有错误日志
   grep "ERROR" logs/*.log
   # 查看特定时间段的日志
   grep "2024-01-01 10:" logs/app.log | grep "ERROR"
   ```

2. **实时监控日志**
   ```bash
   # 实时查看日志
   tail -f logs/app.log
   # 多文件实时监控
   multitail logs/*.log
   ```

3. **日志分析工具**
   ```bash
   # 使用日志分析工具
   goaccess -f logs/access.log
   # 使用ELK Stack分析日志
   ```

### 调试模式

**问题描述**：需要详细的调试信息。

**解决方案**：

1. **启用调试模式**
   ```python
   # 在配置中启用调试
   import logging
   logging.basicConfig(
       level=logging.DEBUG,
       format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
   )
   ```

2. **使用调试器**
   ```bash
   # 使用pdb调试
   python -m pdb main.py
   # 使用IDE调试器
   # 在VSCode中设置断点
   ```

3. **性能分析**
   ```python
   # 使用cProfile分析性能
   import cProfile
   import pstats
   
   profiler = cProfile.Profile()
   profiler.enable()
   
   # 运行代码
   profiler.disable()
   stats = pstats.Stats(profiler)
   stats.sort_stats('cumulative')
   stats.print_stats()
   ```

## 常见错误代码

### 系统错误代码

| 错误代码 | 描述 | 解决方案 |
|---------|------|----------|
| 1001 | 数据库连接失败 | 检查数据库文件和权限 |
| 1002 | 配置文件错误 | 检查配置文件格式 |
| 1003 | 端口占用 | 更改端口或终止占用进程 |
| 1004 | 权限不足 | 检查文件和目录权限 |

### 插件错误代码

| 错误代码 | 描述 | 解决方案 |
|---------|------|----------|
| 2001 | 插件格式错误 | 检查插件文件结构 |
| 2002 | 依赖安装失败 | 手动安装依赖 |
| 2003 | 插件加载失败 | 检查插件代码 |
| 2004 | 插件冲突 | 禁用冲突插件 |

### API错误代码

| 错误代码 | 描述 | 解决方案 |
|---------|------|----------|
| 3001 | API认证失败 | 检查API密钥 |
| 3002 | 请求超时 | 增加超时时间 |
| 3003 | 频率限制 | 降低请求频率 |
| 3004 | 服务不可用 | 检查服务状态 |

## 联系支持

如果以上解决方案都无法解决您的问题，请通过以下方式获取支持：

1. **GitHub Issues**
   - 访问：https://github.com/NekoBotDevs/nekobotdevs.github.io/issues
   - 提供详细的错误信息和复现步骤

2. **社区支持**
   - 加入QQ群：[群号]
   - 加入Discord：[邀请链接]
   - 加入Telegram：[群组链接]

3. **邮件支持**
   - 邮箱：support@nekobot.dev
   - 请提供系统信息和错误日志

## 报告问题的模板

为了更好地帮助您解决问题，请使用以下模板报告问题：

```markdown
## 问题描述
简要描述遇到的问题

## 复现步骤
1. 执行的操作
2. 预期结果
3. 实际结果

## 环境信息
- 操作系统：[Windows/Linux/macOS]
- Python版本：[3.x.x]
- NekoBot版本：[x.x.x]
- 数据库：[SQLite]

## 错误日志
```
粘贴相关的错误日志
```

## 其他信息
任何其他有助于解决问题的信息
