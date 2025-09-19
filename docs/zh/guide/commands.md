# 命令系统

NekoBot 的命令系统是其核心功能之一，允许用户通过命令与机器人交互。

## 命令基础

### 命令格式

NekoBot 支持多种命令格式：

- **前缀命令**: `/help`、`!ping`、`@bot 天气`
- **斜杠命令**: `/help`、`/weather 北京`
- **自然语言**: "帮我查天气"、"发送消息给张三"

### 命令前缀

默认命令前缀为 `/`，可以在配置中修改：

```yaml
# config/config.yaml
bot:
  prefix: "/"  # 可以修改为 "!"、"@" 等
```

### 命令参数

命令可以接受参数：

```bash
/weather 北京          # 单个参数
/search 天气 北京      # 多个参数
/send @user 你好       # 特殊参数
```

## 内置命令

### 系统命令

#### help - 帮助命令

```bash
/help                 # 显示所有命令
/help weather         # 显示特定命令帮助
/help @plugin_name    # 显示插件命令
```

#### status - 状态命令

```bash
/status               # 显示机器人状态
/status plugins       # 显示插件状态
/status platforms     # 显示平台状态
```

#### config - 配置命令

```bash
/config               # 显示当前配置
/config set key value # 设置配置项
/config get key       # 获取配置项
```

### 插件命令

#### plugin - 插件管理

```bash
/plugin list          # 列出所有插件
/plugin install <url> # 安装插件
/plugin enable <name> # 启用插件
/plugin disable <name> # 禁用插件
/plugin reload <name> # 重载插件
/plugin uninstall <name> # 卸载插件
```

#### llm - LLM管理

```bash
/llm list             # 列出LLM提供商
/llm test <provider>  # 测试LLM提供商
/llm switch <provider> # 切换LLM提供商
```

## 自定义命令

### 创建命令

```python
@self.command("mycommand")
async def my_command(message: Message):
    """我的自定义命令"""
    await message.reply("Hello from my command!")
```

### 命令参数处理

```python
@self.command("greet")
async def greet_command(message: Message):
    """问候命令"""
    name = message.args[0] if message.args else "World"
    await message.reply(f"Hello, {name}!")
```

### 命令权限

```python
@self.command("admin", permission="admin")
async def admin_command(message: Message):
    """管理员命令"""
    await message.reply("This is an admin command")
```

### 命令别名

```python
@self.command("help", aliases=["h", "帮助", "helpme"])
async def help_command(message: Message):
    """帮助命令"""
    await message.reply("This is help information")
```

## 命令权限系统

### 权限级别

NekoBot 支持四级权限：

1. **owner** - 主人权限（最高）
2. **admin** - 管理员权限
3. **moderator** - 版主权限
4. **user** - 普通用户权限（最低）

### 权限检查

```python
# 检查用户权限
if await self.check_permission(user_id, "admin"):
    # 管理员操作
    pass

# 检查群组权限
if await self.check_group_permission(group_id, "manage"):
    # 群组管理操作
    pass
```

### 权限设置

```python
# 设置用户权限
await self.set_user_permission(user_id, "admin")

# 移除用户权限
await self.remove_user_permission(user_id, "admin")

# 设置群组权限
await self.set_group_permission(group_id, "manage")
```

## 命令响应

### 文本响应

```python
# 简单文本响应
await message.reply("Hello, World!")

# 格式化文本响应
await message.reply(f"Hello, {user.name}!")

# 多行文本响应
response = """
第一行
第二行
第三行
"""
await message.reply(response)
```

### 富媒体响应

```python
# 发送图片
await message.reply_image("path/to/image.jpg")

# 发送文件
await message.reply_file("path/to/file.txt")

# 发送语音
await message.reply_voice("path/to/voice.mp3")

# 发送视频
await message.reply_video("path/to/video.mp4")
```

### 交互式响应

```python
# 发送按钮
buttons = [
    {"text": "选项1", "callback": "option1"},
    {"text": "选项2", "callback": "option2"}
]
await message.reply_buttons("请选择一个选项:", buttons)

# 发送菜单
menu = [
    {"text": "菜单1", "submenu": ["子菜单1", "子菜单2"]},
    {"text": "菜单2", "submenu": ["子菜单3", "子菜单4"]}
]
await message.reply_menu("请选择菜单:", menu)
```

## 命令中间件

### 全局中间件

```python
@self.middleware
async def global_middleware(message: Message, next_func):
    """全局中间件"""
    # 前置处理
    print(f"Processing message: {message.content}")
    
    # 调用下一个中间件或命令
    result = await next_func(message)
    
    # 后置处理
    print(f"Command executed: {result}")
    
    return result
```

### 命令特定中间件

```python
@self.command("sensitive")
@self.middleware
async def sensitive_middleware(message: Message, next_func):
    """敏感命令中间件"""
    # 检查权限
    if not await self.check_permission(message.user_id, "admin"):
        await message.reply("权限不足")
        return
    
    # 记录日志
    self.logger.info(f"Sensitive command executed by {message.user_id}")
    
    # 执行命令
    return await next_func(message)
```

## 命令错误处理

### 异常捕获

```python
@self.command("risky")
async def risky_command(message: Message):
    """有风险的命令"""
    try:
        # 可能出错的操作
        result = await self.risky_operation()
        await message.reply(f"操作成功: {result}")
    except ValueError as e:
        await message.reply(f"参数错误: {e}")
    except Exception as e:
        await message.reply(f"操作失败: {e}")
        self.logger.error(f"Command error: {e}")
```

### 重试机制

```python
@self.command("retry")
@self.retry(max_attempts=3, delay=1)
async def retry_command(message: Message):
    """带重试的命令"""
    result = await self.unreliable_operation()
    await message.reply(f"操作成功: {result}")
```

## 命令配置

### 命令配置

```yaml
# config/commands.yaml
commands:
  help:
    enabled: true
    permission: "user"
    cooldown: 1
    description: "显示帮助信息"
  
  admin:
    enabled: true
    permission: "admin"
    cooldown: 5
    description: "管理员命令"
  
  weather:
    enabled: true
    permission: "user"
    cooldown: 10
    description: "查询天气"
    aliases: ["天气", "w"]
```

### 命令冷却

```python
@self.command("spam", cooldown=5)
async def spam_command(message: Message):
    """有冷却时间的命令"""
    await message.reply("This command has a 5-second cooldown")
```

## 命令调试

### 调试模式

```yaml
# config/config.yaml
bot:
  debug: true
  command_debug: true
```

### 命令日志

```python
# 启用命令日志
@self.command("logtest")
async def log_test_command(message: Message):
    """测试日志命令"""
    self.logger.info(f"Command executed: {message.content}")
    self.logger.debug(f"User: {message.user_id}, Platform: {message.platform}")
    await message.reply("日志已记录")
```

### 命令统计

```python
# 命令使用统计
@self.command("stats")
async def stats_command(message: Message):
    """统计命令"""
    stats = await self.get_command_stats()
    await message.reply(f"命令使用统计:\n{stats}")
```

## 最佳实践

### 1. 命令设计

- 使用清晰的命令名称
- 提供详细的帮助信息
- 支持命令别名
- 添加适当的权限检查

### 2. 错误处理

- 捕获并处理异常
- 提供友好的错误信息
- 记录错误日志
- 实现重试机制

### 3. 性能优化

- 使用异步处理
- 避免阻塞操作
- 实现命令冷却
- 缓存常用数据

### 4. 用户体验

- 提供即时反馈
- 支持命令补全
- 显示命令进度
- 提供帮助信息

## 示例命令

### 天气查询命令

```python
@self.command("weather", aliases=["天气", "w"])
async def weather_command(message: Message):
    """天气查询命令"""
    if not message.args:
        await message.reply("请提供城市名称，例如: /weather 北京")
        return
    
    city = " ".join(message.args)
    try:
        weather = await self.get_weather(city)
        await message.reply(f"{city}的天气: {weather}")
    except Exception as e:
        await message.reply(f"查询天气失败: {e}")
```

### 文件上传命令

```python
@self.command("upload", permission="admin")
async def upload_command(message: Message):
    """文件上传命令"""
    if not message.attachments:
        await message.reply("请提供要上传的文件")
        return
    
    for attachment in message.attachments:
        try:
            file_path = await self.save_file(attachment)
            await message.reply(f"文件已保存: {file_path}")
        except Exception as e:
            await message.reply(f"文件保存失败: {e}")
```

### 定时任务命令

```python
@self.command("schedule")
async def schedule_command(message: Message):
    """定时任务命令"""
    if len(message.args) < 2:
        await message.reply("用法: /schedule <时间> <任务>")
        return
    
    time_str = message.args[0]
    task = " ".join(message.args[1:])
    
    try:
        await self.schedule_task(time_str, task)
        await message.reply(f"定时任务已设置: {time_str} - {task}")
    except Exception as e:
        await message.reply(f"设置定时任务失败: {e}")
```

通过以上配置，您就可以充分利用 NekoBot 的命令系统，创建功能强大的机器人！

