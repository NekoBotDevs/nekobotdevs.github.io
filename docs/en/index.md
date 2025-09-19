---
layout: home

hero:
  name: "NekoBot"
  text: "AI-Powered Bot Framework"
  tagline: "Support multiple LLM providers, extensible plugin system, multi-platform integration"
  image:
    src: /logo.svg
    alt: NekoBot
  actions:
    - theme: brand
      text: Quick Start
      link: /en/guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/NekoBotDevs/NekoBot

features:
  - icon: 🧩
    title: Plugin System
    details: Support local and online plugins, hot reload, dependency management, unlimited bot functionality expansion
  - icon: 🤖
    title: Multi-Platform Support
    details: Support QQ, Discord, Telegram, WeChat, DingTalk and other mainstream chat platforms
  - icon: 🧠
    title: AI-Powered
    details: Integrate multiple LLM providers, support long context memory, web search, tool calling
  - icon: ⚙️
    title: Flexible Configuration
    details: Visual dashboard, custom prompts, permission management, log monitoring
  - icon: 🔧
    title: Developer Friendly
    details: Complete API documentation, CLI tools, Docker deployment, code formatting
  - icon: 🛡️
    title: Secure & Reliable
    details: JWT authentication, password encryption, CORS control, version management
---

## Project Features

NekoBot is a modern AI bot framework designed for developers and users, providing:

- **Powerful Plugin System** - Support local and online plugins, hot reload, automatic dependency management
- **Multi-Platform Integration** - Support QQ, Discord, Telegram, WeChat and 12+ platforms simultaneously
- **AI Capabilities** - Integrate OpenAI, Anthropic, Google and other mainstream LLM providers
- **Visual Interface** - Modern web dashboard for easy configuration and status monitoring
- **Developer Tools** - Complete CLI toolchain, version management and password reset support

## Quick Start

```bash
# Clone the project
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot

# Install dependencies
pip install -r requirements.txt

# Start the service
python main.py
```

Visit `http://localhost:8080` to access the dashboard. Default username and password are both `nekobot`.

## Tech Stack

- **Backend**: Python + Quart + SQLite
- **Frontend**: Next.js + TypeScript
- **AI**: OpenAI / Anthropic / Google Gemini etc.
- **Deployment**: Docker + Docker Compose
- **Documentation**: VitePress + Internationalization

