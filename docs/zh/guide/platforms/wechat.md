# 微信平台对接

NekoBot 支持通过 wechatpy 库对接微信平台，包括企业微信、公众号、客服等多种微信服务。

## 对接方式

### wechatpy（推荐）

wechatpy 是一个功能完整的微信开发库，支持多种微信服务。

#### 特点

- 支持多种微信服务
- 功能完整
- 文档完善
- 社区活跃

#### 安装配置

1. **安装依赖**

```bash
pip install wechatpy
```

2. **配置对接**

在 `config/platforms.yaml` 中配置：

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

3. **启动服务**

```bash
python main.py
```

## 企业微信对接

### 1. 创建企业微信应用

1. 登录 [企业微信管理后台](https://work.weixin.qq.com/)
2. 进入"应用管理"
3. 点击"创建应用"
4. 填写应用信息
5. 获取 AgentId 和 Secret

### 2. 配置企业微信

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

### 3. 消息处理

```python
@self.event("message")
async def on_wechat_work_message(message: Message):
    """处理企业微信消息"""
    if message.platform == "wechat_work":
        # 处理企业微信消息
        await message.reply("收到企业微信消息")
```

## 微信公众号对接

### 1. 创建微信公众号

1. 访问 [微信公众平台](https://mp.weixin.qq.com/)
2. 注册并登录
3. 选择公众号类型
4. 完成认证

### 2. 配置公众号

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

### 3. 消息处理

```python
@self.event("message")
async def on_wechat_mp_message(message: Message):
    """处理微信公众号消息"""
    if message.platform == "wechat_mp":
        # 处理微信公众号消息
        await message.reply("收到微信公众号消息")
```

## 微信客服对接

### 1. 开通微信客服

1. 在微信公众平台开通客服功能
2. 获取客服账号
3. 配置客服接口

### 2. 配置微信客服

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

### 3. 消息处理

```python
@self.event("message")
async def on_wechat_cs_message(message: Message):
    """处理微信客服消息"""
    if message.platform == "wechat_cs":
        # 处理微信客服消息
        await message.reply("收到微信客服消息")
```

## 消息处理

### 接收消息

```python
@self.event("message")
async def on_wechat_message(message: Message):
    """处理微信消息"""
    if message.platform == "wechat":
        # 处理微信消息
        await message.reply("收到微信消息")
```

### 发送消息

```python
# 发送文本消息
await message.reply("Hello, WeChat!")

# 发送图片消息
await message.reply_image("path/to/image.jpg")

# 发送语音消息
await message.reply_voice("path/to/voice.mp3")

# 发送视频消息
await message.reply_video("path/to/video.mp4")

# 发送文件消息
await message.reply_file("path/to/file.txt")
```

### 发送图文消息

```python
# 创建图文消息
articles = [
    {
        "title": "标题",
        "description": "描述",
        "url": "https://example.com",
        "picurl": "https://example.com/image.jpg"
    }
]

await message.reply_news(articles)
```

## 事件处理

### 关注事件

```python
@self.event("subscribe")
async def on_subscribe(event: SubscribeEvent):
    """用户关注"""
    await self.send_text_message(
        event.from_user, 
        "欢迎关注！我是 NekoBot，很高兴为您服务！"
    )

@self.event("unsubscribe")
async def on_unsubscribe(event: UnsubscribeEvent):
    """用户取消关注"""
    print(f"用户 {event.from_user} 取消关注")
```

### 菜单事件

```python
@self.event("click")
async def on_menu_click(event: ClickEvent):
    """菜单点击"""
    if event.key == "help":
        await self.send_text_message(event.from_user, "这是帮助信息")
    elif event.key == "about":
        await self.send_text_message(event.from_user, "关于我们")
```

### 位置事件

```python
@self.event("location")
async def on_location(event: LocationEvent):
    """位置信息"""
    latitude = event.latitude
    longitude = event.longitude
    await self.send_text_message(
        event.from_user, 
        f"您的位置: {latitude}, {longitude}"
    )
```

## 权限管理

### 检查权限

```python
# 检查用户权限
if await self.check_user_permission(user_id, "admin"):
    # 管理员操作
    pass

# 检查群组权限
if await self.check_group_permission(group_id, "manage"):
    # 群组管理操作
    pass
```

### 设置权限

```python
# 设置用户权限
await self.set_user_permission(user_id, "admin")

# 移除用户权限
await self.remove_user_permission(user_id, "admin")
```

## 配置示例

### 完整配置

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
    # 高级配置
    timeout: 30
    retry_times: 3
    # 消息过滤
    message_filters:
      - "spam"
      - "advertisement"
    # 群组管理
    group_management:
      auto_join: true
      welcome_message: "欢迎加入群组！"
      leave_message: "再见！"
```

### 环境变量配置

```bash
# 微信配置
export WECHAT_APP_ID=your-app-id
export WECHAT_APP_SECRET=your-app-secret
export WECHAT_TOKEN=your-token
export WECHAT_ENCODING_AES_KEY=your-encoding-aes-key
```

## 常见问题

### 1. 签名验证失败

**问题**: 微信签名验证失败

**解决方案**:
- 检查 Token 配置
- 验证时间戳
- 检查签名算法
- 查看错误日志

### 2. 消息发送失败

**问题**: 无法发送消息

**解决方案**:
- 检查 Access Token
- 验证消息格式
- 检查 API 限制
- 查看错误日志

### 3. 权限不足

**问题**: 某些操作被拒绝

**解决方案**:
- 检查应用权限
- 验证用户权限
- 检查群组设置
- 联系管理员

### 4. 网络连接问题

**问题**: 无法连接到微信服务器

**解决方案**:
- 检查网络连接
- 验证域名配置
- 检查防火墙设置
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
tail -f logs/nekobot.log | grep wechat

# 查看错误日志
grep "ERROR" logs/nekobot.log | grep wechat
```

### 测试连接

```python
# 测试微信连接
async def test_wechat_connection():
    try:
        access_token = await self.wechat_client.get_access_token()
        print(f"微信连接成功: {access_token}")
    except Exception as e:
        print(f"微信连接失败: {e}")
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

- [wechatpy 文档](https://wechatpy.readthedocs.io/)
- [微信公众平台](https://mp.weixin.qq.com/)
- [企业微信管理后台](https://work.weixin.qq.com/)
- [微信开发文档](https://developers.weixin.qq.com/)

通过以上配置，您就可以成功对接微信平台，让 NekoBot 在微信上为您服务！

