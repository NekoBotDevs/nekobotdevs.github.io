# Guide

Welcome to NekoBot! This is a powerful AI-powered bot framework that supports multiple chat platforms and plugin extensions.

## What is NekoBot?

NekoBot is a modern bot framework with the following features:

- **AI-Powered** - Integrate multiple LLM providers for intelligent conversations
- **Plugin System** - Support local and online plugins for unlimited functionality expansion
- **Multi-Platform Support** - Connect to QQ, Discord, Telegram, WeChat and other platforms
- **Visual Management** - Provide web dashboard for easy configuration and status monitoring
- **Developer Friendly** - Complete API documentation and CLI tools

## Core Features

### Plugin System

The core of NekoBot is a powerful plugin system:

- **Local Plugins** - Users can upload ZIP files or install via GitHub addresses
- **Online Plugins** - Support plugin store, browse and install community plugins
- **Hot Reload** - Plugins support hot reload without service restart
- **Dependency Management** - Automatically install plugin dependencies, support requirements.txt

### Command System

- **Custom Prefix** - Support custom command prefix, default is "/"
- **Permission Management** - Four-level permissions: Owner > Group Owner > Admin > User
- **Cross-Platform Consistency** - Different platform permissions map to unified abstract roles

### LLM Configuration

Support multiple LLM/TTL providers:

| Name | Support | Type | Notes |
|------|---------|------|-------|
| OpenAI | ✅ | Text Generation | Support any OpenAI API compatible service |
| Anthropic | ✅ | Text Generation | Claude series models |
| Google Gemini | ✅ | Text Generation | Gemini Pro etc. |
| Alibaba Cloud Bailian | ✅ | LLMOps | Alibaba Cloud AI services |
| Ollama | ✅ | Model Loader | Local deployment of open source models |
| Whisper | ✅ | Speech-to-Text | Support API and local deployment |
| Edge TTS | ✅ | Text-to-Speech | Free TTS service |

### Logging Management

- **Real-time Logs** - WebSocket push, support auto-scroll
- **Log Levels** - DEBUG, INFO, WARNING, ERROR
- **Search & Filter** - Support keyword search and type filtering
- **Color Classification** - Different log types use different colors

## Getting Started

1. [Quick Start](/en/guide/getting-started) - Get up and running in 5 minutes
2. [Installation Guide](/en/guide/installation) - Detailed installation steps
3. [Configuration](/en/guide/configuration) - System configuration details
4. [Plugin Development](/en/plugins/) - Develop your own plugins

## Platform Support

NekoBot supports the following chat platforms:

- **QQ** - Using aiocqhttp integration
- **Discord** - Official Bot API
- **Telegram** - Bot API
- **WeChat** - Enterprise WeChat, Official Account, Customer Service
- **DingTalk** - Enterprise Application
- **Lark** - Enterprise Application
- **Slack** - Workspace Application
- **Kook** - Voice Social Platform

## Get Help

- 📖 [Complete Documentation](/en/guide/)
- 🐛 [Report Issues](https://github.com/NekoBotDevs/NekoBot/issues)
- 💬 [Community Discussions](https://github.com/NekoBotDevs/NekoBot/discussions)
- 📧 [Contact Us](mailto:support@nekobot.dev)

