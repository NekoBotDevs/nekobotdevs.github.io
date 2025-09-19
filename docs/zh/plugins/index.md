# 插件开发

欢迎来到NekoBot插件开发指南！本指南将帮助您创建功能强大的插件来扩展机器人功能。

## 插件概述

NekoBot的插件系统基于Python，支持：

- **热重载** - 无需重启服务即可更新插件
- **依赖管理** - 自动安装和管理插件依赖
- **事件系统** - 监听和处理各种事件
- **命令注册** - 轻松注册自定义命令
- **数据库操作** - 内置数据库支持
- **定时任务** - 支持定时执行任务
- **配置管理** - 插件配置的持久化存储

## 快速开始

### 1. 创建插件项目

```bash
mkdir my-awesome-plugin
cd my-awesome-plugin
```

### 2. 创建必要文件

```bash
# 创建插件目录结构
mkdir -p nekobot_plugins
cd nekobot_plugins

# 创建必要文件
touch metadata.yaml main.py requirements.txt README.md
```

### 3. 编写插件代码

```python
# main.py
from nekobot.base import Neko
from nekobot.types import Message

class MyPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        self.name = "我的插件"
        self.version = "1.0.0"
    
    @Neko.base.Register
    def register_commands(self):
        """注册命令"""
        @self.command("hello")
        async def hello_command(message: Message):
            """问候命令"""
            await message.reply("Hello, World!")
```

### 4. 配置插件元数据

```yaml
# metadata.yaml
name: 我的插件
version: 1.0.0
description: 一个简单的示例插件
author: 你的名字
repository: https://github.com/username/my-awesome-plugin
```

### 5. 定义依赖

```txt
# requirements.txt
requests>=2.25.0
beautifulsoup4>=4.9.0
```

## 插件架构

### 目录结构

```
my-awesome-plugin/
├── nekobot_plugins/
│   ├── metadata.yaml      # 插件元数据
│   ├── main.py           # 插件主程序
│   ├── requirements.txt  # 依赖列表
│   └── README.md         # 插件文档
├── tests/                # 测试文件
├── docs/                 # 插件文档
└── .gitignore           # Git忽略文件
```

### 核心类

所有插件都必须继承自`Neko.base`类：

```python
from nekobot.base import Neko

class MyPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        # 插件初始化
```

### 生命周期装饰器

插件必须实现以下装饰器来管理生命周期：

```python
@Neko.base.Register
def register_commands(self):
    """注册命令 - 必须实现"""
    pass

@Neko.base.Unregister
def unregister_commands(self):
    """注销命令 - 必须实现"""
    pass

@Neko.base.Reload
def reload_plugin(self):
    """重载插件 - 必须实现"""
    pass

@Neko.base.Enable
def enable_plugin(self):
    """启用插件 - 必须实现"""
    pass

@Neko.base.Disable
def disable_plugin(self):
    """禁用插件 - 必须实现"""
    pass

@Neko.base.Update
def update_plugin(self):
    """更新插件 - 可选实现"""
    pass

@Neko.base.export_commands
def export_commands(self):
    """导出命令给其他插件 - 可选实现"""
    pass
```

## 命令系统

### 注册命令

```python
@Neko.base.Register
def register_commands(self):
    @self.command("hello")
    async def hello_command(message: Message):
        """问候命令"""
        await message.reply("Hello, World!")
    
    @self.command("weather")
    async def weather_command(message: Message):
        """天气查询命令"""
        city = message.args[0] if message.args else "北京"
        weather = await self.get_weather(city)
        await message.reply(weather)
```

### 命令参数

```python
@self.command("search")
async def search_command(message: Message):
    """搜索命令"""
    if not message.args:
        await message.reply("请提供搜索关键词")
        return
    
    keyword = " ".join(message.args)
    results = await self.search(keyword)
    await message.reply(f"搜索结果：\n{results}")
```

### 命令权限

```python
@self.command("admin", permission="admin")
async def admin_command(message: Message):
    """管理员命令"""
    await message.reply("这是管理员专用命令")
```

### 命令别名

```python
@self.command("help", aliases=["h", "帮助"])
async def help_command(message: Message):
    """帮助命令"""
    await message.reply("这是帮助信息")
```

## 事件系统

### 监听消息

```python
@self.event("message")
async def on_message(message: Message):
    """监听所有消息"""
    if message.content.startswith("!"):
        await message.reply("检测到感叹号开头的消息")
```

### 监听特定事件

```python
@self.event("user_join")
async def on_user_join(user: User):
    """用户加入事件"""
    await self.send_message(f"欢迎 {user.name} 加入！")

@self.event("user_leave")
async def on_user_leave(user: User):
    """用户离开事件"""
    await self.send_message(f"{user.name} 离开了")
```

### 自定义事件

```python
# 触发自定义事件
await self.trigger_event("custom_event", data={"key": "value"})

# 监听自定义事件
@self.event("custom_event")
async def on_custom_event(data: dict):
    """自定义事件处理"""
    print(f"收到自定义事件: {data}")
```

## 数据库操作

### 创建表

```python
async def create_tables(self):
    """创建数据库表"""
    await self.db.create_table("users", {
        "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
        "user_id": "TEXT UNIQUE NOT NULL",
        "username": "TEXT",
        "created_at": "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
    })
```

### 数据操作

```python
# 插入数据
await self.db.insert("users", {
    "user_id": "123456",
    "username": "张三"
})

# 查询数据
users = await self.db.select("users", where={"user_id": "123456"})

# 更新数据
await self.db.update("users", 
    {"username": "李四"}, 
    where={"user_id": "123456"}
)

# 删除数据
await self.db.delete("users", where={"user_id": "123456"})
```

### 复杂查询

```python
# 联表查询
query = """
SELECT u.username, p.points 
FROM users u 
LEFT JOIN points p ON u.id = p.user_id 
WHERE u.created_at > ?
"""
results = await self.db.execute(query, ["2024-01-01"])
```

## 定时任务

### 简单定时任务

```python
@self.schedule("0 9 * * *")  # 每天9点执行
async def daily_task():
    """每日任务"""
    await self.send_message("早安！新的一天开始了！")
```

### 间隔任务

```python
@self.schedule(interval=3600)  # 每小时执行
async def hourly_task():
    """每小时任务"""
    await self.check_system_status()
```

### 一次性任务

```python
# 延迟执行
await self.schedule_once(delay=300, func=self.delayed_task)

async def delayed_task():
    """延迟任务"""
    await self.send_message("5分钟后执行的任务")
```

## 配置管理

### 保存配置

```python
config = {
    "api_key": "your-api-key",
    "timeout": 30,
    "retry_times": 3,
    "enabled_features": ["weather", "news"]
}

await self.save_config(config)
```

### 读取配置

```python
config = await self.load_config()
api_key = config.get("api_key", "default-key")
```

### 配置验证

```python
def validate_config(self, config: dict) -> bool:
    """验证配置"""
    required_fields = ["api_key", "timeout"]
    for field in required_fields:
        if field not in config:
            self.logger.error(f"缺少必需配置: {field}")
            return False
    return True
```

## 日志记录

### 使用日志器

```python
# 不同级别的日志
self.logger.debug("调试信息")
self.logger.info("一般信息")
self.logger.warning("警告信息")
self.logger.error("错误信息")
self.logger.critical("严重错误")
```

### 自定义日志格式

```python
import logging

# 创建自定义日志器
logger = logging.getLogger(f"plugin.{self.name}")
logger.setLevel(logging.INFO)

# 添加处理器
handler = logging.StreamHandler()
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
handler.setFormatter(formatter)
logger.addHandler(handler)
```

## 错误处理

### 异常捕获

```python
try:
    result = await self.risky_operation()
except ValueError as e:
    self.logger.error(f"值错误: {e}")
    await message.reply("参数错误，请检查输入")
except Exception as e:
    self.logger.error(f"未知错误: {e}")
    await message.reply("抱歉，发生了未知错误")
```

### 重试机制

```python
import asyncio
from functools import wraps

def retry(max_attempts=3, delay=1):
    """重试装饰器"""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise e
                    await asyncio.sleep(delay * (2 ** attempt))
            return None
        return wrapper
    return decorator

@retry(max_attempts=3, delay=1)
async def api_call(self):
    """带重试的API调用"""
    response = await self.http_client.get("https://api.example.com")
    return response.json()
```

## 测试插件

### 单元测试

```python
# tests/test_plugin.py
import pytest
from unittest.mock import AsyncMock, MagicMock
from nekobot_plugins.main import MyPlugin

@pytest.fixture
def plugin():
    return MyPlugin()

@pytest.fixture
def mock_message():
    message = MagicMock()
    message.content = "/hello"
    message.args = []
    message.reply = AsyncMock()
    return message

@pytest.mark.asyncio
async def test_hello_command(plugin, mock_message):
    """测试hello命令"""
    await plugin.hello_command(mock_message)
    mock_message.reply.assert_called_once_with("Hello, World!")
```

### 集成测试

```python
@pytest.mark.asyncio
async def test_plugin_lifecycle(plugin):
    """测试插件生命周期"""
    # 测试注册
    await plugin.register_commands()
    assert len(plugin.commands) > 0
    
    # 测试启用
    await plugin.enable_plugin()
    assert plugin.enabled
    
    # 测试禁用
    await plugin.disable_plugin()
    assert not plugin.enabled
```

## 发布插件

### 准备发布

1. **完善文档** - 编写详细的README.md
2. **测试插件** - 确保所有功能正常工作
3. **版本管理** - 更新版本号
4. **代码审查** - 检查代码质量

### 创建GitHub仓库

```bash
# 初始化Git仓库
git init
git add .
git commit -m "Initial commit"

# 创建GitHub仓库并推送
git remote add origin https://github.com/username/my-awesome-plugin.git
git push -u origin main
```

### 创建Release

1. 在GitHub上创建Release
2. 上传ZIP文件
3. 填写发布说明
4. 添加标签

### 提交到插件商店

1. 访问NekoBot插件商店
2. 点击"提交插件"
3. 填写插件信息
4. 等待审核

## 最佳实践

### 代码规范

- 使用类型注解
- 遵循PEP 8代码风格
- 添加详细的文档字符串
- 使用异步编程

### 性能优化

- 避免阻塞操作
- 使用连接池
- 缓存频繁访问的数据
- 合理使用内存

### 安全考虑

- 验证用户输入
- 防止SQL注入
- 限制API调用频率
- 保护敏感信息

### 用户体验

- 提供清晰的错误信息
- 支持命令别名
- 添加帮助信息
- 响应及时

## 示例插件

### 天气查询插件

```python
import aiohttp
from nekobot.base import Neko
from nekobot.types import Message

class WeatherPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        self.name = "天气查询"
        self.version = "1.0.0"
        self.api_key = None
    
    @Neko.base.Register
    def register_commands(self):
        @self.command("weather", aliases=["天气", "w"])
        async def weather_command(message: Message):
            """天气查询命令"""
            if not self.api_key:
                await message.reply("天气服务未配置")
                return
            
            city = message.args[0] if message.args else "北京"
            weather = await self.get_weather(city)
            await message.reply(weather)
    
    async def get_weather(self, city: str) -> str:
        """获取天气信息"""
        url = "https://api.weather.com/v1/current"
        params = {
            "key": self.api_key,
            "q": city,
            "lang": "zh"
        }
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    current = data["current"]
                    return f"{city}天气：{current['condition']['text']}，温度{current['temp_c']}°C"
                else:
                    return f"获取{city}天气信息失败"
    
    @Neko.base.Enable
    async def enable_plugin(self):
        """启用插件"""
        config = await self.load_config()
        self.api_key = config.get("api_key")
        if not self.api_key:
            self.logger.warning("天气API密钥未配置")
```

这个插件展示了：
- 命令注册和别名
- 异步HTTP请求
- 配置管理
- 错误处理
- 日志记录

## 获取帮助

- 📖 [完整文档](/zh/guide/)
- 🐛 [问题反馈](https://github.com/NekoBotDevs/NekoBot/issues)
- 💬 [社区讨论](https://github.com/NekoBotDevs/NekoBot/discussions)
- 📧 [技术支持](mailto:support@nekobot.dev)

