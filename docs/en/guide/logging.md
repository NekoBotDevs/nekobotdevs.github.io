# Logging Management

NekoBot provides a complete logging management system to help you monitor and debug bot running status.

## Logging System Overview

### Log Levels

NekoBot supports the following log levels (in order of severity):

- **DEBUG** - Debug information, detailed program execution information
- **INFO** - General information, normal program running information
- **WARNING** - Warning information, potential issues
- **ERROR** - Error information, program errors
- **CRITICAL** - Critical errors, program cannot continue

### Log Categories

- **System Logs** - Core system running logs
- **Plugin Logs** - Plugin execution logs
- **Platform Logs** - Platform integration logs
- **API Logs** - API request logs
- **Database Logs** - Database operation logs

## Logging Configuration

### Basic Configuration

```yaml
# config/logging.yaml
logging:
  level: "INFO"                       # Global log level
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  date_format: "%Y-%m-%d %H:%M:%S"
  
  # File logging configuration
  file:
    enabled: true
    path: "logs/nekobot.log"
    max_size: "10MB"
    backup_count: 5
    rotation: "daily"
  
  # Console logging configuration
  console:
    enabled: true
    colored: true
    level: "INFO"
```

### Advanced Configuration

```yaml
logging:
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
  
  # Database logging
  database:
    enabled: false
    table: "logs"
    max_records: 10000
    cleanup_interval: 86400
  
  # Remote logging
  remote:
    enabled: false
    url: "https://logs.nekobot.dev/api/logs"
    api_key: "your-api-key"
    batch_size: 100
    flush_interval: 5
```

## Viewing Logs

### Real-time Logs

#### Command Line Viewing

```bash
# View real-time logs
tail -f logs/nekobot.log

# View specific level logs
tail -f logs/nekobot.log | grep ERROR

# View specific module logs
tail -f logs/nekobot.log | grep "nekobot.plugins"
```

#### Web Interface Viewing

Visit `http://localhost:8080/logs` to view real-time log stream.

### Log Search

#### Search by Time

```bash
# View today's logs
grep "$(date +%Y-%m-%d)" logs/nekobot.log

# View logs for specific time period
grep "2024-01-01 10:" logs/nekobot.log
```

#### Search by Keywords

```bash
# Search error logs
grep -i "error" logs/nekobot.log

# Search specific user logs
grep "user_id:123456" logs/nekobot.log

# Search specific plugin logs
grep "weather_plugin" logs/nekobot.log
```

#### Combined Search

```bash
# Search today's error logs
grep "$(date +%Y-%m-%d)" logs/nekobot.log | grep -i "error"

# Search warning logs for specific time period
grep "2024-01-01 10:" logs/nekobot.log | grep -i "warning"
```

## Log Analysis

### Log Statistics

```bash
# Count logs by level
grep -c "DEBUG" logs/nekobot.log
grep -c "INFO" logs/nekobot.log
grep -c "WARNING" logs/nekobot.log
grep -c "ERROR" logs/nekobot.log
grep -c "CRITICAL" logs/nekobot.log
```

### Error Analysis

```bash
# View recent errors
grep -i "error" logs/nekobot.log | tail -20

# Count error types
grep -i "error" logs/nekobot.log | cut -d':' -f4 | sort | uniq -c

# View error stack traces
grep -A 5 -B 5 "Traceback" logs/nekobot.log
```

### Performance Analysis

```bash
# View response time logs
grep "response_time" logs/nekobot.log

# Calculate average response time
grep "response_time" logs/nekobot.log | awk '{print $NF}' | awk '{sum+=$1; count++} END {print sum/count}'
```

## Log Rotation

### Automatic Rotation

```yaml
logging:
  file:
    enabled: true
    path: "logs/nekobot.log"
    max_size: "10MB"        # Maximum single file size
    backup_count: 5         # Number of backup files to keep
    rotation: "daily"       # Rotation method: daily, weekly, monthly
```

### Manual Rotation

```bash
# Manually rotate logs
mv logs/nekobot.log logs/nekobot.log.$(date +%Y%m%d)
touch logs/nekobot.log

# Compress old logs
gzip logs/nekobot.log.*
```

## Log Cleanup

### Automatic Cleanup

```yaml
logging:
  cleanup:
    enabled: true
    max_age_days: 30        # Retention days
    max_size_mb: 1000       # Maximum total size
    cleanup_interval: 86400 # Cleanup interval (seconds)
```

### Manual Cleanup

```bash
# Delete logs older than 30 days
find logs/ -name "*.log.*" -mtime +30 -delete

# Compress old logs
find logs/ -name "*.log.*" -mtime +7 -exec gzip {} \;
```

## Log Monitoring

### Real-time Monitoring

```python
# Monitor log file changes
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
            # Send alert
            send_alert(line)
```

### Alert Configuration

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

## Log Export

### Export Logs

```bash
# Export logs for specific time period
grep "2024-01-01" logs/nekobot.log > logs/2024-01-01.log

# Export error logs
grep -i "error" logs/nekobot.log > logs/errors.log

# Export specific module logs
grep "nekobot.plugins" logs/nekobot.log > logs/plugins.log
```

### Log Format Conversion

```bash
# Convert to CSV format
awk '{print $1","$2","$3","$4","$5}' logs/nekobot.log > logs/nekobot.csv

# Convert to JSON format
jq -R 'split(" - ") | {timestamp: .[0], level: .[2], message: .[3]}' logs/nekobot.log > logs/nekobot.json
```

## Debugging Tips

### Enable Debug Mode

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

### Plugin Debugging

```python
# Enable debug logging in plugins
import logging

logger = logging.getLogger(f"plugin.{self.name}")
logger.setLevel(logging.DEBUG)

# Add debug information
logger.debug(f"Plugin {self.name} initialized")
logger.info(f"Command executed: {command}")
logger.warning(f"Configuration missing: {key}")
logger.error(f"Plugin error: {error}")
```

### Performance Debugging

```python
import time
import logging

logger = logging.getLogger("performance")

# Record function execution time
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
    # Slow operation
    pass
```

## Best Practices

### 1. Log Level Usage

- **DEBUG**: Detailed debug information, usually disabled in production
- **INFO**: Important program running information
- **WARNING**: Potential issues, but doesn't affect program running
- **ERROR**: Program errors, need attention
- **CRITICAL**: Critical errors, program cannot continue

### 2. Log Content

- Include sufficient context information
- Avoid logging sensitive information
- Use structured log format
- Include timestamps and module information

### 3. Performance Considerations

- Avoid logging large amounts in loops
- Use async logging
- Regularly clean old logs
- Monitor log file size

### 4. Security Considerations

- Filter sensitive information
- Restrict log access permissions
- Regularly backup important logs
- Monitor abnormal log patterns

## Troubleshooting

### Common Issues

1. **Log File Too Large**
   - Enable log rotation
   - Adjust log level
   - Clean old logs

2. **Log Loss**
   - Check disk space
   - Verify file permissions
   - Check logging configuration

3. **Performance Impact**
   - Reduce log output
   - Use async logging
   - Optimize log format

4. **Permission Issues**
   - Check file permissions
   - Verify user permissions
   - Check directory permissions

With the above configuration and techniques, you can fully utilize NekoBot's logging system to effectively monitor and debug bot running status!

