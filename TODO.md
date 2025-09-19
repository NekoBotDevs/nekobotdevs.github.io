# TODO列表

## 项目要求(前提条件)

你需要使用当前的项目架构完成一个机器人框架名为：*NekoBot*，且使用当前结构并使用Next.js+Python+SQLite作为数据库来完成一个机器人框架项目 现在你只需要完成后端API部分的代码随后完成前端部分并使用以下库：

```text
aiohttp
pydantic~=2.10.3
psutil>=5.8.0
openai
anthropic
qq-botpy
chardet~=5.1.0
Pillow
beautifulsoup4
googlesearch-python
readability-lxml
quart
lxml_html_clean
colorlog
aiocqhttp
pyjwt
bcrypt
apscheduler
docstring_parser
aiodocker
silk-python
lark-oapi
ormsgpack
cryptography
dashscope
python-telegram-bot
wechatpy
dingtalk-stream
defusedxml
mcp
certifi
pip
telegramify-markdown
google-genai
click
filelock
watchfiles
websockets
faiss-cpu
aiosqlite
py-cord>=2.6.1
slack-sdk
pydub
sqlmodel
deprecated
sqlalchemy[asyncio]
```

---

## 参考项目

[AstrBot](https://github.com/AstrBotDevs/AstrBot)

[Astrbot 文档部分](https://docs.astrbot.app)

## 项目功能

由AI驱动的机器人框架，可以通过插件系统来扩展机器人的功能，且支持多种 LLM/TTL 服务商，可同时对接多种聊天平台并给予不同人设或者提示词，支持日志管理和命令系统。且包含对LLM模型提供更长的上下文记忆能力、网络搜索能力、mcp工具、工具(可由插件拓展)调用能力。

## 功能特点

### 插件系统

* **本地插件**

  * 用户可上传本地插件
  * 插件安装后需重载插件服务才能生效
* **在线插件**

  * 调用远程 API (后续支持)获取插件仓库列表解析后在前端渲染成小卡片或者列表\[里边包含插件仓库"按钮"、插件版本、以及插件名称、插件描述]
  * 支持浏览插件商店并安装插件
  * 支持使用预设 GitHub 代理、自定义代理或直连
  * 支持直接输入仓库地址随后自动拉取至本地安装
* **插件依赖管理**

  * 插件可附带 `requirements.txt`
  * 系统会在插件安装时自动运行(pip install -r requirements.txt)来自动安装依赖 如果需要安装其他依赖可以在插件的requirements.txt中添加,系统会自动安装依赖。
* **插件管理功能**

  * 启用/禁用插件（支持热重载加载插件）
  * 查看插件的行为和功能说明（注册命令）
* **插件安装方式**

  * 上传 `*.zip` 压缩包
  * 输入 GitHub 地址(可使用)
  * 输入插件压缩包直链 URL或者插件的插件仓库的地址

* 插件架构(必须包含)
 data/plugins/nekobot_plugins/
   metadata.yaml（插件元数据 包含名称 版本 描述 作者等信息）
   main.py（插件主程序包含注册插件命令 与版本等）
   requirements.txt(插件需要的依赖)
   README.md（插件自述文件）

#### 插件管理器逻辑

因为我们想更好的管理插件系统，于是我们为开发者提供了装饰器用于管理插件生命周期:

#### 插件注册的前提条件

* 插件主程序必须集成一个基类名为'base'的类，如果没有这个类则无法不识别为插件
* 插件主程序必须包含以下装饰器(函数)用于管理插件生命周期

* @Neko.base.Register(用于在管理器注册命令)(必须，实现插件注册逻辑)
* @Neko.base.Unregister(用于在管理器销毁命令)
* @Neko.base.Reload(用于在管理器重载命令)
* @Neko.base.Enable(用于在管理器启用命令)
* @Neko.base.Disable(用于在管理器禁用命令)
* @Neko.base.export_commands(作为给插件提供命令的API，用于给其他插件提供此插件以外的命令)(可选)
* @Neko.base.Update(用于在管理器更新插件命令)

#### 插件元数据(metadata.yaml)格式

用于在插件管理页面显示信息与插件更新时使用,格式如下：

```yaml
name: 插件名称(NekoBot_Plugins_Example)
version: 1.0.0
description: 插件描述
author: 作者名称
repository: 插件的GitHub仓库地址(更新时需要)
#### 示例: repository: https://github.com/NekoBotDevs/NekoBot_Plugins_Example
```

## 可用的Github代理列表(安装更新插件版本/更新项目时使用)

```link
* https://ghproxy.com
* https://edgeone.gh-proxy.com
* https://hk.gh-proxy.com
* https://gh.llkk.cc
* (直连)
* (自定义)
```

## 可用的pip源列表(安装更新依赖/更新项目时使用)

```link
* https://pypi.tuna.tsinghua.edu.cn/simple
* https://pypi.mirrors.ustc.edu.cn/simple
* https://pypi.mirrors.aliyun.com/simple
* (官方源)
* (自定义)
```

### 插件安装后(前端显示)显示

* 当前插件的自带的Readme文件（Markdown 格式）并在插件安装后解析插件目录下的README.md文件并显示（以小卡片形式显示自述文档，用户可以从卡片的右上角关闭）

#### 命令系统

* 用户可以自定义命令前缀，默认为"/"，可以修改为中英文前缀或者@此机器人
* 支持通过插件系统扩展机器人的功能
* 插件可以注册新的命令、消息处理器和事件监听器
* 权限管理(主人>群主>管理员>用户)跨平台一致性，不同平台的“群主/管理员”需要映射到统一的抽象角色

### 4. LLM/TTL 服务商配置

* 支持在仪表盘中配置多个 LLM/TTL 服务商
* 用户可自定义 API 兼容 OpenAI/Anthropic/Google 风格
* 支持为同一服务商配置多个 APIKey(轮询使用)
* 支持动态增删服务商配置
* 支持对话黑白名单设置
* 支持给予LLM提供网络搜索接口
* 支持给予LLM工具接口(开关)

#### 支持的LLM/TTL服务商

使此项目支持的LLM/TTL服务商如下：

| 名称    | 支持性 | 类型 | 备注 |
| -------- | ------- | ------- | ------- |
| OpenAI | ✔    | 文本生成 | 支持任何兼容 OpenAI API 的服务 |
| Anthropic | ✔    | 文本生成 |  |
| Google Gemini | ✔    | 文本生成 |  |
| Dify | ✔    | LLMOps |  |
| 阿里云百炼应用 | ✔    | LLMOps |  |
| Ollama | ✔    | 模型加载器 | 本地部署 DeepSeek、Llama 等开源语言模型 |
| LM Studio | ✔    | 模型加载器 | 本地部署 DeepSeek、Llama 等开源语言模型 |
| [优云智算](https://www.compshare.cn/?ytag=GPU_YY-gh_astrbot&referral_code=FV7DcGowN4hB5UuXKgpE74) | ✔    | 模型 API 及算力服务平台 |  |
| [302.AI](https://share.302.ai/rr1M3l) | ✔    | 模型 API 服务平台 |  |
| 硅基流动 | ✔    | 模型 API 服务平台 |  |
| PPIO 派欧云 | ✔    | 模型 API 服务平台 |  |
| OneAPI | ✔    | LLM 分发系统 |  |
| Whisper | ✔    | 语音转文本 | 支持 API、本地部署 |
| SenseVoice | ✔    | 语音转文本 | 本地部署 |
| OpenAI TTS API | ✔    | 文本转语音 |  |
| GSVI | ✔    | 文本转语音 | GPT-Sovits-Inference |
| GPT-SoVITs | ✔    | 文本转语音 | GPT-Sovits-Inference |
| FishAudio | ✔    | 文本转语音 | GPT-Sovits 作者参与的项目 |
| Edge TTS | ✔    | 文本转语音 | Edge 浏览器的免费 TTS |
| 阿里云百炼 TTS | ✔    | 文本转语音 |  |
| Azure TTS | ✔    | 文本转语音 | Microsoft Azure TTS |

### 提示词/人设配置

* 支持用户自定义提示词和角色设定
* 支持为不同场景配置不同的提示词和角色
* 支持导入导出(支持上传Markdown文件)提示词和角色配置
* 支持每个用户分为不同对话

### 日志管理

* 支持本地日志文件查看与下载
* 支持日志级别设置（如 DEBUG、INFO、WARNING、ERROR）
* 支持日志搜索与过滤
* 实时日志流[(WebSocket 推送)(支持自动滚动开关)]
* 日志类型颜色(按照类型显示)

### mcp支持

* 支持mcp接口
* 支持mcp工具接口
* 支持mcp网络搜索接口
* 支持mcp工具接口

### 仪表盘(Dashboard)API

* 使用 Quart 框架编写
* 提供 RESTful API 供前端仪表盘调用

#### API基础架构

只给予仪表盘(Dashboard)API接口

* 所有API均在 /api/v1/ 下
* 所有API均需JWT认证
* 所有API均返回JSON格式数据

##### JWT用户认证

* 使用 JWT 进行用户登录认证
* 用户密码加盐哈希存储（bcrypt）
* 初次登录需使用默认账户密码(均为nekobot)，并强制修改密码/[(用户也可一并修改)(用户名非必须)]
* 如没有JWT密钥则随机生成一个JWT密钥并存储在配置文件中
* 如果用户忘记密码可使用cli命令行重置密码

###### CLI命令行

```bash
nekobot-cli reset-passwd
系统回复：请输入新密码:
(用户输入强密码)
系统回复：请再次输入新密码:
(用户输入强密码)
系统回复：密码重置成功！

nekobot-cli help
系统回复：可用命令如下：
nekobot-cli reset-passwd: 重置用户密码
nekobot-cli help/-h: 显示帮助信息
nekobot-cli version/-v: 显示当前版本
nekobot-cli check/-c: 检查是否有新版本
nekobot-cli update/-up: 更新到最新版本

```

###### 版本控制

```bash
nekobot-cli -v
系统回复：当前版本为 1.0.0

nekobot-cli -c
系统回复：当前版本为 1.0.0，最新版本为 1.0.1

nekobot-cli -up
系统回复：正在更新到最新版本...
```

或者使用前端的仪表盘来检查版本/切换分支/更新(前端发送请求到后端API)

## 对接消息平台

需要对接的消息平台如下：

* QQ(使用aiocqhttp对接兼容nonebot2协议的消息平台)
* QQ官方Bot(WebSocket/HTTP API对接)
* Discord
* Telegram
* 钉钉
* 微信(使用wechatpad)
* 飞书
* 企业微信
* 微信公众号
* 微信客服
* Slack
* kook

---

## 项目格式化要求

使用 ruff 进行代码格式化和检查。

```bash
ruff check .
```

## 部署与安全

* 可使用 Docker Compose 一键部署，支持多操作系统
* 初次登录需使用默认账户密码(均为nekobot)，并强制修改密码/[(用户也可一并修改)(用户名非必须)]
* 用户密码加盐哈希存储（bcrypt）
* 使用 JWT 进行用户登录认证
* 可使用配置文件来控制cors跨域 来控制哪些域名可以访问webui(dashboard)接口
* 直接使用*python main.py*启动 不需要任何脚本
