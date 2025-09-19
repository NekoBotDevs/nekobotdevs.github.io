# Telegram 平台对接

NekoBot 支持通过 python-telegram-bot 库对接 Telegram 平台，提供完整的 Telegram Bot 功能。

## 对接方式

### python-telegram-bot（推荐）

python-telegram-bot 是官方推荐的 Python Telegram Bot 库，功能完整且稳定。

#### 特点

- 官方支持
- 功能完整
- 异步支持
- 文档完善

#### 安装配置

1. **安装依赖**

```bash
pip install python-telegram-bot
```

2. **配置对接**

在 `config/platforms.yaml` 中配置：

```yaml
telegram:
  enabled: true
  type: "python-telegram-bot"
  config:
    token: "your-bot-token"
    webhook_url: "https://yourdomain.com/webhook/telegram"
    webhook_port: 8443
    cert_path: "/path/to/cert.pem"  # SSL 证书路径
    drop_pending_updates: true      # 丢弃待处理更新
```

3. **启动服务**

```bash
python main.py
```

## 机器人创建

### 1. 创建 Telegram 机器人

1. 在 Telegram 中搜索 [@BotFather](https://t.me/BotFather)
2. 发送 `/newbot` 命令
3. 输入机器人名称
4. 输入机器人用户名（必须以 bot 结尾）
5. 复制 Token（用于配置）

### 2. 设置机器人信息

```bash
# 设置机器人描述
/setdescription
# 输入机器人描述

# 设置机器人简介
/setabouttext
# 输入机器人简介

# 设置机器人命令
/setcommands
# 输入命令列表
```

### 3. 获取机器人信息

```bash
# 获取机器人信息
/getme
```

## 消息处理

### 接收消息

```python
@self.event("message")
async def on_telegram_message(message: Message):
    """处理 Telegram 消息"""
    if message.platform == "telegram":
        # 处理 Telegram 消息
        await message.reply("收到 Telegram 消息")
```

### 发送消息

```python
# 发送文本消息
await message.reply("Hello, Telegram!")

# 发送 Markdown 消息
await message.reply(
    "*粗体* _斜体_ `代码` [链接](https://example.com)",
    parse_mode="Markdown"
)

# 发送 HTML 消息
await message.reply(
    "<b>粗体</b> <i>斜体</i> <code>代码</code> <a href='https://example.com'>链接</a>",
    parse_mode="HTML"
)

# 发送图片
await message.reply_photo(photo="path/to/image.jpg")

# 发送文件
await message.reply_document(document="path/to/file.txt")
```

### 内联键盘

```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup

# 创建内联键盘
keyboard = [
    [InlineKeyboardButton("按钮1", callback_data="button1")],
    [InlineKeyboardButton("按钮2", callback_data="button2")]
]
reply_markup = InlineKeyboardMarkup(keyboard)

await message.reply("请选择一个选项:", reply_markup=reply_markup)
```

### 回复键盘

```python
from telegram import ReplyKeyboardMarkup, KeyboardButton

# 创建回复键盘
keyboard = [
    [KeyboardButton("选项1"), KeyboardButton("选项2")],
    [KeyboardButton("选项3"), KeyboardButton("选项4")]
]
reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

await message.reply("请选择一个选项:", reply_markup=reply_markup)
```

## 群组管理

### 获取群组信息

```python
# 获取群组信息
chat = await self.get_chat(chat_id)
print(f"群组名称: {chat.title}")
print(f"群组类型: {chat.type}")

# 获取群组成员数量
member_count = await chat.get_member_count()
print(f"成员数量: {member_count}")
```

### 成员管理

```python
# 获取群组成员
members = await chat.get_members()
for member in members:
    print(f"成员: {member.user.first_name}")

# 踢出群组成员
await chat.kick_member(user_id)

# 封禁群组成员
await chat.ban_member(user_id)

# 解除封禁
await chat.unban_member(user_id)
```

### 管理员管理

```python
# 获取群组管理员
administrators = await chat.get_administrators()
for admin in administrators:
    print(f"管理员: {admin.user.first_name}")

# 设置管理员
await chat.promote_member(user_id, can_manage_chat=True)

# 撤销管理员
await chat.promote_member(user_id, can_manage_chat=False)
```

## 事件处理

### 群组事件

```python
@self.event("new_chat_members")
async def on_new_chat_members(update, context):
    """新成员加入群组"""
    for member in update.message.new_chat_members:
        await update.message.reply(f"欢迎 {member.first_name} 加入群组！")

@self.event("left_chat_member")
async def on_left_chat_member(update, context):
    """成员离开群组"""
    member = update.message.left_chat_member
    await update.message.reply(f"{member.first_name} 离开了群组")
```

### 消息事件

```python
@self.event("edited_message")
async def on_edited_message(update, context):
    """消息被编辑"""
    message = update.edited_message
    await message.reply("消息被编辑了！")

@self.event("deleted_message")
async def on_deleted_message(update, context):
    """消息被删除"""
    # Telegram 不直接支持删除消息事件
    # 可以通过其他方式实现
    pass
```

### 回调查询

```python
@self.event("callback_query")
async def on_callback_query(update, context):
    """处理内联键盘回调"""
    query = update.callback_query
    await query.answer()
    
    if query.data == "button1":
        await query.edit_message_text("您选择了按钮1")
    elif query.data == "button2":
        await query.edit_message_text("您选择了按钮2")
```

## 权限管理

### 检查权限

```python
# 检查用户权限
if message.from_user.id in self.admin_users:
    # 管理员操作
    pass

# 检查群组权限
if message.chat.type in ["group", "supergroup"]:
    # 群组操作
    pass
```

### 设置权限

```python
# 设置管理员
self.admin_users.add(user_id)

# 移除管理员
self.admin_users.discard(user_id)

# 检查是否为管理员
is_admin = user_id in self.admin_users
```

## 配置示例

### 完整配置

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
    # 高级配置
    timeout: 30
    read_timeout: 30
    write_timeout: 30
    connect_timeout: 30
    # 消息过滤
    message_filters:
      - "spam"
      - "advertisement"
    # 群组管理
    group_management:
      auto_join: true
      welcome_message: "欢迎加入群组！"
      leave_message: "再见！"
      admin_commands: true
```

### 环境变量配置

```bash
# Telegram 配置
export TELEGRAM_TOKEN=your-bot-token
export TELEGRAM_WEBHOOK_URL=https://yourdomain.com/webhook/telegram
export TELEGRAM_WEBHOOK_PORT=8443
```

## 常见问题

### 1. 机器人无响应

**问题**: 机器人不响应消息

**解决方案**:
- 检查机器人是否在线
- 验证 Token 是否正确
- 检查网络连接
- 查看控制台错误

### 2. Webhook 设置失败

**问题**: Webhook 设置失败

**解决方案**:
- 检查 SSL 证书
- 验证域名可访问性
- 检查端口是否开放
- 查看错误日志

### 3. 权限不足

**问题**: 某些操作被拒绝

**解决方案**:
- 检查机器人权限
- 验证群组设置
- 检查用户权限
- 联系群组管理员

### 4. 消息发送失败

**问题**: 无法发送消息

**解决方案**:
- 检查消息内容
- 验证群组状态
- 检查 API 限制
- 查看错误日志

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

### 查看日志

```bash
# 查看实时日志
tail -f logs/nekobot.log | grep telegram

# 查看错误日志
grep "ERROR" logs/nekobot.log | grep telegram
```

### 测试连接

```python
# 测试 Telegram 连接
async def test_telegram_connection():
    try:
        bot_info = await self.bot.get_me()
        print(f"Telegram 连接成功: {bot_info.first_name}")
    except Exception as e:
        print(f"Telegram 连接失败: {e}")
```

## 最佳实践

### 1. 消息处理

- 使用异步处理
- 添加错误处理
- 限制消息频率
- 过滤垃圾消息

### 2. 权限管理

- 最小权限原则
- 定期检查权限
- 记录权限变更
- 及时回收权限

### 3. 性能优化

- 使用连接池
- 缓存常用数据
- 异步处理任务
- 监控资源使用

### 4. 安全考虑

- 验证消息来源
- 过滤敏感内容
- 限制 API 调用
- 定期更新 Token

## 相关资源

- [python-telegram-bot 文档](https://python-telegram-bot.readthedocs.io/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [BotFather](https://t.me/BotFather)
- [Telegram Bot 开发指南](https://core.telegram.org/bots)

通过以上配置，您就可以成功对接 Telegram 平台，让 NekoBot 在 Telegram 上为您服务！

