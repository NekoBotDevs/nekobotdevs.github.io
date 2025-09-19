# Plugin System

The plugin system is one of the core features of NekoBot, allowing users to extend the bot's functionality through plugins.

## Plugin Architecture

Each plugin must include the following file structure:

```
data/plugins/nekobot_plugins/
├── metadata.yaml          # Plugin metadata
├── main.py               # Plugin main program
├── requirements.txt      # Plugin dependencies
└── README.md            # Plugin documentation
```

### metadata.yaml Format

```yaml
name: Plugin Name
version: 1.0.0
description: Plugin description
author: Author name
repository: https://github.com/username/plugin-repo
```

### main.py Structure

```python
from nekobot.base import Neko

class Plugin(Neko.base):
    """Plugin main class"""
    
    def __init__(self):
        super().__init__()
        self.name = "Example Plugin"
        self.version = "1.0.0"
    
    @Neko.base.Register
    def register_commands(self):
        """Register commands"""
        pass
    
    @Neko.base.Unregister
    def unregister_commands(self):
        """Unregister commands"""
        pass
    
    @Neko.base.Reload
    def reload_plugin(self):
        """Reload plugin"""
        pass
    
    @Neko.base.Enable
    def enable_plugin(self):
        """Enable plugin"""
        pass
    
    @Neko.base.Disable
    def disable_plugin(self):
        """Disable plugin"""
        pass
```

## Plugin Management

### Installing Plugins

#### Method 1: Upload ZIP File

1. Go to the plugin management page
2. Click "Upload Plugin"
3. Select the ZIP file
4. Wait for installation to complete

#### Method 2: GitHub URL

1. Go to the plugin management page
2. Click "Install from GitHub"
3. Enter the repository URL
4. Select branch or tag
5. Click install

#### Method 3: Plugin Store

1. Browse the plugin store
2. Find the desired plugin
3. Click "Install" button
4. Wait for installation to complete

### Managing Plugins

- **Enable/Disable** - Enable or disable plugins at any time
- **Reload** - Support hot reload without restarting the service
- **Update** - Check and install plugin updates
- **Uninstall** - Completely remove the plugin

### Dependency Management

Plugins can include a `requirements.txt` file, and the system will automatically install dependencies:

```txt
requests>=2.25.0
beautifulsoup4>=4.9.0
```

## Developing Plugins

### Creating a Plugin Project

```bash
mkdir my-plugin
cd my-plugin

# Create necessary files
touch metadata.yaml main.py requirements.txt README.md
```

### Writing Plugin Code

```python
from nekobot.base import Neko
from nekobot.types import Message, Command

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
            """Greeting command"""
            await message.reply("Hello, World!")
        
        @self.command("weather")
        async def weather_command(message: Message):
            """Weather query command"""
            city = message.args[0] if message.args else "Beijing"
            # Implement weather query logic
            await message.reply(f"The weather in {city} is sunny")
    
    @Neko.base.Enable
    def enable_plugin(self):
        """Actions when plugin is enabled"""
        self.logger.info("Plugin enabled")
    
    @Neko.base.Disable
    def disable_plugin(self):
        """Actions when plugin is disabled"""
        self.logger.info("Plugin disabled")
```

### Plugin API

#### Message Handling

```python
# Send message
await message.reply("Reply content")

# Send image
await message.send_image("path/to/image.jpg")

# Send file
await message.send_file("path/to/file.txt")
```

#### Event Listening

```python
@self.event("message")
async def on_message(message: Message):
    """Listen to all messages"""
    if message.content.startswith("!"):
        await message.reply("Detected message starting with !")
```

#### Scheduled Tasks

```python
@self.schedule("0 9 * * *")  # Execute at 9 AM daily
async def daily_task():
    """Daily task"""
    # Implement scheduled task logic
    pass
```

#### Database Operations

```python
# Create table
await self.db.create_table("users", {
    "id": "INTEGER PRIMARY KEY",
    "name": "TEXT",
    "created_at": "TIMESTAMP"
})

# Insert data
await self.db.insert("users", {
    "name": "John Doe",
    "created_at": "2024-01-01 00:00:00"
})

# Query data
users = await self.db.select("users", where={"name": "John Doe"})
```

## Publishing Plugins

### Preparing for Release

1. Complete plugin documentation
2. Test plugin functionality
3. Update version number
4. Create GitHub repository

### Publishing to Plugin Store

1. Create Release on GitHub
2. Upload ZIP file
3. Fill in release notes
4. Submit to plugin store

## Best Practices

### Code Standards

- Use type annotations
- Add detailed docstrings
- Follow PEP 8 code style
- Use async programming

### Error Handling

```python
try:
    # Plugin logic
    result = await some_operation()
except Exception as e:
    self.logger.error(f"Plugin execution error: {e}")
    await message.reply("Sorry, plugin execution failed")
```

### Configuration Management

```python
# Plugin configuration
config = {
    "api_key": "your-api-key",
    "timeout": 30,
    "retry_times": 3
}

# Save configuration
await self.save_config(config)

# Read configuration
config = await self.load_config()
```

### Logging

```python
# Use plugin logger
self.logger.info("Plugin started")
self.logger.warning("Configuration missing")
self.logger.error("Execution failed")
```

## Common Questions

### Q: Plugin installation failed?

A: Check the following points:
- Is the plugin format correct?
- Are dependencies satisfied?
- Is network connection normal?
- Check error logs

### Q: Plugin cannot be enabled?

A: Possible reasons:
- Plugin code has syntax errors
- Missing necessary decorators
- Dependencies not installed correctly
- Insufficient permissions

### Q: How to debug plugins?

A: Debugging methods:
- View plugin logs
- Use breakpoint debugging
- Check if configuration is correct
- Test individual functions

## Example Plugins

### Weather Query Plugin

```python
import requests
from nekobot.base import Neko

class WeatherPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        self.name = "Weather Query"
        self.version = "1.0.0"
        self.api_key = "your-weather-api-key"
    
    @Neko.base.Register
    def register_commands(self):
        @self.command("weather")
        async def weather_command(message: Message):
            city = message.args[0] if message.args else "Beijing"
            weather = await self.get_weather(city)
            await message.reply(weather)
    
    async def get_weather(self, city: str):
        """Get weather information"""
        url = f"https://api.weather.com/v1/current"
        params = {
            "key": self.api_key,
            "q": city
        }
        response = requests.get(url, params=params)
        data = response.json()
        return f"Weather in {city}: {data['current']['condition']['text']}"
```

This plugin demonstrates how to:
- Register commands
- Handle user input
- Call external APIs
- Return results to users

## Official Plugins

Official plugins are located in the `packages/` directory. Users cannot delete or disable official plugins.

### Official Plugin Structure

```
packages/
├── official_plugin_1/
│   ├── main.py
│   ├── metadata.yaml
│   └── requirements.txt
├── official_plugin_2/
│   ├── main.py
│   ├── metadata.yaml
│   └── requirements.txt
```

### Official Plugin Features

- Cannot be uninstalled by users
- Cannot be disabled
- Automatically loaded on startup
- Receive priority updates

## Plugin Security

### Sandboxing

NekoBot implements a multi-layered sandbox mechanism to ensure plugin and code execution security:

1. **Plugin Isolation**
   - Each plugin runs in an independent Python module
   - Module cache management through `sys.modules`
   - Namespace isolation using prefixes

2. **Permission Control**
   - Role-based permission control
   - Support for four permission levels: owner, group admin, admin, user
   - Dynamic permission configuration

3. **Docker Sandbox**
   - Code execution in Docker containers
   - Resource limits (memory: 512MB, CPU: 1 core)
   - Automatic cleanup after execution

### Security Best Practices

1. **Input Validation**
   ```python
   # Validate user input
   if not isinstance(user_input, str):
       raise ValueError("Invalid input type")
   
   # Sanitize input
   sanitized_input = user_input.strip()
   ```

2. **Safe File Operations**
   ```python
   # Use safe file paths
   import os
   safe_path = os.path.join("data", "plugins", filename)
   
   # Check path traversal
   if ".." in filename or "/" in filename:
       raise SecurityError("Invalid file path")
   ```

3. **Resource Limits**
   ```python
   # Set execution timeouts
   import asyncio
   try:
       await asyncio.wait_for(async_operation(), timeout=30.0)
   except asyncio.TimeoutError:
       self.logger.warning("Operation timed out")
   ```

## Plugin Lifecycle

### Loading Process

1. **Discovery** - Scan plugin directories
2. **Validation** - Check plugin structure and metadata
3. **Dependency Installation** - Install required dependencies
4. **Initialization** - Create plugin instance
5. **Registration** - Register commands and event handlers

### Runtime Management

1. **Enable/Disable** - Control plugin availability
2. **Reload** - Hot reload plugin code
3. **Update** - Update plugin version
4. **Uninstall** - Remove plugin completely

### Cleanup Process

1. **Unregistration** - Remove commands and event handlers
2. **Resource Cleanup** - Release allocated resources
3. **Module Cleanup** - Clear module cache
4. **File Cleanup** - Remove plugin files

## Advanced Features

### Plugin Dependencies

```python
# Declare plugin dependencies
metadata.yaml
dependencies:
  - plugin_name: "database_helper"
    min_version: "1.0.0"
  - plugin_name: "api_client"
    min_version: "2.0.0"
```

### Plugin Communication

```python
# Inter-plugin communication
@Neko.base.export_commands
def get_helper_functions():
    """Export functions for other plugins"""
    return {
        "format_date": format_date,
        "validate_input": validate_input
    }

# Use functions from other plugins
helper_funcs = self.get_plugin_functions("database_helper")
formatted_date = helper_funcs["format_date"](datetime.now())
```

### Plugin Configuration

```python
# Complex configuration schema
config_schema = {
    "type": "object",
    "properties": {
        "api_settings": {
            "type": "object",
            "properties": {
                "timeout": {"type": "number", "minimum": 1},
                "retries": {"type": "integer", "minimum": 0}
            }
        },
        "features": {
            "type": "array",
            "items": {"type": "string"}
        }
    }
}

# Validate configuration
def validate_config(config):
    import jsonschema
    jsonschema.validate(config, config_schema)
```

## Performance Optimization

### Efficient Plugin Design

1. **Lazy Loading**
   ```python
   def __init__(self):
       self._heavy_resource = None
   
   @property
   def heavy_resource(self):
       if self._heavy_resource is None:
           self._heavy_resource = load_heavy_resource()
       return self._heavy_resource
   ```

2. **Connection Pooling**
   ```python
   async def __init__(self):
       self.connection_pool = await create_pool(
           'data/plugin_db.db',
           max_size=10
       )
   ```

3. **Caching**
   ```python
   from functools import lru_cache
   
   @lru_cache(maxsize=100)
   def get_cached_data(self, key):
       return self.fetch_data_from_source(key)
   ```

### Memory Management

1. **Resource Cleanup**
   ```python
   async def cleanup(self):
       # Close connections
       await self.connection_pool.close()
       # Clear caches
       self.cache.clear()
       # Release file handles
       if hasattr(self, 'file_handle'):
           self.file_handle.close()
   ```

2. **Memory Monitoring**
   ```python
   import psutil
   
   def check_memory_usage(self):
       process = psutil.Process()
       memory_info = process.memory_info()
       if memory_info.rss > 100 * 1024 * 1024:  # 100MB
           self.logger.warning("High memory usage detected")
   ```

## Troubleshooting Plugin Issues

### Common Problems and Solutions

1. **Plugin Not Loading**
   - Check if `main.py` exists
   - Verify plugin class inherits from `Neko.base`
   - Ensure required decorators are present

2. **Command Not Working**
   - Check command registration
   - Verify command permissions
   - Look for syntax errors in command handlers

3. **Performance Issues**
   - Profile plugin execution
   - Check for memory leaks
   - Optimize database queries

### Debug Tools

1. **Plugin Inspector**
   ```python
   # Add debug commands
   @self.command("debug_plugin")
   async def debug_plugin(message: Message):
       debug_info = {
           "name": self.name,
           "version": self.version,
           "commands": len(self.registered_commands),
           "memory_usage": self.get_memory_usage()
       }
       await message.reply(f"Debug Info: {debug_info}")
   ```

2. **Event Logger**
   ```python
   # Log all events
   @self.event("*")
   async def log_all_events(event_type, *args, **kwargs):
       self.logger.debug(f"Event: {event_type}, Args: {args}, Kwargs: {kwargs}")
   ```

## Conclusion

The NekoBot plugin system provides a powerful and flexible way to extend bot functionality. By following the guidelines and best practices outlined in this document, you can create robust, secure, and efficient plugins that enhance the user experience.

For more information and support, please refer to the official documentation or join our community channels.
