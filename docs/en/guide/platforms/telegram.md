# Telegram Platform Integration

NekoBot supports Telegram platform integration through the python-telegram-bot library, providing complete Telegram Bot functionality.

## Integration Method

### python-telegram-bot (Recommended)

python-telegram-bot is the officially recommended Python Telegram Bot library with complete functionality and stability.

#### Features

- Official support
- Complete functionality
- Async support
- Well-documented

#### Installation and Configuration

1. **Install Dependencies**

```bash
pip install python-telegram-bot
```

2. **Configure Integration**

Configure in `config/platforms.yaml`:

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

3. **Start Service**

```bash
python main.py
```

## Bot Creation

### 1. Create Telegram Bot

1. Search for [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/newbot` command
3. Enter bot name
4. Enter bot username (must end with bot)
5. Copy Token (for configuration)

### 2. Set Bot Information

```bash
# Set bot description
/setdescription
# Enter bot description

# Set bot about text
/setabouttext
# Enter bot about text

# Set bot commands
/setcommands
# Enter command list
```

### 3. Get Bot Information

```bash
# Get bot info
/getme
```

## Message Handling

### Receive Messages

```python
@self.event("message")
async def on_telegram_message(message: Message):
    """Handle Telegram messages"""
    if message.platform == "telegram":
        # Handle Telegram messages
        await message.reply("Received Telegram message")
```

### Send Messages

```python
# Send text message
await message.reply("Hello, Telegram!")

# Send Markdown message
await message.reply(
    "*Bold* _Italic_ `Code` [Link](https://example.com)",
    parse_mode="Markdown"
)

# Send HTML message
await message.reply(
    "<b>Bold</b> <i>Italic</i> <code>Code</code> <a href='https://example.com'>Link</a>",
    parse_mode="HTML"
)

# Send image
await message.reply_photo(photo="path/to/image.jpg")

# Send file
await message.reply_document(document="path/to/file.txt")
```

### Inline Keyboard

```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

# Create inline keyboard
keyboard = [
    [InlineKeyboardButton("Button1", callback_data="button1")],
    [InlineKeyboardButton("Button2", callback_data="button2")]
]
reply_markup = InlineKeyboardMarkup(keyboard)

await message.reply("Please select an option:", reply_markup=reply_markup)
```

### Reply Keyboard

```python
from telegram import ReplyKeyboardMarkup, KeyboardButton

# Create reply keyboard
keyboard = [
    [KeyboardButton("Option1"), KeyboardButton("Option2")],
    [KeyboardButton("Option3"), KeyboardButton("Option4")]
]
reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

await message.reply("Please select an option:", reply_markup=reply_markup)
```

## Group Management

### Get Group Information

```python
# Get group info
chat = await self.get_chat(chat_id)
print(f"Group name: {chat.title}")
print(f"Group type: {chat.type}")

# Get group member count
member_count = await chat.get_member_count()
print(f"Member count: {member_count}")
```

### Member Management

```python
# Get group members
members = await chat.get_members()
for member in members:
    print(f"Member: {member.user.first_name}")

# Kick group member
await chat.kick_member(user_id)

# Ban group member
await chat.ban_member(user_id)

# Unban member
await chat.unban_member(user_id)
```

### Administrator Management

```python
# Get group administrators
administrators = await chat.get_administrators()
for admin in administrators:
    print(f"Administrator: {admin.user.first_name}")

# Set administrator
await chat.promote_member(user_id, can_manage_chat=True)

# Remove administrator
await chat.promote_member(user_id, can_manage_chat=False)
```

## Event Handling

### Group Events

```python
@self.event("new_chat_members")
async def on_new_chat_members(update, context):
    """New member joins group"""
    for member in update.message.new_chat_members:
        await update.message.reply(f"Welcome {member.first_name} to the group!")

@self.event("left_chat_member")
async def on_left_chat_member(update, context):
    """Member leaves group"""
    member = update.message.left_chat_member
    await update.message.reply(f"{member.first_name} left the group")
```

### Message Events

```python
@self.event("edited_message")
async def on_edited_message(update, context):
    """Message edited"""
    message = update.edited_message
    await message.reply("Message was edited!")

@self.event("deleted_message")
async def on_deleted_message(update, context):
    """Message deleted"""
    # Telegram doesn't directly support deleted message events
    # Can be implemented through other methods
    pass
```

### Callback Queries

```python
@self.event("callback_query")
async def on_callback_query(update, context):
    """Handle inline keyboard callbacks"""
    query = update.callback_query
    await query.answer()
    
    if query.data == "button1":
        await query.edit_message_text("You selected button1")
    elif query.data == "button2":
        await query.edit_message_text("You selected button2")
```

## Permission Management

### Check Permissions

```python
# Check user permissions
if message.from_user.id in self.admin_users:
    # Admin operations
    pass

# Check group permissions
if message.chat.type in ["group", "supergroup"]:
    # Group operations
    pass
```

### Set Permissions

```python
# Set administrator
self.admin_users.add(user_id)

# Remove administrator
self.admin_users.discard(user_id)

# Check if admin
is_admin = user_id in self.admin_users
```

## Configuration Examples

### Complete Configuration

```yaml
# config/platforms.yaml
telegram:
  enabled: true
  type: "python-telegram-bot"
  config:
    token: "your-bot-token"
    webhook_url: "https://yourdomain.com/webhook/telegram"
    webhook_port: 8443
    cert_path: "/path/to/cert.pem"
    drop_pending_updates: true
    # Advanced configuration
    timeout: 30
    read_timeout: 30
    write_timeout: 30
    connect_timeout: 30
    # Message filters
    message_filters:
      - "spam"
      - "advertisement"
    # Group management
    group_management:
      auto_join: true
      welcome_message: "Welcome to the group!"
      leave_message: "Goodbye!"
      admin_commands: true
```

### Environment Variable Configuration

```bash
# Telegram configuration
export TELEGRAM_TOKEN=your-bot-token
export TELEGRAM_WEBHOOK_URL=https://yourdomain.com/webhook/telegram
export TELEGRAM_WEBHOOK_PORT=8443
```

## Common Issues

### 1. Bot Not Responding

**Issue**: Bot doesn't respond to messages

**Solutions**:
- Check if bot is online
- Verify Token is correct
- Check network connection
- View console errors

### 2. Webhook Setup Failed

**Issue**: Webhook setup failed

**Solutions**:
- Check SSL certificate
- Verify domain accessibility
- Check if port is open
- View error logs

### 3. Insufficient Permissions

**Issue**: Some operations are denied

**Solutions**:
- Check bot permissions
- Verify group settings
- Check user permissions
- Contact group administrator

### 4. Message Send Failed

**Issue**: Cannot send messages

**Solutions**:
- Check message content
- Verify group status
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
tail -f logs/nekobot.log | grep telegram

# View error logs
grep "ERROR" logs/nekobot.log | grep telegram
```

### Test Connection

```python
# Test Telegram connection
async def test_telegram_connection():
    try:
        bot_info = await self.bot.get_me()
        print(f"Telegram connection successful: {bot_info.first_name}")
    except Exception as e:
        print(f"Telegram connection failed: {e}")
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

- [python-telegram-bot Documentation](https://python-telegram-bot.readthedocs.io/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/BotFather)
- [Telegram Bot Development Guide](https://core.telegram.org/bots)

With the above configuration, you can successfully integrate with the Telegram platform and let NekoBot serve you on Telegram!

