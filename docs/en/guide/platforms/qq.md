# QQ Platform Integration

NekoBot supports QQ platform integration through multiple methods, including aiocqhttp and QQ Official Bot API.

## Integration Methods

### 1. aiocqhttp (Recommended)

aiocqhttp is a QQ bot framework compatible with nonebot2 protocol, supporting multiple QQ clients.

#### Features

- Compatible with nonebot2 protocol
- Supports multiple QQ clients
- Rich features, active community
- Well-documented

#### Installation and Configuration

1. **Install Dependencies**

```bash
pip install aiocqhttp
```

2. **Configure Integration**

Configure in `config/platforms.yaml`:

```yaml
qq:
  enabled: true
  type: "aiocqhttp"
  config:
    app_id: "123456"                # QQ app ID
    token: "your-token"             # Access token
    secret: "your-secret"           # App secret
    sandbox: false                  # Use sandbox environment
    timeout: 30                     # Request timeout
    retry_times: 3                  # Retry times
    webhook_url: "http://localhost:8080/webhook/qq"  # Webhook URL
```

3. **Start Service**

```bash
python main.py
```

#### Permission Configuration

aiocqhttp requires the following permissions:

- Basic permissions
- Send message permissions
- Receive message permissions
- Group management permissions (optional)

### 2. QQ Official Bot API

QQ Official Bot API is the official bot interface provided by Tencent.

#### Features

- Official support, stable and reliable
- Complete functionality
- Requires enterprise certification
- Has usage limitations

#### Configuration Steps

1. **Apply for QQ Open Platform Account**

Visit [QQ Open Platform](https://q.qq.com/qqbot/) to apply for a developer account.

2. **Create Bot Application**

- Login to QQ Open Platform
- Create bot application
- Get App ID and App Secret

3. **Configure Bot**

```yaml
qq_official:
  enabled: true
  type: "websocket"
  config:
    app_id: "123456"
    token: "your-token"
    secret: "your-secret"
    sandbox: false
    websocket_url: "wss://api.qq.com/ws"
```

## Message Handling

### Receive Messages

```python
@self.event("message")
async def on_qq_message(message: Message):
    """Handle QQ messages"""
    if message.platform == "qq":
        # Handle QQ messages
        await message.reply("Received QQ message")
```

### Send Messages

```python
# Send text message
await message.reply("Hello, QQ!")

# Send image
await message.send_image("path/to/image.jpg")

# Send file
await message.send_file("path/to/file.txt")
```

### Group Management

```python
# Get group info
group_info = await self.get_group_info(group_id)

# Get group members
members = await self.get_group_members(group_id)

# Kick group member
await self.kick_group_member(group_id, user_id)
```

## Event Handling

### Group Events

```python
@self.event("group_join")
async def on_group_join(event: GroupJoinEvent):
    """User joins group"""
    await self.send_group_message(
        event.group_id, 
        f"Welcome {event.user_id} to the group!"
    )

@self.event("group_leave")
async def on_group_leave(event: GroupLeaveEvent):
    """User leaves group"""
    await self.send_group_message(
        event.group_id, 
        f"{event.user_id} left the group"
    )
```

### Friend Events

```python
@self.event("friend_add")
async def on_friend_add(event: FriendAddEvent):
    """Add friend"""
    await self.send_private_message(
        event.user_id, 
        "Hello! I'm NekoBot, nice to meet you!"
    )
```

## Permission Management

### User Permissions

```python
# Check user permissions
if await self.check_permission(user_id, "admin"):
    # Admin operations
    pass

# Set user permissions
await self.set_user_permission(user_id, "admin")
```

### Group Permissions

```python
# Check group permissions
if await self.check_group_permission(group_id, "manage"):
    # Group management operations
    pass
```

## Configuration Examples

### Complete Configuration

```yaml
# config/platforms.yaml
qq:
  enabled: true
  type: "aiocqhttp"
  config:
    app_id: "123456"
    token: "your-token"
    secret: "your-secret"
    sandbox: false
    timeout: 30
    retry_times: 3
    webhook_url: "http://localhost:8080/webhook/qq"
    # Advanced configuration
    heartbeat_interval: 30
    reconnect_interval: 5
    max_reconnect_times: 10
    # Message filters
    message_filters:
      - "spam"
      - "advertisement"
    # Group management
    group_management:
      auto_approve: false
      welcome_message: "Welcome to the group!"
      leave_message: "Goodbye!"
```

### Environment Variable Configuration

```bash
# QQ configuration
export QQ_APP_ID=123456
export QQ_TOKEN=your-token
export QQ_SECRET=your-secret
export QQ_SANDBOX=false
```

## Common Issues

### 1. Connection Failed

**Issue**: Cannot connect to QQ server

**Solutions**:
- Check network connection
- Verify App ID and Token
- Check firewall settings
- View error logs

### 2. Message Send Failed

**Issue**: Cannot send messages

**Solutions**:
- Check bot permissions
- Verify group status
- Check message content format
- View API limitations

### 3. Insufficient Permissions

**Issue**: Some operations are denied

**Solutions**:
- Apply for appropriate permissions
- Check user permission settings
- Verify group management permissions
- Contact group owner for authorization

### 4. Frequent Disconnections

**Issue**: Bot frequently disconnects

**Solutions**:
- Check network stability
- Adjust heartbeat interval
- Increase reconnection attempts
- Use stable server

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
tail -f logs/nekobot.log | grep qq

# View error logs
grep "ERROR" logs/nekobot.log | grep qq
```

### Test Connection

```python
# Test QQ connection
async def test_qq_connection():
    try:
        result = await self.qq_client.get_login_info()
        print(f"QQ connection successful: {result}")
    except Exception as e:
        print(f"QQ connection failed: {e}")
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
- Regularly update keys

## Related Resources

- [aiocqhttp Documentation](https://aiocqhttp.nonebot.dev/)
- [QQ Open Platform](https://q.qq.com/qqbot/)
- [nonebot2 Documentation](https://v2.nonebot.dev/)
- [QQ Bot Development Guide](https://bot.q.qq.com/wiki/)

With the above configuration, you can successfully integrate with the QQ platform and let NekoBot serve you on QQ!

