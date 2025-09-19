# 快速开始

本指南将帮助您在5分钟内启动并运行NekoBot。

## 系统要求

- Python 3.8+
- 4GB+ RAM
- 1GB+ 可用磁盘空间

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot
```

### 2. 安装依赖

使用pip安装依赖：

```bash
pip install -r requirements.txt
```

或使用uv（推荐）：

```bash
# 创建虚拟环境
uv venv

# 激活虚拟环境
# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 3. 启动服务

```bash
python main.py
```

服务启动后，您将看到类似输出：

```
[INFO] NekoBot starting...
[INFO] Database initialized
[INFO] Plugin manager loaded
[INFO] Web server started on http://localhost:8080
[INFO] Ready to receive requests
```

## 首次配置

### 1. 访问仪表盘

打开浏览器访问 `http://localhost:8080`

### 2. 登录系统

使用默认账户登录：
- **用户名**: `nekobot`
- **密码**: `nekobot`

::: warning 安全提醒
首次登录后请立即修改默认密码！
:::

### 3. 修改密码

登录后系统会强制要求修改密码：

1. 点击右上角用户头像
2. 选择"修改密码"
3. 输入新密码（建议使用强密码）
4. 确认修改

## 基础配置

### 1. 配置LLM服务商

在仪表盘中配置AI服务商：

1. 进入"LLM配置"页面
2. 点击"添加服务商"
3. 选择服务商类型（如OpenAI）
4. 输入API Key和配置参数
5. 保存配置

### 2. 配置聊天平台

选择要对接的聊天平台：

1. 进入"平台配置"页面
2. 选择平台类型（如QQ）
3. 填写平台配置信息
4. 启用平台

### 3. 安装插件

安装一些基础插件：

1. 进入"插件管理"页面
2. 浏览可用插件
3. 点击"安装"按钮
4. 等待安装完成

## 测试机器人

### 1. 发送测试消息

在配置的聊天平台中发送消息：

```
/help
```

### 2. 查看响应

机器人应该回复帮助信息，显示可用命令列表。

### 3. 测试AI对话

发送任意消息，机器人会使用配置的LLM服务进行回复。

## 下一步

现在您已经成功启动了NekoBot！接下来可以：

- 📖 阅读[配置指南](/zh/guide/configuration)了解详细配置
- 🧩 查看[插件系统](/zh/guide/plugins)学习插件开发
- 🔧 探索[API文档](/zh/api/)进行高级集成
- 💡 浏览[插件商店](/zh/plugins/)安装更多功能

## 常见问题

### Q: 启动失败怎么办？

A: 检查以下几点：
- Python版本是否为3.8+
- 是否安装了所有依赖
- 端口8080是否被占用
- 查看错误日志获取详细信息

### Q: 无法访问仪表盘？

A: 确认：
- 服务是否正常启动
- 防火墙是否阻止了8080端口
- 浏览器地址是否正确

### Q: 机器人不响应消息？

A: 检查：
- 平台配置是否正确
- 机器人是否已启用
- 网络连接是否正常

## 获取帮助

如果遇到问题，可以通过以下方式获取帮助：

- 📖 查看[完整文档](/zh/guide/)
- 🐛 [提交Issue](https://github.com/NekoBotDevs/NekoBot/issues)
- 💬 [社区讨论](https://github.com/NekoBotDevs/NekoBot/discussions)

