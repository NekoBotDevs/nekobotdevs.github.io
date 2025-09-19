---
layout: home

hero:
  name: "NekoBot"
  text: "AI驱动的机器人框架"
  tagline: "支持多种LLM服务商，可扩展的插件系统，多平台对接"
  image:
    src: /logo.svg
    alt: NekoBot
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/getting-started
    - theme: alt
      text: 查看GitHub
      link: https://github.com/NekoBotDevs/NekoBot

features:
  - icon: 🧩
    title: 插件系统
    details: 支持本地和在线插件，热重载，依赖管理，让机器人功能无限扩展
  - icon: 🤖
    title: 多平台支持
    details: 支持QQ、Discord、Telegram、微信、钉钉等主流聊天平台
  - icon: 🧠
    title: AI驱动
    details: 集成多种LLM服务商，支持长上下文记忆、网络搜索、工具调用
  - icon: ⚙️
    title: 灵活配置
    details: 可视化仪表盘，自定义提示词，权限管理，日志监控
  - icon: 🔧
    title: 开发者友好
    details: 完整的API文档，CLI工具，Docker部署，代码格式化
  - icon: 🛡️
    title: 安全可靠
    details: JWT认证，密码加密，CORS控制，版本管理
---

## 项目特色

NekoBot 是一个现代化的AI机器人框架，专为开发者和用户设计，提供：

- **强大的插件系统** - 支持本地和在线插件，热重载，依赖自动管理
- **多平台对接** - 同时支持QQ、Discord、Telegram、微信等12+平台
- **AI能力** - 集成OpenAI、Anthropic、Google等主流LLM服务商
- **可视化界面** - 现代化的Web仪表盘，轻松管理配置和监控状态
- **开发者工具** - 完整的CLI工具链，支持版本管理和密码重置

## 快速开始

```bash
# 克隆项目
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# 安装依赖
pip install -r requirements.txt

# 启动服务
python main.py
```

访问 `http://localhost:8080` 查看仪表盘，默认用户名和密码均为 `nekobot`。

## 技术栈

- **后端**: Python + Quart + SQLite
- **前端**: Next.js + TypeScript
- **AI**: OpenAI / Anthropic / Google Gemini 等
- **部署**: Docker + Docker Compose
- **文档**: VitePress + 国际化支持

