# Discord 平台对接

NekoBot 支持通过 py-cord 库对接 Discord 平台，提供完整的 Discord Bot 功能。

## 对接方式

### py-cord（推荐）

py-cord 是一个现代化的 Discord.py 分支，提供更好的性能和功能。

#### 特点

- 异步支持
- 功能完整
- 性能优秀
- 社区活跃

#### 安装配置

1. **安装依赖**

```bash
pip install py-cord>=2.6.1
```

2. **配置对接**

在 `config/platforms.yaml` 中配置：

```yaml
discord:
  enabled: true
  type: "py-cord"
  config:
    token: "your-bot-token"
    intents:                        # 权限意图
      - "guilds"
      - "guild_messages"
      - "direct_messages"
      - "message_content"
    prefix: "!"                     # 命令前缀
    case_insensitive: true          # 大小写不敏感
    strip_after_prefix: true        # 去除前缀后的空格
```

3. **启动服务**

```bash
python main.py
```

## 机器人创建

### 1. 创建 Discord 应用

1. 访问 [Discord Developer Portal](https://discord.com/developers/applications)
2. 点击 "New Application"
3. 输入应用名称
4. 创建应用

### 2. 创建机器人

1. 在应用设置中，点击 "Bot" 标签
2. 点击 "Add Bot"
3. 设置机器人名称和头像
4. 复制 Token（用于配置）

### 3. 设置权限

1. 在 "OAuth2" > "URL Generator" 中
2. 选择 "bot" 权限
3. 选择需要的权限：
   - Send Messages
   - Read Message History
   - Use Slash Commands
   - Manage Messages（可选）
   - Embed Links（可选）

### 4. 邀请机器人

1. 复制生成的邀请链接
2. 在浏览器中打开
3. 选择服务器并授权

## 消息处理

### 接收消息

```python
@self.event("message")
async def on_discord_message(message: Message):
    """处理 Discord 消息"""
    if message.platform == "discord":
        # 处理 Discord 消息
        await message.reply("收到 Discord 消息")
```

### 发送消息

```python
# 发送文本消息
await message.reply("Hello, Discord!")

# 发送嵌入消息
embed = discord.Embed(
    title="标题",
    description="描述",
    color=0x39C5BB
)
await message.reply(embed=embed)

# 发送文件
await message.reply(file=discord.File("path/to/file.txt"))
```

### 斜杠命令

```python
@self.slash_command(name="ping", description="检查机器人延迟")
async def ping(ctx):
    """Ping 命令"""
    await ctx.respond(f"Pong! 延迟: {round(self.bot.latency * 1000)}ms")
```

## 服务器管理

### 获取服务器信息

```python
# 获取服务器信息
guild = await self.get_guild(guild_id)
print(f"服务器名称: {guild.name}")
print(f"成员数量: {guild.member_count}")

# 获取频道信息
channel = await self.get_channel(channel_id)
print(f"频道名称: {channel.name}")
```

### 成员管理

```python
# 获取成员信息
member = await guild.get_member(user_id)
print(f"成员名称: {member.display_name}")

# 踢出成员
await member.kick(reason="违反规则")

# 封禁成员
await member.ban(reason="严重违规")
```

### 角色管理

```python
# 创建角色
role = await guild.create_role(
    name="管理员",
    color=discord.Color.red(),
    permissions=discord.Permissions(administrator=True)
)

# 给成员分配角色
await member.add_roles(role)

# 移除角色
await member.remove_roles(role)
```

## 事件处理

### 服务器事件

```python
@self.event("guild_join")
async def on_guild_join(guild):
    """机器人加入服务器"""
    channel = guild.system_channel
    if channel:
        await channel.send("谢谢邀请我加入服务器！")

@self.event("guild_remove")
async def on_guild_remove(guild):
    """机器人离开服务器"""
    print(f"离开了服务器: {guild.name}")
```

### 成员事件

```python
@self.event("member_join")
async def on_member_join(member):
    """成员加入"""
    channel = member.guild.system_channel
    if channel:
        await channel.send(f"欢迎 {member.mention} 加入服务器！")

@self.event("member_remove")
async def on_member_remove(member):
    """成员离开"""
    print(f"{member.name} 离开了服务器")
```

### 消息事件

```python
@self.event("message_edit")
async def on_message_edit(before, after):
    """消息编辑"""
    if before.content != after.content:
        print(f"消息被编辑: {before.content} -> {after.content}")

@self.event("message_delete")
async def on_message_delete(message):
    """消息删除"""
    print(f"消息被删除: {message.content}")
```

## 权限管理

### 检查权限

```python
# 检查用户权限
if message.author.guild_permissions.administrator:
    # 管理员操作
    pass

# 检查机器人权限
if message.guild.me.guild_permissions.manage_messages:
    # 可以管理消息
    pass
```

### 设置权限

```python
# 创建带权限的角色
role = await guild.create_role(
    name="机器人助手",
    permissions=discord.Permissions(
        send_messages=True,
        read_message_history=True,
        use_slash_commands=True
    )
)
```

## 配置示例

### 完整配置

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
    # 高级配置
    max_messages: 1000
    heartbeat_timeout: 60
    guild_ready_timeout: 2
    assume_unsync_clock: false
    # 消息过滤
    message_filters:
      - "spam"
      - "advertisement"
    # 服务器管理
    guild_management:
      auto_join: true
      welcome_channel: "general"
      log_channel: "bot-logs"
```

### 环境变量配置

```bash
# Discord 配置
export DISCORD_TOKEN=your-bot-token
export DISCORD_PREFIX=!
export DISCORD_CASE_INSENSITIVE=true
```

## 常见问题

### 1. 机器人无响应

**问题**: 机器人不响应消息

**解决方案**:
- 检查机器人是否在线
- 验证 Token 是否正确
- 检查权限意图设置
- 查看控制台错误

### 2. 权限不足

**问题**: 某些操作被拒绝

**解决方案**:
- 检查机器人权限
- 验证服务器权限设置
- 重新邀请机器人
- 检查角色权限

### 3. 斜杠命令不显示

**问题**: 斜杠命令没有出现在 Discord 中

**解决方案**:
- 等待命令同步（最多1小时）
- 手动同步命令
- 检查命令注册代码
- 验证权限设置

### 4. 消息发送失败

**问题**: 无法发送消息

**解决方案**:
- 检查频道权限
- 验证消息内容
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
tail -f logs/nekobot.log | grep discord

# 查看错误日志
grep "ERROR" logs/nekobot.log | grep discord
```

### 测试连接

```python
# 测试 Discord 连接
async def test_discord_connection():
    try:
        guilds = await self.bot.fetch_guilds().flatten()
        print(f"Discord 连接成功，已加入 {len(guilds)} 个服务器")
    except Exception as e:
        print(f"Discord 连接失败: {e}")
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

- [py-cord 文档](https://docs.pycord.dev/)
- [Discord Developer Portal](https://discord.com/developers/applications)
- [Discord API 文档](https://discord.com/developers/docs)
- [Discord Bot 开发指南](https://discord.com/developers/docs/getting-started)

通过以上配置，您就可以成功对接 Discord 平台，让 NekoBot 在 Discord 上为您服务！

