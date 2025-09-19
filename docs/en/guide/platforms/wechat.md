# WeChat Platform Integration

NekoBot supports WeChat platform integration through the wechatpy library, including WeChat Work, Official Account, Customer Service, and other WeChat services.

## Integration Method

### wechatpy (Recommended)

wechatpy is a comprehensive WeChat development library supporting multiple WeChat services.

#### Features

- Supports multiple WeChat services
- Complete functionality
- Well-documented
- Active community

#### Installation and Configuration

1. **Install Dependencies**

```bash
pip install wechatpy
```

2. **Configure Integration**

Configure in `config/platforms.yaml`:

```yaml
wechat:
  enabled: true
  type: "wechatpy"
  config:
    app_id: "your-app-id"
    app_secret: "your-app-secret"
    token: "your-token"
    encoding_aes_key: "your-encoding-aes-key"
    webhook_url: "https://yourdomain.com/webhook/wechat"
```

3. **Start Service**

```bash
python main.py
```

## WeChat Work Integration

### 1. Create WeChat Work Application

1. Login to [WeChat Work Management Console](https://work.weixin.qq.com/)
2. Go to "Application Management"
3. Click "Create Application"
4. Fill in application information
5. Get AgentId and Secret

### 2. Configure WeChat Work

```yaml
wechat_work:
  enabled: true
  type: "wechatpy"
  config:
    corp_id: "your-corp-id"
    agent_id: "your-agent-id"
    secret: "your-secret"
    webhook_url: "https://yourdomain.com/webhook/wechat-work"
```

### 3. Message Handling

```python
@self.event("message")
async def on_wechat_work_message(message: Message):
    """Handle WeChat Work messages"""
    if message.platform == "wechat_work":
        # Handle WeChat Work messages
        await message.reply("Received WeChat Work message")
```

## WeChat Official Account Integration

### 1. Create WeChat Official Account

1. Visit [WeChat Public Platform](https://mp.weixin.qq.com/)
2. Register and login
3. Select account type
4. Complete verification

### 2. Configure Official Account

```yaml
wechat_mp:
  enabled: true
  type: "wechatpy"
  config:
    app_id: "your-app-id"
    app_secret: "your-app-secret"
    token: "your-token"
    encoding_aes_key: "your-encoding-aes-key"
    webhook_url: "https://yourdomain.com/webhook/wechat-mp"
```

### 3. Message Handling

```python
@self.event("message")
async def on_wechat_mp_message(message: Message):
    """Handle WeChat Official Account messages"""
    if message.platform == "wechat_mp":
        # Handle WeChat Official Account messages
        await message.reply("Received WeChat Official Account message")
```

## WeChat Customer Service Integration

### 1. Enable WeChat Customer Service

1. Enable customer service function in WeChat Public Platform
2. Get customer service account
3. Configure customer service interface

### 2. Configure WeChat Customer Service

```yaml
wechat_customer_service:
  enabled: true
  type: "wechatpy"
  config:
    app_id: "your-app-id"
    app_secret: "your-app-secret"
    kf_account: "your-kf-account"
    webhook_url: "https://yourdomain.com/webhook/wechat-cs"
```

### 3. Message Handling

```python
@self.event("message")
async def on_wechat_cs_message(message: Message):
    """Handle WeChat Customer Service messages"""
    if message.platform == "wechat_cs":
        # Handle WeChat Customer Service messages
        await message.reply("Received WeChat Customer Service message")
```

## Message Handling

### Receive Messages

```python
@self.event("message")
async def on_wechat_message(message: Message):
    """Handle WeChat messages"""
    if message.platform == "wechat":
        # Handle WeChat messages
        await message.reply("Received WeChat message")
```

### Send Messages

```python
# Send text message
await message.reply("Hello, WeChat!")

# Send image message
await message.reply_image("path/to/image.jpg")

# Send voice message
await message.reply_voice("path/to/voice.mp3")

# Send video message
await message.reply_video("path/to/video.mp4")

# Send file message
await message.reply_file("path/to/file.txt")
```

### Send News Message

```python
# Create news message
articles = [
    {
        "title": "Title",
        "description": "Description",
        "url": "https://example.com",
        "picurl": "https://example.com/image.jpg"
    }
]

await message.reply_news(articles)
```

## Event Handling

### Subscribe Events

```python
@self.event("subscribe")
async def on_subscribe(event: SubscribeEvent):
    """User subscribes"""
    await self.send_text_message(
        event.from_user, 
        "Welcome! I'm NekoBot, happy to serve you!"
    )

@self.event("unsubscribe")
async def on_unsubscribe(event: UnsubscribeEvent):
    """User unsubscribes"""
    print(f"User {event.from_user} unsubscribed")
```

### Menu Events

```python
@self.event("click")
async def on_menu_click(event: ClickEvent):
    """Menu click"""
    if event.key == "help":
        await self.send_text_message(event.from_user, "This is help information")
    elif event.key == "about":
        await self.send_text_message(event.from_user, "About us")
```

### Location Events

```python
@self.event("location")
async def on_location(event: LocationEvent):
    """Location information"""
    latitude = event.latitude
    longitude = event.longitude
    await self.send_text_message(
        event.from_user, 
        f"Your location: {latitude}, {longitude}"
    )
```

## Permission Management

### Check Permissions

```python
# Check user permissions
if await self.check_user_permission(user_id, "admin"):
    # Admin operations
    pass

# Check group permissions
if await self.check_group_permission(group_id, "manage"):
    # Group management operations
    pass
```

### Set Permissions

```python
# Set user permissions
await self.set_user_permission(user_id, "admin")

# Remove user permissions
await self.remove_user_permission(user_id, "admin")
```

## Configuration Examples

### Complete Configuration

```yaml
# config/platforms.yaml
wechat:
  enabled: true
  type: "wechatpy"
  config:
    app_id: "your-app-id"
    app_secret: "your-app-secret"
    token: "your-token"
    encoding_aes_key: "your-encoding-aes-key"
    webhook_url: "https://yourdomain.com/webhook/wechat"
    # Advanced configuration
    timeout: 30
    retry_times: 3
    # Message filters
    message_filters:
      - "spam"
      - "advertisement"
    # Group management
    group_management:
      auto_join: true
      welcome_message: "Welcome to the group!"
      leave_message: "Goodbye!"
```

### Environment Variable Configuration

```bash
# WeChat configuration
export WECHAT_APP_ID=your-app-id
export WECHAT_APP_SECRET=your-app-secret
export WECHAT_TOKEN=your-token
export WECHAT_ENCODING_AES_KEY=your-encoding-aes-key
```

## Common Issues

### 1. Signature Verification Failed

**Issue**: WeChat signature verification failed

**Solutions**:
- Check Token configuration
- Verify timestamp
- Check signature algorithm
- View error logs

### 2. Message Send Failed

**Issue**: Cannot send messages

**Solutions**:
- Check Access Token
- Verify message format
- Check API limitations
- View error logs

### 3. Insufficient Permissions

**Issue**: Some operations are denied

**Solutions**:
- Check application permissions
- Verify user permissions
- Check group settings
- Contact administrator

### 4. Network Connection Issues

**Issue**: Cannot connect to WeChat server

**Solutions**:
- Check network connection
- Verify domain configuration
- Check firewall settings
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
tail -f logs/nekobot.log | grep wechat

# View error logs
grep "ERROR" logs/nekobot.log | grep wechat
```

### Test Connection

```python
# Test WeChat connection
async def test_wechat_connection():
    try:
        access_token = await self.wechat_client.get_access_token()
        print(f"WeChat connection successful: {access_token}")
    except Exception as e:
        print(f"WeChat connection failed: {e}")
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

- [wechatpy Documentation](https://wechatpy.readthedocs.io/)
- [WeChat Public Platform](https://mp.weixin.qq.com/)
- [WeChat Work Management Console](https://work.weixin.qq.com/)
- [WeChat Development Documentation](https://developers.weixin.qq.com/)

With the above configuration, you can successfully integrate with the WeChat platform and let NekoBot serve you on WeChat!

