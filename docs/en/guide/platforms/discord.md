# Discord Platform Integration

NekoBot supports Discord platform integration through the py-cord library, providing complete Discord Bot functionality.

## Integration Method

### py-cord (Recommended)

py-cord is a modern fork of Discord.py with better performance and features.

#### Features

- Async support
- Complete functionality
- Excellent performance
- Active community

#### Installation and Configuration

1. **Install Dependencies**

```bash
pip install py-cord>=2.6.1
```

2. **Configure Integration**

Configure in `config/platforms.yaml`:

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

3. **Start Service**

```bash
python main.py
```

## Bot Creation

### 1. Create Discord Application

1. Visit [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Enter application name
4. Create application

### 2. Create Bot

1. In application settings, click "Bot" tab
2. Click "Add Bot"
3. Set bot name and avatar
4. Copy Token (for configuration)

### 3. Set Permissions

1. In "OAuth2" > "URL Generator"
2. Select "bot" permissions
3. Choose required permissions:
   - Send Messages
   - Read Message History
   - Use Slash Commands
   - Manage Messages (optional)
   - Embed Links (optional)

### 4. Invite Bot

1. Copy generated invite link
2. Open in browser
3. Select server and authorize

## Message Handling

### Receive Messages

```python
@self.event("message")
async def on_discord_message(message: Message):
    """Handle Discord messages"""
    if message.platform == "discord":
        # Handle Discord messages
        await message.reply("Received Discord message")
```

### Send Messages

```python
# Send text message
await message.reply("Hello, Discord!")

# Send embed message
embed = discord.Embed(
    title="Title",
    description="Description",
    color=0x39C5BB
)
await message.reply(embed=embed)

# Send file
await message.reply(file=discord.File("path/to/file.txt"))
```

### Slash Commands

```python
@self.slash_command(name="ping", description="Check bot latency")
async def ping(ctx):
    """Ping command"""
    await ctx.respond(f"Pong! Latency: {round(self.bot.latency * 1000)}ms")
```

## Server Management

### Get Server Information

```python
# Get server info
guild = await self.get_guild(guild_id)
print(f"Server name: {guild.name}")
print(f"Member count: {guild.member_count}")

# Get channel info
channel = await self.get_channel(channel_id)
print(f"Channel name: {channel.name}")
```

### Member Management

```python
# Get member info
member = await guild.get_member(user_id)
print(f"Member name: {member.display_name}")

# Kick member
await member.kick(reason="Rule violation")

# Ban member
await member.ban(reason="Serious violation")
```

### Role Management

```python
# Create role
role = await guild.create_role(
    name="Admin",
    color=discord.Color.red(),
    permissions=discord.Permissions(administrator=True)
)

# Assign role to member
await member.add_roles(role)

# Remove role
await member.remove_roles(role)
```

## Event Handling

### Server Events

```python
@self.event("guild_join")
async def on_guild_join(guild):
    """Bot joins server"""
    channel = guild.system_channel
    if channel:
        await channel.send("Thanks for inviting me to the server!")

@self.event("guild_remove")
async def on_guild_remove(guild):
    """Bot leaves server"""
    print(f"Left server: {guild.name}")
```

### Member Events

```python
@self.event("member_join")
async def on_member_join(member):
    """Member joins"""
    channel = member.guild.system_channel
    if channel:
        await channel.send(f"Welcome {member.mention} to the server!")

@self.event("member_remove")
async def on_member_remove(member):
    """Member leaves"""
    print(f"{member.name} left the server")
```

### Message Events

```python
@self.event("message_edit")
async def on_message_edit(before, after):
    """Message edited"""
    if before.content != after.content:
        print(f"Message edited: {before.content} -> {after.content}")

@self.event("message_delete")
async def on_message_delete(message):
    """Message deleted"""
    print(f"Message deleted: {message.content}")
```

## Permission Management

### Check Permissions

```python
# Check user permissions
if message.author.guild_permissions.administrator:
    # Admin operations
    pass

# Check bot permissions
if message.guild.me.guild_permissions.manage_messages:
    # Can manage messages
    pass
```

### Set Permissions

```python
# Create role with permissions
role = await guild.create_role(
    name="Bot Assistant",
    permissions=discord.Permissions(
        send_messages=True,
        read_message_history=True,
        use_slash_commands=True
    )
)
```

## Configuration Examples

### Complete Configuration

```yaml
# config/platforms.yaml
discord:
  enabled: true
  type: "py-cord"
  config:
    token: "your-bot-token"
    intents:
      - "guilds"
      - "guild_messages"
      - "direct_messages"
      - "message_content"
      - "guild_members"
      - "guild_presences"
    prefix: "!"
    case_insensitive: true
    strip_after_prefix: true
    # Advanced configuration
    max_messages: 1000
    heartbeat_timeout: 60
    guild_ready_timeout: 2
    assume_unsync_clock: false
    # Message filters
    message_filters:
      - "spam"
      - "advertisement"
    # Server management
    guild_management:
      auto_join: true
      welcome_channel: "general"
      log_channel: "bot-logs"
```

### Environment Variable Configuration

```bash
# Discord configuration
export DISCORD_TOKEN=your-bot-token
export DISCORD_PREFIX=!
export DISCORD_CASE_INSENSITIVE=true
```

## Common Issues

### 1. Bot Not Responding

**Issue**: Bot doesn't respond to messages

**Solutions**:
- Check if bot is online
- Verify Token is correct
- Check intent settings
- View console errors

### 2. Insufficient Permissions

**Issue**: Some operations are denied

**Solutions**:
- Check bot permissions
- Verify server permission settings
- Re-invite bot
- Check role permissions

### 3. Slash Commands Not Showing

**Issue**: Slash commands don't appear in Discord

**Solutions**:
- Wait for command sync (up to 1 hour)
- Manually sync commands
- Check command registration code
- Verify permission settings

### 4. Message Send Failed

**Issue**: Cannot send messages

**Solutions**:
- Check channel permissions
- Verify message content
- Check API limitations
- View error logs

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

### View Logs

```bash
# View real-time logs
tail -f logs/nekobot.log | grep discord

# View error logs
grep "ERROR" logs/nekobot.log | grep discord
```

### Test Connection

```python
# Test Discord connection
async def test_discord_connection():
    try:
        guilds = await self.bot.fetch_guilds().flatten()
        print(f"Discord connection successful, joined {len(guilds)} servers")
    except Exception as e:
        print(f"Discord connection failed: {e}")
```

## Best Practices

### 1. Message Handling

- Use async processing
- Add error handling
- Limit message frequency
- Filter spam messages

### 2. Permission Management

- Principle of least privilege
- Regularly check permissions
- Record permission changes
- Revoke permissions promptly

### 3. Performance Optimization

- Use connection pooling
- Cache frequently used data
- Process tasks asynchronously
- Monitor resource usage

### 4. Security Considerations

- Verify message sources
- Filter sensitive content
- Limit API calls
- Regularly update Token

## Related Resources

- [py-cord Documentation](https://docs.pycord.dev/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord API Documentation](https://discord.com/developers/docs)
- [Discord Bot Development Guide](https://discord.com/developers/docs/getting-started)

With the above configuration, you can successfully integrate with the Discord platform and let NekoBot serve you on Discord!

