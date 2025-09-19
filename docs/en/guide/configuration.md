# Configuration Guide

NekoBot provides flexible configuration options to customize bot behavior according to your needs.

## Configuration File Structure

NekoBot uses YAML format configuration files, main configuration files are located in `config/` directory:

```
config/
├── config.yaml          # Main configuration file
├── platforms.yaml       # Platform configuration
├── llm.yaml            # LLM provider configuration
├── plugins.yaml        # Plugin configuration
└── logging.yaml        # Logging configuration
```

## Main Configuration (config.yaml)

### Basic Configuration

```yaml
# Bot basic configuration
bot:
  name: "NekoBot"                    # Bot name
  prefix: "/"                        # Command prefix
  timezone: "Asia/Shanghai"          # Timezone
  language: "en"                     # Default language
  debug: false                       # Debug mode

# Server configuration
server:
  host: "0.0.0.0"                   # Listen address
  port: 8080                        # Listen port
  workers: 1                        # Worker processes
  cors_origins:                     # CORS allowed origins
    - "http://localhost:3000"
    - "http://localhost:8080"

# Database configuration
database:
  url: "sqlite:///nekobot.db"       # Database connection URL
  pool_size: 10                     # Connection pool size
  echo: false                       # Print SQL statements

# Security configuration
security:
  jwt_secret: "your-secret-key"     # JWT secret
  jwt_expire: 3600                  # JWT expiration time (seconds)
  password_min_length: 8            # Minimum password length
  max_login_attempts: 5             # Maximum login attempts
  lockout_duration: 300             # Lockout duration (seconds)
```

### Advanced Configuration

```yaml
# Performance configuration
performance:
  max_memory: "2GB"                 # Maximum memory usage
  max_cpu_percent: 80               # Maximum CPU usage
  gc_threshold: 1000                # Garbage collection threshold
  cache_size: 1000                  # Cache size

# Network configuration
network:
  timeout: 30                       # Request timeout
  retry_times: 3                    # Retry times
  user_agent: "NekoBot/1.0.0"      # User-Agent
  proxy:                            # Proxy configuration
    http: "http://proxy.example.com:8080"
    https: "https://proxy.example.com:8080"

# File configuration
files:
  upload_dir: "data/uploads"        # Upload directory
  max_file_size: "10MB"             # Maximum file size
  allowed_extensions:               # Allowed file extensions
    - ".jpg"
    - ".png"
    - ".gif"
    - ".mp3"
    - ".mp4"
```

## Platform Configuration (platforms.yaml)

### QQ Configuration

```yaml
qq:
  enabled: true
  type: "aiocqhttp"                 # Use aiocqhttp
  config:
    app_id: "123456"                # QQ app ID
    token: "your-token"             # Access token
    secret: "your-secret"           # App secret
    sandbox: false                  # Use sandbox environment
    timeout: 30                     # Request timeout
    retry_times: 3                  # Retry times
    webhook_url: "http://localhost:8080/webhook/qq"  # Webhook URL

# QQ Official Bot configuration
qq_official:
  enabled: false
  type: "websocket"                 # Use WebSocket
  config:
    app_id: "123456"
    token: "your-token"
    secret: "your-secret"
    sandbox: false
    websocket_url: "wss://api.qq.com/ws"
```

### Discord Configuration

```yaml
discord:
  enabled: true
  type: "py-cord"
  config:
    token: "your-bot-token"
    intents:                        # Permission intents
      - "guilds"
      - "guild_messages"
      - "direct_messages"
      - "message_content"
    prefix: "!"                     # Command prefix
    case_insensitive: true          # Case insensitive
    strip_after_prefix: true        # Strip spaces after prefix
```

### Telegram Configuration

```yaml
telegram:
  enabled: true
  type: "python-telegram-bot"
  config:
    token: "your-bot-token"
    webhook_url: "https://yourdomain.com/webhook/telegram"
    webhook_port: 8443
    cert_path: "/path/to/cert.pem"  # SSL certificate path
    drop_pending_updates: true      # Drop pending updates
```

### WeChat Configuration

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

## LLM Configuration (llm.yaml)

### OpenAI Configuration

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
    organization: "org-your-org-id"  # Optional
```

### Anthropic Configuration

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

### Google Gemini Configuration

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

### Alibaba Cloud Bailian Configuration

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

### Local Model Configuration

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

## Plugin Configuration (plugins.yaml)

### Plugin Management Configuration

```yaml
# Plugin directory configuration
directories:
  local: "data/plugins"             # Local plugin directory
  cache: "data/plugins/cache"       # Plugin cache directory
  temp: "data/plugins/temp"         # Temporary directory

# Plugin installation configuration
installation:
  auto_reload: true                 # Auto reload
  check_dependencies: true          # Check dependencies
  install_dependencies: true        # Auto install dependencies
  timeout: 300                      # Installation timeout
  max_concurrent: 3                 # Maximum concurrent installations

# Plugin store configuration
store:
  enabled: true                     # Enable plugin store
  url: "https://plugins.nekobot.dev"  # Store URL
  cache_duration: 3600              # Cache duration
  update_check_interval: 86400      # Update check interval

# GitHub proxy configuration
github_proxy:
  enabled: true                     # Enable proxy
  url: "https://ghproxy.com"        # Proxy URL
  timeout: 30                       # Timeout
  retry_times: 3                    # Retry times

# pip index configuration
pip_index:
  enabled: true                     # Enable custom index
  url: "https://pypi.tuna.tsinghua.edu.cn/simple"  # pip index URL
  timeout: 30                       # Timeout
  retry_times: 3                    # Retry times
```

### Plugin-Specific Configuration

```yaml
# Plugin configuration example
plugins:
  weather_plugin:
    enabled: true
    config:
      api_key: "your-weather-api-key"
      default_city: "Beijing"
      units: "metric"
      language: "en"
  
  news_plugin:
    enabled: true
    config:
      api_key: "your-news-api-key"
      sources: ["bbc-news", "cnn"]
      language: "en"
      sort_by: "publishedAt"
```

## Logging Configuration (logging.yaml)

### Basic Logging Configuration

```yaml
# Log level
level: "INFO"                       # DEBUG, INFO, WARNING, ERROR, CRITICAL

# Log format
format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

# Date format
date_format: "%Y-%m-%d %H:%M:%S"

# Log file configuration
file:
  enabled: true                     # Enable file logging
  path: "logs/nekobot.log"          # Log file path
  max_size: "10MB"                  # Maximum file size
  backup_count: 5                   # Backup file count
  rotation: "daily"                 # Rotation method: daily, weekly, monthly

# Console logging configuration
console:
  enabled: true                     # Enable console logging
  colored: true                     # Colored output
  level: "INFO"                     # Console log level

# Database logging configuration
database:
  enabled: false                    # Enable database logging
  table: "logs"                     # Log table name
  max_records: 10000                # Maximum records
  cleanup_interval: 86400           # Cleanup interval

# Remote logging configuration
remote:
  enabled: false                    # Enable remote logging
  url: "https://logs.nekobot.dev/api/logs"
  api_key: "your-api-key"
  batch_size: 100                   # Batch send size
  flush_interval: 5                 # Flush interval
```

### Logging Category Configuration

```yaml
# Different module log levels
loggers:
  nekobot.core: "INFO"
  nekobot.plugins: "DEBUG"
  nekobot.platforms: "INFO"
  nekobot.llm: "INFO"
  nekobot.database: "WARNING"
  nekobot.api: "INFO"
  nekobot.webhook: "INFO"

# Log filters
filters:
  sensitive_data:
    patterns:
      - "password"
      - "token"
      - "key"
      - "secret"
    replacement: "***"
```

## Environment Variable Configuration

You can also override configuration file settings through environment variables:

```bash
# Basic configuration
export NEKOBOT_HOST=0.0.0.0
export NEKOBOT_PORT=8080
export NEKOBOT_DEBUG=false

# Database configuration
export DATABASE_URL=sqlite:///nekobot.db

# Security configuration
export JWT_SECRET_KEY=your-secret-key
export JWT_EXPIRE=3600

# LLM configuration
export OPENAI_API_KEY=sk-your-api-key
export ANTHROPIC_API_KEY=sk-ant-your-api-key

# Platform configuration
export QQ_APP_ID=123456
export QQ_TOKEN=your-token
export DISCORD_TOKEN=your-bot-token
export TELEGRAM_TOKEN=your-bot-token

# Logging configuration
export LOG_LEVEL=INFO
export LOG_FILE=logs/nekobot.log
```

## Configuration Validation

### Using CLI to Validate Configuration

```bash
# Validate configuration file
nekobot-cli config validate

# Check configuration syntax
nekobot-cli config check

# Test configuration
nekobot-cli config test
```

### Configuration Hot Reload

```yaml
# Enable configuration hot reload
config:
  hot_reload: true                  # Enable hot reload
  watch_files: true                 # Watch file changes
  reload_delay: 1                   # Reload delay (seconds)
  exclude_patterns:                 # Exclude file patterns
    - "*.tmp"
    - "*.log"
    - "data/*"
```

## Configuration Best Practices

### 1. Security

- Use strong passwords and keys
- Regularly rotate API keys
- Limit CORS origins
- Enable HTTPS

### 2. Performance

- Set appropriate connection pool size
- Enable caching mechanisms
- Configure appropriate timeout values
- Monitor resource usage

### 3. Maintainability

- Use environment variables for sensitive information
- Regularly backup configuration files
- Use version control for configuration
- Add configuration comments

### 4. Monitoring

- Enable detailed logging
- Configure log rotation
- Set up monitoring alerts
- Regularly check configuration

## Troubleshooting

### Common Configuration Issues

1. **Port Occupied**
   ```bash
   # Check port usage
   netstat -tlnp | grep 8080
   
   # Change port
   export NEKOBOT_PORT=8081
   ```

2. **Database Connection Failed**
   ```bash
   # Check database file permissions
   ls -la nekobot.db
   
   # Recreate database
   rm nekobot.db
   python main.py --init
   ```

3. **Plugin Loading Failed**
   ```bash
   # Check plugin directory
   ls -la data/plugins/
   
   # View plugin logs
   tail -f logs/nekobot.log | grep plugin
   ```

4. **LLM Service Connection Failed**
   ```bash
   # Test API connection
   curl -H "Authorization: Bearer $OPENAI_API_KEY" \
        https://api.openai.com/v1/models
   ```

### Configuration Debugging

```bash
# Enable debug mode
export NEKOBOT_DEBUG=true

# View detailed logs
export LOG_LEVEL=DEBUG

# Start service
python main.py
```

## Configuration Examples

### Development Environment Configuration

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

### Production Environment Configuration

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

With proper configuration, you can make NekoBot perform optimally in your environment!

