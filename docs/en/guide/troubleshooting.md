# Troubleshooting

This chapter provides solutions and debugging methods for common issues encountered while using NekoBot.

## Installation and Startup Issues

### NekoBot Fails to Start

**Problem Description**: The program cannot start normally when running `python main.py`.

**Possible Causes and Solutions**:

1. **Python Version Incompatibility**
   ```bash
   # Check Python version
   python --version
   # Ensure using Python 3.10 or higher
   ```

2. **Dependencies Not Installed**
   ```bash
   # Create virtual environment
   uv venv
   # Activate virtual environment
   .\venv\Scripts\activate
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Port Already in Use**
   ```bash
   # Check port usage
   netstat -ano | findstr :8080
   # Terminate occupying process
   taskkill /PID <PID> /F
   ```

### Database Connection Failure

**Problem Description**: Database connection error occurs during startup.

**Solutions**:

1. **Check SQLite Database File**
   ```bash
   # Ensure database file exists
   ls -la data/
   # Recreate if not exists
   python -c "import aiosqlite; import asyncio; asyncio.run(aiosqlite.connect('data/nekobot.db'))"
   ```

2. **Check Database Permissions**
   ```bash
   # Ensure program has read/write permissions
   chmod 755 data/
   chmod 644 data/nekobot.db
   ```

## Plugin Related Issues

### Plugin Installation Fails

**Problem Description**: Errors occur during plugin installation.

**Possible Causes and Solutions**:

1. **Network Connection Issues**
   - Check network connection
   - Try using GitHub proxy
   - Check firewall settings

2. **Incorrect Plugin Format**
   ```bash
   # Check plugin structure
   unzip -l plugin.zip
   # Ensure necessary files are included
   # - metadata.yaml
   # - main.py
   # - requirements.txt
   # - README.md
   ```

3. **Dependency Installation Failure**
   ```bash
   # Manually install dependencies
   pip install -r requirements.txt
   # Check pip source configuration
   pip config list
   ```

### Plugin Cannot Be Enabled

**Problem Description**: Plugin installed successfully but cannot be enabled.

**Solutions**:

1. **Check Plugin Code**
   ```python
   # Ensure plugin class inherits correctly
   from nekobot.base import Neko
   
   class MyPlugin(Neko.base):
       def __init__(self):
           super().__init__()
   ```

2. **Check Decorator Usage**
   ```python
   # Ensure necessary decorators are used
   @Neko.base.Register
   def register_commands(self):
       pass
   ```

3. **View Plugin Logs**
   ```bash
   # View plugin-related logs
   tail -f logs/plugins.log
   # Check error messages
   grep "ERROR" logs/plugins.log
   ```

### Plugin Hot Reload Fails

**Problem Description**: Errors occur or no response when reloading plugins.

**Solutions**:

1. **Check File Monitoring**
   ```bash
   # Check file change monitoring status
   ps aux | grep watchfiles
   ```

2. **Manually Reload Plugin**
   ```bash
   # Use CLI command to reload
   nekobot-cli reload-plugin <plugin_name>
   ```

3. **Clear Module Cache**
   ```python
   # Add cleanup logic in plugin
   import sys
   if 'data.plugins.my_plugin' in sys.modules:
       del sys.modules['data.plugins.my_plugin']
   ```

## LLM/TTL Service Issues

### API Connection Failure

**Problem Description**: Unable to connect to LLM/TTL service providers.

**Solutions**:

1. **Check API Configuration**
   ```bash
   # Check configuration in database
   sqlite3 data/nekobot.db "SELECT * FROM llm_providers;"
   ```

2. **Verify API Key**
   ```python
   # Test API connection
   import openai
   client = OpenAI(api_key="your-api-key")
   try:
       response = client.chat.completions.create(
           model="gpt-3.5-turbo",
           messages=[{"role": "user", "content": "Hello"}]
       )
       print("API connection successful")
   except Exception as e:
       print(f"API connection failed: {e}")
   ```

3. **Check Network Proxy**
   ```bash
   # Check environment variables
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   # Set proxy if needed
   export HTTP_PROXY=http://proxy.example.com:8080
   export HTTPS_PROXY=http://proxy.example.com:8080
   ```

### Model Response Timeout

**Problem Description**: LLM model response time is too long or times out.

**Solutions**:

1. **Adjust Timeout Settings**
   ```python
   # Increase timeout in configuration
   config = {
       "timeout": 60,  # Increase to 60 seconds
       "max_retries": 3
   }
   ```

2. **Optimize Prompts**
   - Reduce prompt length
   - Clarify instructions
   - Avoid complex reasoning tasks

3. **Use Faster Models**
   ```json
   {
     "model": "gpt-3.5-turbo",
     "max_tokens": 1000
   }
   ```

## Platform Integration Issues

### QQ Bot Connection Failure

**Problem Description**: QQ bot cannot connect or message sending fails.

**Solutions**:

1. **Check OneBot Protocol Configuration**
   ```yaml
   # config.yaml
   qq:
     protocol: "onebot-v11"
     ws_url: "ws://localhost:8080"
     http_url: "http://localhost:8080"
   ```

2. **Check aiocqhttp Status**
   ```bash
   # Check service status
   ps aux | grep aiocqhttp
   # View logs
   tail -f logs/qq.log
   ```

3. **Verify Message Format**
   ```python
   # Ensure message format is correct
   message = {
       "message_type": "group",
       "group_id": 123456,
       "message": "Hello World"
   }
   ```

### Discord Bot Issues

**Problem Description**: Discord bot is unresponsive or has permission errors.

**Solutions**:

1. **Check Bot Token**
   ```python
   # Verify token validity
   import discord
   bot = discord.Client()
   @bot.event
   async def on_ready():
       print(f'Logged in as {bot.user}')
   bot.run('your-bot-token')
   ```

2. **Check Permission Settings**
   - Ensure bot has message sending permissions
   - Check channel permission settings
   - Verify bot invite link permissions

3. **Check Intent Configuration**
   ```python
   # Ensure necessary intents are enabled
   intents = discord.Intents.default()
   intents.message_content = True
   bot = discord.Client(intents=intents)
   ```

## Dashboard Issues

### Unable to Login to Dashboard

**Problem Description**: Cannot access web dashboard or login fails.

**Solutions**:

1. **Check Service Status**
   ```bash
   # Check Quart service
   ps aux | grep quart
   # Check port usage
   netstat -ano | findstr :5000
   ```

2. **Reset Password**
   ```bash
   # Use CLI to reset password
   nekobot-cli reset-passwd
   ```

3. **Check JWT Configuration**
   ```python
   # Verify JWT secret key
   import jwt
   try:
       token = jwt.encode({"user": "admin"}, "your-secret-key", algorithm="HS256")
       print("JWT configuration normal")
   except Exception as e:
       print(f"JWT configuration error: {e}")
   ```

### Real-time Logs Not Displaying

**Problem Description**: Real-time log functionality in dashboard is not working properly.

**Solutions**:

1. **Check WebSocket Connection**
   ```javascript
   // Check in browser console
   const ws = new WebSocket('ws://localhost:5000/api/v1/logs/stream');
   ws.onopen = () => console.log('WebSocket connection successful');
   ws.onerror = (error) => console.error('WebSocket error:', error);
   ```

2. **Check Log Configuration**
   ```python
   # Ensure log level is correct
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

3. **Check Firewall Settings**
   ```bash
   # Ensure WebSocket port is open
   firewall-cmd --list-ports
   firewall-cmd --add-port=5000/tcp --permanent
   ```

## Docker Sandbox Issues

### Container Startup Failure

**Problem Description**: Docker container cannot start or code execution fails.

**Solutions**:

1. **Check Docker Service**
   ```bash
   # Check Docker status
   docker --version
   docker info
   # Restart Docker service
   sudo systemctl restart docker
   ```

2. **Check Image Configuration**
   ```bash
   # Check if image exists
   docker images | grep nekobot-sandbox
   # Pull image
   docker pull nekobot/sandbox:latest
   ```

3. **Check Resource Limits**
   ```bash
   # Check memory and CPU limits
   docker run --memory=512m --cpus=1.0 nekobot/sandbox python --version
   ```

### Code Execution Timeout

**Problem Description**: Code execution in Docker container times out.

**Solutions**:

1. **Adjust Timeout Settings**
   ```python
   # Increase execution timeout
   config = {
       "timeout": 30,  # Increase to 30 seconds
       "memory_limit": "512m"
   }
   ```

2. **Optimize Code Performance**
   - Reduce loop iterations
   - Optimize algorithm complexity
   - Use more efficient libraries

3. **Check Output Format**
   ```python
   # Ensure correct output format is used
   print("[NEKOBOT_TEXT_OUTPUT#magic_code]: Hello World")
   ```

## Performance Issues

### High Memory Usage

**Problem Description**: NekoBot process memory usage continues to grow.

**Solutions**:

1. **Monitor Memory Usage**
   ```bash
   # Monitor process memory
   ps aux | grep nekobot
   # Use memory analysis tools
   mprof run --include-children python main.py
   ```

2. **Clear Cache**
   ```python
   # Periodically clear cache
   import gc
   gc.collect()
   ```

3. **Optimize Database Connections**
   ```python
   # Use connection pool
   from aiosqlite import create_pool
   db_pool = await create_pool('data/nekobot.db')
   ```

### High CPU Usage

**Problem Description**: CPU usage remains consistently high.

**Solutions**:

1. **Analyze CPU Usage**
   ```bash
   # Analyze CPU usage
   top -p <nekobot-pid>
   # Use performance analysis tools
   python -m cProfile -o profile.prof main.py
   ```

2. **Optimize Async Operations**
   ```python
   # Use async IO
   import asyncio
   async def async_operation():
       # Async operation
       pass
   ```

3. **Limit Concurrency**
   ```python
   # Limit concurrent requests
   semaphore = asyncio.Semaphore(10)
   
   async def limited_operation():
       async with semaphore:
           # Execute operation
           pass
   ```

## Log Analysis

### Viewing Error Logs

**Problem Description**: Need to quickly locate and resolve issues.

**Solutions**:

1. **Filter Error Logs**
   ```bash
   # View all error logs
   grep "ERROR" logs/*.log
   # View logs for specific time period
   grep "2024-01-01 10:" logs/app.log | grep "ERROR"
   ```

2. **Real-time Log Monitoring**
   ```bash
   # View logs in real-time
   tail -f logs/app.log
   # Multi-file real-time monitoring
   multitail logs/*.log
   ```

3. **Log Analysis Tools**
   ```bash
   # Use log analysis tools
   goaccess -f logs/access.log
   # Use ELK Stack for log analysis
   ```

### Debug Mode

**Problem Description**: Need detailed debugging information.

**Solutions**:

1. **Enable Debug Mode**
   ```python
   # Enable debug in configuration
   import logging
   logging.basicConfig(
       level=logging.DEBUG,
       format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
   )
   ```

2. **Use Debugger**
   ```bash
   # Use pdb for debugging
   python -m pdb main.py
   # Use IDE debugger
   # Set breakpoints in VSCode
   ```

3. **Performance Analysis**
   ```python
   # Use cProfile for performance analysis
   import cProfile
   import pstats
   
   profiler = cProfile.Profile()
   profiler.enable()
   
   # Run code
   profiler.disable()
   stats = pstats.Stats(profiler)
   stats.sort_stats('cumulative')
   stats.print_stats()
   ```

## Common Error Codes

### System Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| 1001 | Database connection failed | Check database file and permissions |
| 1002 | Configuration file error | Check configuration file format |
| 1003 | Port already in use | Change port or terminate occupying process |
| 1004 | Insufficient permissions | Check file and directory permissions |

### Plugin Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| 2001 | Plugin format error | Check plugin file structure |
| 2002 | Dependency installation failed | Manually install dependencies |
| 2003 | Plugin loading failed | Check plugin code |
| 2004 | Plugin conflict | Disable conflicting plugins |

### API Error Codes

| Error Code | Description | Solution |
|------------|-------------|----------|
| 3001 | API authentication failed | Check API key |
| 3002 | Request timeout | Increase timeout |
| 3003 | Rate limit exceeded | Reduce request frequency |
| 3004 | Service unavailable | Check service status |

## Contact Support

If the above solutions cannot resolve your issue, please get support through the following channels:

1. **GitHub Issues**
   - Visit: https://github.com/NekoBotDevs/nekobotdevs.github.io/issues
   - Provide detailed error information and reproduction steps

2. **Community Support**
   - Join QQ Group: [Group Number]
   - Join Discord: [Invite Link]
   - Join Telegram: [Group Link]

3. **Email Support**
   - Email: support@nekobot.dev
   - Please provide system information and error logs

## Issue Reporting Template

To better help you solve the problem, please use the following template to report issues:

```markdown
## Problem Description
Brief description of the issue encountered

## Reproduction Steps
1. Actions performed
2. Expected results
3. Actual results

## Environment Information
- Operating System: [Windows/Linux/macOS]
- Python Version: [3.x.x]
- NekoBot Version: [x.x.x]
- Database: [SQLite]

## Error Logs
```
Paste relevant error logs here
```

## Additional Information
Any other information that may help solve the problem
