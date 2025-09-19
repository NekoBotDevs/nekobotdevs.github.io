# 指南

欢迎使用 NekoBot！这是一个功能强大的AI驱动机器人框架，支持多种聊天平台和插件扩展。

## 什么是 NekoBot？

NekoBot 是一个现代化的机器人框架，具有以下特点：

- **AI驱动** - 集成多种LLM服务商，提供智能对话能力
- **插件系统** - 支持本地和在线插件，功能无限扩展
- **多平台支持** - 同时对接QQ、Discord、Telegram、微信等平台
- **可视化管理** - 提供Web仪表盘，轻松管理配置和监控状态
- **开发者友好** - 完整的API文档和CLI工具

## 核心功能

### 插件系统

NekoBot 的核心是强大的插件系统：

- **本地插件** - 用户可以上传ZIP文件或通过GitHub地址安装
- **在线插件** - 支持插件商店，浏览和安装社区插件
- **热重载** - 插件支持热重载，无需重启服务
- **依赖管理** - 自动安装插件依赖，支持requirements.txt

### 命令系统

- **自定义前缀** - 支持自定义命令前缀，默认为"/"
- **权限管理** - 四级权限：主人 > 群主 > 管理员 > 用户
- **跨平台一致性** - 不同平台的权限映射到统一抽象角色

### LLM配置

支持多种LLM/TTL服务商：

| 名称 | 支持性 | 类型 | 备注 |
|------|--------|------|------|
| OpenAI | ✅ | 文本生成 | 支持任何兼容OpenAI API的服务 |
| Anthropic | ✅ | 文本生成 | Claude系列模型 |
| Google Gemini | ✅ | 文本生成 | Gemini Pro等 |
| 阿里云百炼 | ✅ | LLMOps | 阿里云AI服务 |
| Ollama | ✅ | 模型加载器 | 本地部署开源模型 |
| Whisper | ✅ | 语音转文本 | 支持API和本地部署 |
| Edge TTS | ✅ | 文本转语音 | 免费TTS服务 |

### 日志管理

- **实时日志** - WebSocket推送，支持自动滚动
- **日志级别** - DEBUG、INFO、WARNING、ERROR
- **搜索过滤** - 支持关键词搜索和类型过滤
- **颜色分类** - 不同类型日志使用不同颜色显示

## 开始使用

1. [快速开始](/zh/guide/getting-started) - 5分钟快速上手
2. [安装指南](/zh/guide/installation) - 详细安装步骤
3. [配置说明](/zh/guide/configuration) - 系统配置详解
4. [插件开发](/zh/plugins/) - 开发自己的插件

## 平台支持

NekoBot 支持以下聊天平台：

- **QQ** - 使用aiocqhttp对接
- **Discord** - 官方Bot API
- **Telegram** - Bot API
- **微信** - 企业微信、公众号、客服
- **钉钉** - 企业应用
- **飞书** - 企业应用
- **Slack** - 工作区应用
- **Kook** - 语音社交平台

## 获取帮助

- 📖 [完整文档](/zh/guide/)
- 🐛 [问题反馈](https://github.com/NekoBotDevs/NekoBot/issues)
- 💬 [社区讨论](https://github.com/NekoBotDevs/NekoBot/discussions)
- 📧 [联系我们](mailto:support@nekobot.dev)

