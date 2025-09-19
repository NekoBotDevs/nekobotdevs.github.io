# 插件系统

NekoBot的插件系统是其核心功能之一，允许用户通过插件来扩展机器人的功能。

## 插件架构

每个插件必须包含以下文件结构：

```
data/plugins/nekobot_plugins/
├── metadata.yaml          # 插件元数据
├── main.py               # 插件主程序
├── requirements.txt      # 插件依赖
└── README.md            # 插件说明文档
```

### metadata.yaml 格式

```yaml
name: 插件名称
version: 1.0.0
description: 插件描述
author: 作者名称
repository: https://github.com/username/plugin-repo
```

### main.py 结构

```python
from nekobot.base import Neko

class Plugin(Neko.base):
    """插件主类"""
    
    def __init__(self):
        super().__init__()
        self.name = "示例插件"
        self.version = "1.0.0"
    
    @Neko.base.Register
    def register_commands(self):
        """注册命令"""
        pass
    
    @Neko.base.Unregister
    def unregister_commands(self):
        """注销命令"""
        pass
    
    @Neko.base.Reload
    def reload_plugin(self):
        """重载插件"""
        pass
    
    @Neko.base.Enable
    def enable_plugin(self):
        """启用插件"""
        pass
    
    @Neko.base.Disable
    def disable_plugin(self):
        """禁用插件"""
        pass
```

## 插件管理

### 安装插件

#### 方式一：上传ZIP文件

1. 进入插件管理页面
2. 点击"上传插件"
3. 选择ZIP文件
4. 等待安装完成

#### 方式二：GitHub地址

1. 进入插件管理页面
2. 点击"从GitHub安装"
3. 输入仓库地址
4. 选择分支或标签
5. 点击安装

#### 方式三：插件商店

1. 浏览插件商店
2. 找到需要的插件
3. 点击"安装"按钮
4. 等待安装完成

### 管理插件

- **启用/禁用** - 可以随时启用或禁用插件
- **重载** - 支持热重载，无需重启服务
- **更新** - 检查并安装插件更新
- **卸载** - 完全移除插件

### 依赖管理

插件可以包含`requirements.txt`文件，系统会自动安装依赖：

```txt
requests>=2.25.0
beautifulsoup4>=4.9.0
```

## 开发插件

### 创建插件项目

```bash
mkdir my-plugin
cd my-plugin

# 创建必要文件
touch metadata.yaml main.py requirements.txt README.md
```

### 编写插件代码

```python
from nekobot.base import Neko
from nekobot.types import Message, Command

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
        
        @self.command("weather")
        async def weather_command(message: Message):
            """天气查询命令"""
            city = message.args[0] if message.args else "北京"
            # 实现天气查询逻辑
            await message.reply(f"{city}的天气是晴天")
    
    @Neko.base.Enable
    def enable_plugin(self):
        """启用插件时的操作"""
        self.logger.info("插件已启用")
    
    @Neko.base.Disable
    def disable_plugin(self):
        """禁用插件时的操作"""
        self.logger.info("插件已禁用")
```

### 插件API

#### 消息处理

```python
# 发送消息
await message.reply("回复内容")

# 发送图片
await message.send_image("path/to/image.jpg")

# 发送文件
await message.send_file("path/to/file.txt")
```

#### 事件监听

```python
@self.event("message")
async def on_message(message: Message):
    """监听所有消息"""
    if message.content.startswith("!"):
        await message.reply("检测到感叹号开头的消息")
```

#### 定时任务

```python
@self.schedule("0 9 * * *")  # 每天9点执行
async def daily_task():
    """每日任务"""
    # 实现定时任务逻辑
    pass
```

#### 数据库操作

```python
# 创建表
await self.db.create_table("users", {
    "id": "INTEGER PRIMARY KEY",
    "name": "TEXT",
    "created_at": "TIMESTAMP"
})

# 插入数据
await self.db.insert("users", {
    "name": "张三",
    "created_at": "2024-01-01 00:00:00"
})

# 查询数据
users = await self.db.select("users", where={"name": "张三"})
```

## 插件发布

### 准备发布

1. 完善插件文档
2. 测试插件功能
3. 更新版本号
4. 创建GitHub仓库

### 发布到插件商店

1. 在GitHub创建Release
2. 上传ZIP文件
3. 填写发布说明
4. 提交到插件商店

## 最佳实践

### 代码规范

- 使用类型注解
- 添加详细的文档字符串
- 遵循PEP 8代码风格
- 使用异步编程

### 错误处理

```python
try:
    # 插件逻辑
    result = await some_operation()
except Exception as e:
    self.logger.error(f"插件执行出错: {e}")
    await message.reply("抱歉，插件执行出错")
```

### 配置管理

```python
# 插件配置
config = {
    "api_key": "your-api-key",
    "timeout": 30,
    "retry_times": 3
}

# 保存配置
await self.save_config(config)

# 读取配置
config = await self.load_config()
```

### 日志记录

```python
# 使用插件日志器
self.logger.info("插件启动")
self.logger.warning("配置缺失")
self.logger.error("执行失败")
```

## 常见问题

### Q: 插件安装失败？

A: 检查以下几点：
- 插件格式是否正确
- 依赖是否满足要求
- 网络连接是否正常
- 查看错误日志

### Q: 插件无法启用？

A: 可能的原因：
- 插件代码有语法错误
- 缺少必要的装饰器
- 依赖未正确安装
- 权限不足

### Q: 如何调试插件？

A: 调试方法：
- 查看插件日志
- 使用断点调试
- 检查配置是否正确
- 测试单个功能

## 示例插件

### 天气查询插件

```python
import requests
from nekobot.base import Neko

class WeatherPlugin(Neko.base):
    def __init__(self):
        super().__init__()
        self.name = "天气查询"
        self.version = "1.0.0"
        self.api_key = "your-weather-api-key"
    
    @Neko.base.Register
    def register_commands(self):
        @self.command("weather")
        async def weather_command(message: Message):
            city = message.args[0] if message.args else "北京"
            weather = await self.get_weather(city)
            await message.reply(weather)
    
    async def get_weather(self, city: str):
        """获取天气信息"""
        url = f"https://api.weather.com/v1/current"
        params = {
            "key": self.api_key,
            "q": city
        }
        response = requests.get(url, params=params)
        data = response.json()
        return f"{city}的天气：{data['current']['condition']['text']}"
```

这个插件展示了如何：
- 注册命令
- 处理用户输入
- 调用外部API
- 返回结果给用户

