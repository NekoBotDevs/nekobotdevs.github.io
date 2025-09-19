# Plugin Development

Welcome to the NekoBot plugin development guide! This guide will help you create powerful plugins to extend bot functionality.

## Plugin Overview

NekoBot's plugin system is based on Python and supports:

- **Hot Reload** - Update plugins without restarting the service
- **Dependency Management** - Automatically install and manage plugin dependencies
- **Event System** - Listen to and handle various events
- **Command Registration** - Easily register custom commands
- **Database Operations** - Built-in database support
- **Scheduled Tasks** - Support for scheduled task execution
- **Configuration Management** - Persistent storage for plugin configurations

## Quick Start

### 1. Create Plugin Project

```bash
mkdir my-awesome-plugin
cd my-awesome-plugin
```

### 2. Create Required Files

```bash
# Create plugin directory structure
mkdir -p nekobot_plugins
cd nekobot_plugins

# Create required files
touch metadata.yaml main.py requirements.txt README.md
```

### 3. Write Plugin Code

```python
# main.py
from nekobot.base import Neko
from nekobot.types import Message

class MyPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        self.name = "My Plugin"
        self.version = "1.0.0"
    
    @Neko.base.Register
    def register_commands(self):
        """Register commands"""
        @self.command("hello")
        async def hello_command(message: Message):
            """Hello command"""
            await message.reply("Hello, World!")
```

### 4. Configure Plugin Metadata

```yaml
# metadata.yaml
name: My Plugin
version: 1.0.0
description: A simple example plugin
author: Your Name
repository: https://github.com/username/my-awesome-plugin
```

### 5. Define Dependencies

```txt
# requirements.txt
requests>=2.25.0
beautifulsoup4>=4.9.0
```

## Plugin Architecture

### Directory Structure

```
my-awesome-plugin/
├── nekobot_plugins/
│   ├── metadata.yaml      # Plugin metadata
│   ├── main.py           # Plugin main program
│   ├── requirements.txt  # Dependency list
│   └── README.md         # Plugin documentation
├── tests/                # Test files
├── docs/                 # Plugin documentation
└── .gitignore           # Git ignore file
```

### Core Class

All plugins must inherit from the `Neko.base` class:

```python
from nekobot.base import Neko

class MyPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        # Plugin initialization
```

### Lifecycle Decorators

Plugins must implement the following decorators to manage lifecycle:

```python
@Neko.base.Register
def register_commands(self):
    """Register commands - must implement"""
    pass

@Neko.base.Unregister
def unregister_commands(self):
    """Unregister commands - must implement"""
    pass

@Neko.base.Reload
def reload_plugin(self):
    """Reload plugin - must implement"""
    pass

@Neko.base.Enable
def enable_plugin(self):
    """Enable plugin - must implement"""
    pass

@Neko.base.Disable
def disable_plugin(self):
    """Disable plugin - must implement"""
    pass

@Neko.base.Update
def update_plugin(self):
    """Update plugin - optional implementation"""
    pass

@Neko.base.export_commands
def export_commands(self):
    """Export commands to other plugins - optional implementation"""
    pass
```

## Command System

### Register Commands

```python
@Neko.base.Register
def register_commands(self):
    @self.command("hello")
    async def hello_command(message: Message):
        """Hello command"""
        await message.reply("Hello, World!")
    
    @self.command("weather")
    async def weather_command(message: Message):
        """Weather query command"""
        city = message.args[0] if message.args else "Beijing"
        weather = await self.get_weather(city)
        await message.reply(weather)
```

### Command Parameters

```python
@self.command("search")
async def search_command(message: Message):
    """Search command"""
    if not message.args:
        await message.reply("Please provide search keywords")
        return
    
    keyword = " ".join(message.args)
    results = await self.search(keyword)
    await message.reply(f"Search results:\n{results}")
```

### Command Permissions

```python
@self.command("admin", permission="admin")
async def admin_command(message: Message):
    """Admin command"""
    await message.reply("This is an admin-only command")
```

### Command Aliases

```python
@self.command("help", aliases=["h", "帮助"])
async def help_command(message: Message):
    """Help command"""
    await message.reply("This is help information")
```

## Event System

### Listen to Messages

```python
@self.event("message")
async def on_message(message: Message):
    """Listen to all messages"""
    if message.content.startswith("!"):
        await message.reply("Detected message starting with exclamation mark")
```

### Listen to Specific Events

```python
@self.event("user_join")
async def on_user_join(user: User):
    """User join event"""
    await self.send_message(f"Welcome {user.name}!")

@self.event("user_leave")
async def on_user_leave(user: User):
    """User leave event"""
    await self.send_message(f"{user.name} left")
```

### Custom Events

```python
# Trigger custom event
await self.trigger_event("custom_event", data={"key": "value"})

# Listen to custom event
@self.event("custom_event")
async def on_custom_event(data: dict):
    """Custom event handler"""
    print(f"Received custom event: {data}")
```

## Database Operations

### Create Tables

```python
async def create_tables(self):
    """Create database tables"""
    await self.db.create_table("users", {
        "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
        "user_id": "TEXT UNIQUE NOT NULL",
        "username": "TEXT",
        "created_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    })
```

### Data Operations

```python
# Insert data
await self.db.insert("users", {
    "user_id": "123456",
    "username": "John"
})

# Query data
users = await self.db.select("users", where={"user_id": "123456"})

# Update data
await self.db.update("users", 
    {"username": "Jane"}, 
    where={"user_id": "123456"}
)

# Delete data
await self.db.delete("users", where={"user_id": "123456"})
```

### Complex Queries

```python
# Join queries
query = """
SELECT u.username, p.points 
FROM users u 
LEFT JOIN points p ON u.id = p.user_id 
WHERE u.created_at > ?
"""
results = await self.db.execute(query, ["2024-01-01"])
```

## Scheduled Tasks

### Simple Scheduled Tasks

```python
@self.schedule("0 9 * * *")  # Execute daily at 9 AM
async def daily_task():
    """Daily task"""
    await self.send_message("Good morning! A new day begins!")

@self.schedule(interval=3600)  # Execute every hour
async def hourly_task():
    """Hourly task"""
    await self.check_system_status()
```

### One-time Tasks

```python
# Delayed execution
await self.schedule_once(delay=300, func=self.delayed_task)

async def delayed_task():
    """Delayed task"""
    await self.send_message("Task executed after 5 minutes")
```

## Configuration Management

### Save Configuration

```python
config = {
    "api_key": "your-api-key",
    "timeout": 30,
    "retry_times": 3,
    "enabled_features": ["weather", "news"]
}

await self.save_config(config)
```

### Load Configuration

```python
config = await self.load_config()
api_key = config.get("api_key", "default-key")
```

### Configuration Validation

```python
def validate_config(self, config: dict) -> bool:
    """Validate configuration"""
    required_fields = ["api_key", "timeout"]
    for field in required_fields:
        if field not in config:
            self.logger.error(f"Missing required configuration: {field}")
            return False
    return True
```

## Logging

### Use Logger

```python
# Different log levels
self.logger.debug("Debug information")
self.logger.info("General information")
self.logger.warning("Warning information")
self.logger.error("Error information")
self.logger.critical("Critical error")
```

### Custom Log Format

```python
import logging

# Create custom logger
logger = logging.getLogger(f"plugin.{self.name}")
logger.setLevel(logging.INFO)

# Add handler
handler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)
logger.addHandler(handler)
```

## Error Handling

### Exception Catching

```python
try:
    result = await self.risky_operation()
except ValueError as e:
    self.logger.error(f"Value error: {e}")
    await message.reply("Parameter error, please check input")
except Exception as e:
    self.logger.error(f"Unknown error: {e}")
    await message.reply("Sorry, an unknown error occurred")
```

### Retry Mechanism

```python
import asyncio
from functools import wraps

def retry(max_attempts=3, delay=1):
    """Retry decorator"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    await asyncio.sleep(delay * (2 ** attempt))
            return None
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
async def api_call(self):
    """API call with retry"""
    response = await self.http_client.get("https://api.example.com")
    return response.json()
```

## Testing Plugins

### Unit Tests

```python
# tests/test_plugin.py
import pytest
from unittest.mock import AsyncMock, MagicMock
from nekobot_plugins.main import MyPlugin

@pytest.fixture
def plugin():
    return MyPlugin()

@pytest.fixture
def mock_message():
    message = MagicMock()
    message.content = "/hello"
    message.args = []
    message.reply = AsyncMock()
    return message

@pytest.mark.asyncio
async def test_hello_command(plugin, mock_message):
    """Test hello command"""
    await plugin.hello_command(mock_message)
    mock_message.reply.assert_called_once_with("Hello, World!")
```

### Integration Tests

```python
@pytest.mark.asyncio
async def test_plugin_lifecycle(plugin):
    """Test plugin lifecycle"""
    # Test registration
    await plugin.register_commands()
    assert len(plugin.commands) > 0
    
    # Test enable
    await plugin.enable_plugin()
    assert plugin.enabled
    
    # Test disable
    await plugin.disable_plugin()
    assert not plugin.enabled
```

## Publishing Plugins

### Prepare for Release

1. **Complete Documentation** - Write detailed README.md
2. **Test Plugin** - Ensure all functionality works properly
3. **Version Management** - Update version number
4. **Create GitHub Repository**

### Publish to Plugin Store

1. Create Release on GitHub
2. Upload ZIP file
3. Fill in release notes
4. Submit to plugin store

## Best Practices

### Code Standards

- Use type annotations
- Follow PEP 8 code style
- Add detailed docstrings
- Use async programming

### Performance Optimization

- Avoid blocking operations
- Use connection pooling
- Cache frequently accessed data
- Use memory efficiently

### Security Considerations

- Validate user input
- Prevent SQL injection
- Limit API call frequency
- Protect sensitive information

### User Experience

- Provide clear error messages
- Support command aliases
- Add help information
- Respond promptly

## Example Plugin

### Weather Query Plugin

```python
import aiohttp
from nekobot.base import Neko
from nekobot.types import Message

class WeatherPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        self.name = "Weather Query"
        self.version = "1.0.0"
        self.api_key = None
    
    @Neko.base.Register
    def register_commands(self):
        @self.command("weather", aliases=["天气", "w"])
        async def weather_command(message: Message):
            """Weather query command"""
            if not self.api_key:
                await message.reply("Weather service not configured")
                return
            
            city = message.args[0] if message.args else "Beijing"
            weather = await self.get_weather(city)
            await message.reply(weather)
    
    async def get_weather(self, city: str) -> str:
        """Get weather information"""
        url = "https://api.weather.com/v1/current"
        params = {
            "key": self.api_key,
            "q": city,
            "lang": "en"
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    current = data["current"]
                    return f"{city} weather: {current['condition']['text']}, {current['temp_c']}°C"
                else:
                    return f"Failed to get {city} weather information"
    
    @Neko.base.Enable
    async def enable_plugin(self):
        """Enable plugin"""
        config = await self.load_config()
        self.api_key = config.get("api_key")
        if not self.api_key:
            self.logger.warning("Weather API key not configured")
```

This plugin demonstrates:
- Command registration and aliases
- Async HTTP requests
- Configuration management
- Error handling
- Logging

## Get Help

- 📖 [Complete Documentation](/en/guide/)
- 🐛 [Report Issues](https://github.com/NekoBotDevs/NekoBot/issues)
- 💬 [Community Discussions](https://github.com/NekoBotDevs/NekoBot/discussions)
- 📧 [Technical Support](mailto:support@nekobot.dev)

