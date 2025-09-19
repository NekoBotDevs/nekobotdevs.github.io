# QQ 平台对接

NekoBot 支持通过多种方式对接 QQ 平台，包括 aiocqhttp 和 QQ 官方 Bot API。

## 对接方式

### 1. aiocqhttp（推荐）

aiocqhttp 是一个兼容 nonebot2 协议的 QQ 机器人框架，支持多种 QQ 客户端。

#### 特点

- 兼容 nonebot2 协议
- 支持多种 QQ 客户端
- 功能丰富，社区活跃
- 文档完善

#### 安装配置

1. **安装依赖**

```bash
pip install aiocqhttp
```

2. **配置对接**

在 `config/platforms.yaml` 中配置：

```yaml
qq:
  enabled: true
  type: "aiocqhttp"
  config:
    app_id: "123456"                # QQ 应用 ID
    token: "your-token"             # 访问令牌
    secret: "your-secret"           # 应用密钥
    sandbox: false                  # 是否使用沙箱环境
    timeout: 30                     # 请求超时
    retry_times: 3                  # 重试次数
    webhook_url: "http://localhost:8080/webhook/qq"  # Webhook 地址
```

3. **启动服务**

```bash
python main.py
```

#### 权限配置

aiocqhttp 需要以下权限：

- 基础权限
- 发送消息权限
- 接收消息权限
- 群管理权限（可选）

### 2. QQ 官方 Bot API

QQ 官方 Bot API 是腾讯官方提供的机器人接口。

#### 特点

- 官方支持，稳定可靠
- 功能完整
- 需要企业认证
- 有使用限制

#### 配置步骤

1. **申请 QQ 开放平台账号**

访问 [QQ 开放平台](https://q.qq.com/qqbot/) 申请开发者账号。

2. **创建机器人应用**

- 登录 QQ 开放平台
- 创建机器人应用
- 获取 App ID 和 App Secret

3. **配置机器人**

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

## 消息处理

### 接收消息

```python
@self.event("message")
async def on_qq_message(message: Message):
    """处理 QQ 消息"""
    if message.platform == "qq":
        # 处理 QQ 消息
        await message.reply("收到 QQ 消息")
```

### 发送消息

```python
# 发送文本消息
await message.reply("Hello, QQ!")

# 发送图片
await message.send_image("path/to/image.jpg")

# 发送文件
await message.send_file("path/to/file.txt")
```

### 群管理

```python
# 获取群信息
group_info = await self.get_group_info(group_id)

# 获取群成员列表
members = await self.get_group_members(group_id)

# 踢出群成员
await self.kick_group_member(group_id, user_id)
```

## 事件处理

### 群事件

```python
@self.event("group_join")
async def on_group_join(event: GroupJoinEvent):
    """用户加入群"""
    await self.send_group_message(
        event.group_id, 
        f"欢迎 {event.user_id} 加入群聊！"
    )

@self.event("group_leave")
async def on_group_leave(event: GroupLeaveEvent):
    """用户离开群"""
    await self.send_group_message(
        event.group_id, 
        f"{event.user_id} 离开了群聊"
    )
```

### 好友事件

```python
@self.event("friend_add")
async def on_friend_add(event: FriendAddEvent):
    """添加好友"""
    await self.send_private_message(
        event.user_id, 
        "你好！我是 NekoBot，很高兴认识你！"
    )
```

## 权限管理

### 用户权限

```python
# 检查用户权限
if await self.check_permission(user_id, "admin"):
    # 管理员操作
    pass

# 设置用户权限
await self.set_user_permission(user_id, "admin")
```

### 群权限

```python
# 检查群权限
if await self.check_group_permission(group_id, "manage"):
    # 群管理操作
    pass
```

## 配置示例

### 完整配置

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
    # 高级配置
    heartbeat_interval: 30
    reconnect_interval: 5
    max_reconnect_times: 10
    # 消息过滤
    message_filters:
      - "spam"
      - "advertisement"
    # 群管理
    group_management:
      auto_approve: false
      welcome_message: "欢迎加入群聊！"
      leave_message: "再见！"
```

### 环境变量配置

```bash
# QQ 配置
export QQ_APP_ID=123456
export QQ_TOKEN=your-token
export QQ_SECRET=your-secret
export QQ_SANDBOX=false
```

## 常见问题

### 1. 连接失败

**问题**: 无法连接到 QQ 服务器

**解决方案**:
- 检查网络连接
- 验证 App ID 和 Token
- 检查防火墙设置
- 查看错误日志

### 2. 消息发送失败

**问题**: 消息无法发送

**解决方案**:
- 检查机器人权限
- 验证群聊状态
- 检查消息内容格式
- 查看 API 限制

### 3. 权限不足

**问题**: 某些操作被拒绝

**解决方案**:
- 申请相应权限
- 检查用户权限设置
- 验证群管理权限
- 联系群主授权

### 4. 频繁掉线

**问题**: 机器人经常掉线

**解决方案**:
- 检查网络稳定性
- 调整心跳间隔
- 增加重连次数
- 使用稳定的服务器

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
tail -f logs/nekobot.log | grep qq

# 查看错误日志
grep "ERROR" logs/nekobot.log | grep qq
```

### 测试连接

```python
# 测试 QQ 连接
async def test_qq_connection():
    try:
        result = await self.qq_client.get_login_info()
        print(f"QQ 连接成功: {result}")
    except Exception as e:
        print(f"QQ 连接失败: {e}")
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
- 定期更新密钥

## 相关资源

- [aiocqhttp 文档](https://aiocqhttp.nonebot.dev/)
- [QQ 开放平台](https://q.qq.com/qqbot/)
- [nonebot2 文档](https://v2.nonebot.dev/)
- [QQ Bot 开发指南](https://bot.q.qq.com/wiki/)

通过以上配置，您就可以成功对接 QQ 平台，让 NekoBot 在 QQ 上为您服务！

