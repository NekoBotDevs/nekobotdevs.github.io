# Command System

NekoBot's command system is one of its core features, allowing users to interact with the bot through commands.

## Command Basics

### Command Format

NekoBot supports multiple command formats:

- **Prefix Commands**: `/help`, `!ping`, `@bot weather`
- **Slash Commands**: `/help`, `/weather Beijing`
- **Natural Language**: "Help me check weather", "Send message to John"

### Command Prefix

The default command prefix is `/`, which can be modified in configuration:

```yaml
# config/config.yaml
bot:
  prefix: "/"  # Can be changed to "!", "@", etc.
```

### Command Parameters

Commands can accept parameters:

```bash
/weather Beijing          # Single parameter
/search weather Beijing   # Multiple parameters
/send @user Hello        # Special parameters
```

## Built-in Commands

### System Commands

#### help - Help Command

```bash
/help                 # Show all commands
/help weather         # Show specific command help
/help @plugin_name    # Show plugin commands
```

#### status - Status Command

```bash
/status               # Show bot status
/status plugins       # Show plugin status
/status platforms     # Show platform status
```

#### config - Configuration Command

```bash
/config               # Show current configuration
/config set key value # Set configuration item
/config get key       # Get configuration item
```

### Plugin Commands

#### plugin - Plugin Management

```bash
/plugin list          # List all plugins
/plugin install <url> # Install plugin
/plugin enable <name> # Enable plugin
/plugin disable <name> # Disable plugin
/plugin reload <name> # Reload plugin
/plugin uninstall <name> # Uninstall plugin
```

#### llm - LLM Management

```bash
/llm list             # List LLM providers
/llm test <provider>  # Test LLM provider
/llm switch <provider> # Switch LLM provider
```

## Custom Commands

### Create Commands

```python
@self.command("mycommand")
async def my_command(message: Message):
    """My custom command"""
    await message.reply("Hello from my command!")
```

### Command Parameter Handling

```python
@self.command("greet")
async def greet_command(message: Message):
    """Greeting command"""
    name = message.args[0] if message.args else "World"
    await message.reply(f"Hello, {name}!")
```

### Command Permissions

```python
@self.command("admin", permission="admin")
async def admin_command(message: Message):
    """Admin command"""
    await message.reply("This is an admin command")
```

### Command Aliases

```python
@self.command("help", aliases=["h", "帮助", "helpme"])
async def help_command(message: Message):
    """Help command"""
    await message.reply("This is help information")
```

## Command Permission System

### Permission Levels

NekoBot supports four permission levels:

1. **owner** - Owner permissions (highest)
2. **admin** - Administrator permissions
3. **moderator** - Moderator permissions
4. **user** - Regular user permissions (lowest)

### Permission Checking

```python
# Check user permissions
if await self.check_permission(user_id, "admin"):
    # Admin operations
    pass

# Check group permissions
if await self.check_group_permission(group_id, "manage"):
    # Group management operations
    pass
```

### Permission Setting

```python
# Set user permissions
await self.set_user_permission(user_id, "admin")

# Remove user permissions
await self.remove_user_permission(user_id, "admin")

# Set group permissions
await self.set_group_permission(group_id, "manage")
```

## Command Responses

### Text Responses

```python
# Simple text response
await message.reply("Hello, World!")

# Formatted text response
await message.reply(f"Hello, {user.name}!")

# Multi-line text response
response = """
Line 1
Line 2
Line 3
"""
await message.reply(response)
```

### Rich Media Responses

```python
# Send image
await message.reply_image("path/to/image.jpg")

# Send file
await message.reply_file("path/to/file.txt")

# Send voice
await message.reply_voice("path/to/voice.mp3")

# Send video
await message.reply_video("path/to/video.mp4")
```

### Interactive Responses

```python
# Send buttons
buttons = [
    {"text": "Option1", "callback": "option1"},
    {"text": "Option2", "callback": "option2"}
]
await message.reply_buttons("Please select an option:", buttons)

# Send menu
menu = [
    {"text": "Menu1", "submenu": ["Submenu1", "Submenu2"]},
    {"text": "Menu2", "submenu": ["Submenu3", "Submenu4"]}
]
await message.reply_menu("Please select menu:", menu)
```

## Command Middleware

### Global Middleware

```python
@self.middleware
async def global_middleware(message: Message, next_func):
    """Global middleware"""
    # Pre-processing
    print(f"Processing message: {message.content}")
    
    # Call next middleware or command
    result = await next_func(message)
    
    # Post-processing
    print(f"Command executed: {result}")
    
    return result
```

### Command-specific Middleware

```python
@self.command("sensitive")
@self.middleware
async def sensitive_middleware(message: Message, next_func):
    """Sensitive command middleware"""
    # Check permissions
    if not await self.check_permission(message.user_id, "admin"):
        await message.reply("Insufficient permissions")
        return
    
    # Log action
    self.logger.info(f"Sensitive command executed by {message.user_id}")
    
    # Execute command
    return await next_func(message)
```

## Command Error Handling

### Exception Catching

```python
@self.command("risky")
async def risky_command(message: Message):
    """Risky command"""
    try:
        # Risky operation
        result = await self.risky_operation()
        await message.reply(f"Operation successful: {result}")
    except ValueError as e:
        await message.reply(f"Parameter error: {e}")
    except Exception as e:
        await message.reply(f"Operation failed: {e}")
        self.logger.error(f"Command error: {e}")
```

### Retry Mechanism

```python
@self.command("retry")
@self.retry(max_attempts=3, delay=1)
async def retry_command(message: Message):
    """Command with retry"""
    result = await self.unreliable_operation()
    await message.reply(f"Operation successful: {result}")
```

## Command Configuration

### Command Configuration

```yaml
# config/commands.yaml
commands:
  help:
    enabled: true
    permission: "user"
    cooldown: 1
    description: "Show help information"
  
  admin:
    enabled: true
    permission: "admin"
    cooldown: 5
    description: "Admin command"
  
  weather:
    enabled: true
    permission: "user"
    cooldown: 10
    description: "Query weather"
    aliases: ["天气", "w"]
```

### Command Cooldown

```python
@self.command("spam", cooldown=5)
async def spam_command(message: Message):
    """Command with cooldown"""
    await message.reply("This command has a 5-second cooldown")
```

## Command Debugging

### Debug Mode

```yaml
# config/config.yaml
bot:
  debug: true
  command_debug: true
```

### Command Logging

```python
# Enable command logging
@self.command("logtest")
async def log_test_command(message: Message):
    """Test logging command"""
    self.logger.info(f"Command executed: {message.content}")
    self.logger.debug(f"User: {message.user_id}, Platform: {message.platform}")
    await message.reply("Log recorded")
```

### Command Statistics

```python
# Command usage statistics
@self.command("stats")
async def stats_command(message: Message):
    """Statistics command"""
    stats = await self.get_command_stats()
    await message.reply(f"Command usage statistics:\n{stats}")
```

## Best Practices

### 1. Command Design

- Use clear command names
- Provide detailed help information
- Support command aliases
- Add appropriate permission checks

### 2. Error Handling

- Catch and handle exceptions
- Provide friendly error messages
- Log error information
- Implement retry mechanisms

### 3. Performance Optimization

- Use async processing
- Avoid blocking operations
- Implement command cooldown
- Cache frequently used data

### 4. User Experience

- Provide immediate feedback
- Support command completion
- Show command progress
- Provide help information

## Example Commands

### Weather Query Command

```python
@self.command("weather", aliases=["天气", "w"])
async def weather_command(message: Message):
    """Weather query command"""
    if not message.args:
        await message.reply("Please provide city name, e.g.: /weather Beijing")
        return
    
    city = " ".join(message.args)
    try:
        weather = await self.get_weather(city)
        await message.reply(f"Weather in {city}: {weather}")
    except Exception as e:
        await message.reply(f"Weather query failed: {e}")
```

### File Upload Command

```python
@self.command("upload", permission="admin")
async def upload_command(message: Message):
    """File upload command"""
    if not message.attachments:
        await message.reply("Please provide file to upload")
        return
    
    for attachment in message.attachments:
        try:
            file_path = await self.save_file(attachment)
            await message.reply(f"File saved: {file_path}")
        except Exception as e:
            await message.reply(f"File save failed: {e}")
```

### Scheduled Task Command

```python
@self.command("schedule")
async def schedule_command(message: Message):
    """Scheduled task command"""
    if len(message.args) < 2:
        await message.reply("Usage: /schedule <time> <task>")
        return
    
    time_str = message.args[0]
    task = " ".join(message.args[1:])
    
    try:
        await self.schedule_task(time_str, task)
        await message.reply(f"Scheduled task set: {time_str} - {task}")
    except Exception as e:
        await message.reply(f"Failed to set scheduled task: {e}")
```

With the above configuration, you can fully utilize NekoBot's command system to create powerful bots!

