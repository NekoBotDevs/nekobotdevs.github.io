# 日志管理

NekoBot 提供完整的日志管理系统，帮助您监控和调试机器人运行状态。

## 日志系统概述

### 日志级别

NekoBot 支持以下日志级别（按严重程度排序）：

- **DEBUG** - 调试信息，详细的程序执行信息
- **INFO** - 一般信息，程序正常运行信息
- **WARNING** - 警告信息，可能的问题
- **ERROR** - 错误信息，程序错误
- **CRITICAL** - 严重错误，程序无法继续运行

### 日志分类

- **系统日志** - 核心系统运行日志
- **插件日志** - 插件执行日志
- **平台日志** - 平台对接日志
- **API日志** - API请求日志
- **数据库日志** - 数据库操作日志

## 日志配置

### 基础配置

```yaml
# config/logging.yaml
logging:
  level: "INFO"                       # 全局日志级别
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  date_format: "%Y-%m-%d %H:%M:%S"
  
  # 文件日志配置
  file:
    enabled: true
    path: "logs/nekobot.log"
    max_size: "10MB"
    backup_count: 5
    rotation: "daily"
  
  # 控制台日志配置
  console:
    enabled: true
    colored: true
    level: "INFO"
```

### 高级配置

```yaml
logging:
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
  
  # 数据库日志
  database:
    enabled: false
    table: "logs"
    max_records: 10000
    cleanup_interval: 86400
  
  # 远程日志
  remote:
    enabled: false
    url: "https://logs.nekobot.dev/api/logs"
    api_key: "your-api-key"
    batch_size: 100
    flush_interval: 5
```

## 日志查看

### 实时日志

#### 命令行查看

```bash
# 查看实时日志
tail -f logs/nekobot.log

# 查看特定级别日志
tail -f logs/nekobot.log | grep ERROR

# 查看特定模块日志
tail -f logs/nekobot.log | grep "nekobot.plugins"
```

#### Web 界面查看

访问 `http://localhost:8080/logs` 查看实时日志流。

### 日志搜索

#### 按时间搜索

```bash
# 查看今天的日志
grep "$(date +%Y-%m-%d)" logs/nekobot.log

# 查看特定时间段的日志
grep "2024-01-01 10:" logs/nekobot.log
```

#### 按关键词搜索

```bash
# 搜索错误日志
grep -i "error" logs/nekobot.log

# 搜索特定用户日志
grep "user_id:123456" logs/nekobot.log

# 搜索特定插件日志
grep "weather_plugin" logs/nekobot.log
```

#### 组合搜索

```bash
# 搜索今天的错误日志
grep "$(date +%Y-%m-%d)" logs/nekobot.log | grep -i "error"

# 搜索特定时间段的警告日志
grep "2024-01-01 10:" logs/nekobot.log | grep -i "warning"
```

## 日志分析

### 日志统计

```bash
# 统计各级别日志数量
grep -c "DEBUG" logs/nekobot.log
grep -c "INFO" logs/nekobot.log
grep -c "WARNING" logs/nekobot.log
grep -c "ERROR" logs/nekobot.log
grep -c "CRITICAL" logs/nekobot.log
```

### 错误分析

```bash
# 查看最近的错误
grep -i "error" logs/nekobot.log | tail -20

# 统计错误类型
grep -i "error" logs/nekobot.log | cut -d':' -f4 | sort | uniq -c

# 查看错误堆栈
grep -A 5 -B 5 "Traceback" logs/nekobot.log
```

### 性能分析

```bash
# 查看响应时间日志
grep "response_time" logs/nekobot.log

# 统计平均响应时间
grep "response_time" logs/nekobot.log | awk '{print $NF}' | awk '{sum+=$1; count++} END {print sum/count}'
```

## 日志轮转

### 自动轮转

```yaml
logging:
  file:
    enabled: true
    path: "logs/nekobot.log"
    max_size: "10MB"        # 单个文件最大大小
    backup_count: 5         # 保留的备份文件数量
    rotation: "daily"       # 轮转方式：daily, weekly, monthly
```

### 手动轮转

```bash
# 手动轮转日志
mv logs/nekobot.log logs/nekobot.log.$(date +%Y%m%d)
touch logs/nekobot.log

# 压缩旧日志
gzip logs/nekobot.log.*
```

## 日志清理

### 自动清理

```yaml
logging:
  cleanup:
    enabled: true
    max_age_days: 30        # 保留天数
    max_size_mb: 1000       # 最大总大小
    cleanup_interval: 86400 # 清理间隔（秒）
```

### 手动清理

```bash
# 删除30天前的日志
find logs/ -name "*.log.*" -mtime +30 -delete

# 压缩旧日志
find logs/ -name "*.log.*" -mtime +7 -exec gzip {} \;
```

## 日志监控

### 实时监控

```python
# 监控日志文件变化
import time
import subprocess

def monitor_logs():
    process = subprocess.Popen(
        ['tail', '-f', 'logs/nekobot.log'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    
    for line in process.stdout:
        if "ERROR" in line:
            # 发送告警
            send_alert(line)
```

### 告警配置

```yaml
logging:
  alerts:
    enabled: true
    rules:
      - condition: "ERROR count > 10 in 1 minute"
        action: "send_email"
        recipients: ["admin@example.com"]
      
      - condition: "CRITICAL level log"
        action: "send_sms"
        recipients: ["+1234567890"]
      
      - condition: "disk space < 1GB"
        action: "cleanup_logs"
```

## 日志导出

### 导出日志

```bash
# 导出特定时间段的日志
grep "2024-01-01" logs/nekobot.log > logs/2024-01-01.log

# 导出错误日志
grep -i "error" logs/nekobot.log > logs/errors.log

# 导出特定模块日志
grep "nekobot.plugins" logs/nekobot.log > logs/plugins.log
```

### 日志格式转换

```bash
# 转换为CSV格式
awk '{print $1","$2","$3","$4","$5}' logs/nekobot.log > logs/nekobot.csv

# 转换为JSON格式
jq -R 'split(" - ") | {timestamp: .[0], level: .[2], message: .[3]}' logs/nekobot.log > logs/nekobot.json
```

## 调试技巧

### 启用调试模式

```yaml
# config/config.yaml
bot:
  debug: true

logging:
  level: "DEBUG"
  console:
    enabled: true
    colored: true
```

### 插件调试

```python
# 在插件中启用调试日志
import logging

logger = logging.getLogger(f"plugin.{self.name}")
logger.setLevel(logging.DEBUG)

# 添加调试信息
logger.debug(f"Plugin {self.name} initialized")
logger.info(f"Command executed: {command}")
logger.warning(f"Configuration missing: {key}")
logger.error(f"Plugin error: {error}")
```

### 性能调试

```python
import time
import logging

logger = logging.getLogger("performance")

# 记录函数执行时间
def time_function(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        logger.info(f"{func.__name__} executed in {end_time - start_time:.2f}s")
        return result
    return wrapper

@time_function
async def slow_operation():
    # 慢操作
    pass
```

## 最佳实践

### 1. 日志级别使用

- **DEBUG**: 详细的调试信息，生产环境通常关闭
- **INFO**: 重要的程序运行信息
- **WARNING**: 可能的问题，但不影响程序运行
- **ERROR**: 程序错误，需要关注
- **CRITICAL**: 严重错误，程序无法继续

### 2. 日志内容

- 包含足够的上下文信息
- 避免记录敏感信息
- 使用结构化的日志格式
- 包含时间戳和模块信息

### 3. 性能考虑

- 避免在循环中记录大量日志
- 使用异步日志记录
- 定期清理旧日志
- 监控日志文件大小

### 4. 安全考虑

- 过滤敏感信息
- 限制日志访问权限
- 定期备份重要日志
- 监控异常日志模式

## 故障排除

### 常见问题

1. **日志文件过大**
   - 启用日志轮转
   - 调整日志级别
   - 清理旧日志

2. **日志丢失**
   - 检查磁盘空间
   - 验证文件权限
   - 检查日志配置

3. **性能影响**
   - 减少日志输出
   - 使用异步日志
   - 优化日志格式

4. **权限问题**
   - 检查文件权限
   - 验证用户权限
   - 检查目录权限

通过以上配置和技巧，您就可以充分利用 NekoBot 的日志系统，有效监控和调试机器人运行状态！

