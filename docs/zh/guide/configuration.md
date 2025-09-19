# 配置指南

NekoBot提供灵活的配置选项，让您可以根据需求自定义机器人行为。

## 配置文件结构

NekoBot使用YAML格式的配置文件，主要配置文件位于`config/`目录：

```
config/
├── config.yaml          # 主配置文件
├── platforms.yaml       # 平台配置
├── llm.yaml            # LLM服务商配置
├── plugins.yaml        # 插件配置
└── logging.yaml        # 日志配置
```

## 主配置文件 (config.yaml)

### 基础配置

```yaml
# 机器人基础配置
bot:
  name: "NekoBot"                    # 机器人名称
  prefix: "/"                        # 命令前缀
  timezone: "Asia/Shanghai"          # 时区
  language: "zh"                     # 默认语言
  debug: false                       # 调试模式

# 服务器配置
server:
  host: "0.0.0.0"                   # 监听地址
  port: 8080                        # 监听端口
  workers: 1                        # 工作进程数
  cors_origins:                     # CORS允许的源
    - "http://localhost:3000"
    - "http://localhost:8080"

# 数据库配置
database:
  url: "sqlite:///nekobot.db"       # 数据库连接URL
  pool_size: 10                     # 连接池大小
  echo: false                       # 是否打印SQL语句

# 安全配置
security:
  jwt_secret: "your-secret-key"     # JWT密钥
  jwt_expire: 3600                  # JWT过期时间（秒）
  password_min_length: 8            # 密码最小长度
  max_login_attempts: 5             # 最大登录尝试次数
  lockout_duration: 300             # 锁定时间（秒）
```

### 高级配置

```yaml
# 性能配置
performance:
  max_memory: "2GB"                 # 最大内存使用
  max_cpu_percent: 80               # 最大CPU使用率
  gc_threshold: 1000                # 垃圾回收阈值
  cache_size: 1000                  # 缓存大小

# 网络配置
network:
  timeout: 30                       # 请求超时时间
  retry_times: 3                    # 重试次数
  user_agent: "NekoBot/1.0.0"      # User-Agent
  proxy:                            # 代理配置
    http: "http://proxy.example.com:8080"
    https: "https://proxy.example.com:8080"

# 文件配置
files:
  upload_dir: "data/uploads"        # 上传目录
  max_file_size: "10MB"             # 最大文件大小
  allowed_extensions:               # 允许的文件扩展名
    - ".jpg"
    - ".png"
    - ".gif"
    - ".mp3"
    - ".mp4"
```

## 平台配置 (platforms.yaml)

### QQ配置

```yaml
qq:
  enabled: true
  type: "aiocqhttp"                 # 使用aiocqhttp
  config:
    app_id: "123456"                # QQ应用ID
    token: "your-token"             # 访问令牌
    secret: "your-secret"           # 应用密钥
    sandbox: false                  # 是否使用沙箱环境
    timeout: 30                     # 请求超时
    retry_times: 3                  # 重试次数
    webhook_url: "http://localhost:8080/webhook/qq"  # Webhook地址

# QQ官方Bot配置
qq_official:
  enabled: false
  type: "websocket"                 # 使用WebSocket
  config:
    app_id: "123456"
    token: "your-token"
    secret: "your-secret"
    sandbox: false
    websocket_url: "wss://api.qq.com/ws"
```

### Discord配置

```yaml
discord:
  enabled: true
  type: "py-cord"
  config:
    token: "your-bot-token"
    intents:                        # 权限意图
      - "guilds"
      - "guild_messages"
      - "direct_messages"
      - "message_content"
    prefix: "!"                     # 命令前缀
    case_insensitive: true          # 大小写不敏感
    strip_after_prefix: true        # 去除前缀后的空格
```

### Telegram配置

```yaml
telegram:
  enabled: true
  type: "python-telegram-bot"
  config:
    token: "your-bot-token"
    webhook_url: "https://yourdomain.com/webhook/telegram"
    webhook_port: 8443
    cert_path: "/path/to/cert.pem"  # SSL证书路径
    drop_pending_updates: true      # 丢弃待处理更新
```

### 微信配置

```yaml
wechat:
  enabled: false
  type: "wechatpy"
  config:
    app_id: "your-app-id"
    app_secret: "your-app-secret"
    token: "your-token"
    encoding_aes_key: "your-encoding-aes-key"
    webhook_url: "https://yourdomain.com/webhook/wechat"
```

## LLM配置 (llm.yaml)

### OpenAI配置

```yaml
openai:
  enabled: true
  type: "text_generation"
  config:
    api_key: "sk-your-api-key"
    base_url: "https://api.openai.com/v1"
    model: "gpt-3.5-turbo"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    frequency_penalty: 0.0
    presence_penalty: 0.0
    timeout: 30
    max_retries: 3
    organization: "org-your-org-id"  # 可选
```

### Anthropic配置

```yaml
anthropic:
  enabled: true
  type: "text_generation"
  config:
    api_key: "sk-ant-your-api-key"
    model: "claude-3-sonnet-20240229"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    timeout: 30
    max_retries: 3
```

### Google Gemini配置

```yaml
google:
  enabled: true
  type: "text_generation"
  config:
    api_key: "your-api-key"
    model: "gemini-pro"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    top_k: 40
    timeout: 30
    max_retries: 3
```

### 阿里云百炼配置

```yaml
dashscope:
  enabled: true
  type: "text_generation"
  config:
    api_key: "sk-your-api-key"
    model: "qwen-turbo"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    timeout: 30
    max_retries: 3
```

### 本地模型配置

```yaml
ollama:
  enabled: true
  type: "text_generation"
  config:
    base_url: "http://localhost:11434"
    model: "llama2"
    max_tokens: 2048
    temperature: 0.7
    timeout: 60
    max_retries: 3

lm_studio:
  enabled: false
  type: "text_generation"
  config:
    base_url: "http://localhost:1234"
    model: "local-model"
    max_tokens: 2048
    temperature: 0.7
    timeout: 60
    max_retries: 3
```

## 插件配置 (plugins.yaml)

### 插件管理配置

```yaml
# 插件目录配置
directories:
  local: "data/plugins"             # 本地插件目录
  cache: "data/plugins/cache"       # 插件缓存目录
  temp: "data/plugins/temp"         # 临时目录

# 插件安装配置
installation:
  auto_reload: true                 # 自动重载
  check_dependencies: true          # 检查依赖
  install_dependencies: true        # 自动安装依赖
  timeout: 300                      # 安装超时时间
  max_concurrent: 3                 # 最大并发安装数

# 插件商店配置
store:
  enabled: true                     # 启用插件商店
  url: "https://plugins.nekobot.dev"  # 商店地址
  cache_duration: 3600              # 缓存时间
  update_check_interval: 86400      # 更新检查间隔

# GitHub代理配置
github_proxy:
  enabled: true                     # 启用代理
  url: "https://ghproxy.com"        # 代理地址
  timeout: 30                       # 超时时间
  retry_times: 3                    # 重试次数

# pip源配置
pip_index:
  enabled: true                     # 启用自定义源
  url: "https://pypi.tuna.tsinghua.edu.cn/simple"  # pip源地址
  timeout: 30                       # 超时时间
  retry_times: 3                    # 重试次数
```

### 插件特定配置

```yaml
# 插件配置示例
plugins:
  weather_plugin:
    enabled: true
    config:
      api_key: "your-weather-api-key"
      default_city: "北京"
      units: "metric"
      language: "zh"
  
  news_plugin:
    enabled: true
    config:
      api_key: "your-news-api-key"
      sources: ["bbc-news", "cnn"]
      language: "zh"
      sort_by: "publishedAt"
```

## 日志配置 (logging.yaml)

### 日志基础配置

```yaml
# 日志级别
level: "INFO"                       # DEBUG, INFO, WARNING, ERROR, CRITICAL

# 日志格式
format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

# 日期格式
date_format: "%Y-%m-%d %H:%M:%S"

# 日志文件配置
file:
  enabled: true                     # 启用文件日志
  path: "logs/nekobot.log"          # 日志文件路径
  max_size: "10MB"                  # 最大文件大小
  backup_count: 5                   # 备份文件数量
  rotation: "daily"                 # 轮转方式: daily, weekly, monthly

# 控制台日志配置
console:
  enabled: true                     # 启用控制台日志
  colored: true                     # 彩色输出
  level: "INFO"                     # 控制台日志级别

# 数据库日志配置
database:
  enabled: false                    # 启用数据库日志
  table: "logs"                     # 日志表名
  max_records: 10000                # 最大记录数
  cleanup_interval: 86400           # 清理间隔

# 远程日志配置
remote:
  enabled: false                    # 启用远程日志
  url: "https://logs.nekobot.dev/api/logs"
  api_key: "your-api-key"
  batch_size: 100                   # 批量发送大小
  flush_interval: 5                 # 刷新间隔
```

### 日志分类配置

```yaml
# 不同模块的日志级别
loggers:
  nekobot.core: "INFO"
  nekobot.plugins: "DEBUG"
  nekobot.platforms: "INFO"
  nekobot.llm: "INFO"
  nekobot.database: "WARNING"
  nekobot.api: "INFO"
  nekobot.webhook: "INFO"

# 日志过滤器
filters:
  sensitive_data:
    patterns:
      - "password"
      - "token"
      - "key"
      - "secret"
    replacement: "***"
```

## 环境变量配置

您也可以通过环境变量来覆盖配置文件中的设置：

```bash
# 基础配置
export NEKOBOT_HOST=0.0.0.0
export NEKOBOT_PORT=8080
export NEKOBOT_DEBUG=false

# 数据库配置
export DATABASE_URL=sqlite:///nekobot.db

# 安全配置
export JWT_SECRET_KEY=your-secret-key
export JWT_EXPIRE=3600

# LLM配置
export OPENAI_API_KEY=sk-your-api-key
export ANTHROPIC_API_KEY=sk-ant-your-api-key

# 平台配置
export QQ_APP_ID=123456
export QQ_TOKEN=your-token
export DISCORD_TOKEN=your-bot-token
export TELEGRAM_TOKEN=your-bot-token

# 日志配置
export LOG_LEVEL=INFO
export LOG_FILE=logs/nekobot.log
```

## 配置验证

### 使用CLI验证配置

```bash
# 验证配置文件
nekobot-cli config validate

# 检查配置语法
nekobot-cli config check

# 测试配置
nekobot-cli config test
```

### 配置热重载

```yaml
# 启用配置热重载
config:
  hot_reload: true                  # 启用热重载
  watch_files: true                 # 监听文件变化
  reload_delay: 1                   # 重载延迟（秒）
  exclude_patterns:                 # 排除的文件模式
    - "*.tmp"
    - "*.log"
    - "data/*"
```

## 配置最佳实践

### 1. 安全性

- 使用强密码和密钥
- 定期轮换API密钥
- 限制CORS来源
- 启用HTTPS

### 2. 性能

- 合理设置连接池大小
- 启用缓存机制
- 配置适当的超时时间
- 监控资源使用

### 3. 可维护性

- 使用环境变量管理敏感信息
- 定期备份配置文件
- 使用版本控制管理配置
- 添加配置注释

### 4. 监控

- 启用详细日志记录
- 配置日志轮转
- 设置监控告警
- 定期检查配置

## 故障排除

### 常见配置问题

1. **端口被占用**
   ```bash
   # 检查端口占用
   netstat -tlnp | grep 8080
   
   # 修改端口
   export NEKOBOT_PORT=8081
   ```

2. **数据库连接失败**
   ```bash
   # 检查数据库文件权限
   ls -la nekobot.db
   
   # 重新创建数据库
   rm nekobot.db
   python main.py --init
   ```

3. **插件加载失败**
   ```bash
   # 检查插件目录
   ls -la data/plugins/
   
   # 查看插件日志
   tail -f logs/nekobot.log | grep plugin
   ```

4. **LLM服务连接失败**
   ```bash
   # 测试API连接
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        https://api.openai.com/v1/models
   ```

### 配置调试

```bash
# 启用调试模式
export NEKOBOT_DEBUG=true

# 查看详细日志
export LOG_LEVEL=DEBUG

# 启动服务
python main.py
```

## 配置示例

### 开发环境配置

```yaml
# config/dev.yaml
bot:
  name: "NekoBot-Dev"
  debug: true

server:
  port: 8080
  cors_origins:
    - "http://localhost:3000"
    - "http://localhost:8080"

database:
  url: "sqlite:///dev.db"
  echo: true

logging:
  level: "DEBUG"
  console:
    enabled: true
    colored: true
```

### 生产环境配置

```yaml
# config/prod.yaml
bot:
  name: "NekoBot"
  debug: false

server:
  port: 8080
  workers: 4
  cors_origins:
    - "https://yourdomain.com"

database:
  url: "postgresql://user:pass@localhost/nekobot"
  pool_size: 20
  echo: false

logging:
  level: "INFO"
  file:
    enabled: true
    path: "/var/log/nekobot/nekobot.log"
    max_size: "100MB"
    backup_count: 10
```

通过合理配置，您可以让NekoBot在您的环境中发挥最佳性能！

