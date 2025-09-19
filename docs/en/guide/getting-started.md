# Quick Start

This guide will help you get NekoBot up and running in 5 minutes.

## System Requirements

- Python 3.8+
- 4GB+ RAM
- 1GB+ available disk space

## Installation Steps

### 1. Clone the Project

```bash
git clone https://github.com/NekoBotDevs/NekoBot.git
cd NekoBot
```

### 2. Install Dependencies

Install dependencies using pip:

```bash
pip install -r requirements.txt
```

Or use uv (recommended):

```bash
# Create virtual environment
uv venv

# Activate virtual environment
# Windows
.\venv\Scripts\activate
# Linux/macOS
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Start the Service

```bash
python main.py
```

After the service starts, you will see output similar to:

```
[INFO] NekoBot starting...
[INFO] Database initialized
[INFO] Plugin manager loaded
[INFO] Web server started on http://localhost:8080
[INFO] Ready to receive requests
```

## Initial Configuration

### 1. Access the Dashboard

Open your browser and visit `http://localhost:8080`

### 2. Login to the System

Use the default account to login:
- **Username**: `nekobot`
- **Password**: `nekobot`

::: warning Security Reminder
Please change the default password immediately after first login!
:::

### 3. Change Password

After login, the system will force you to change the password:

1. Click the user avatar in the top right corner
2. Select "Change Password"
3. Enter new password (recommend using a strong password)
4. Confirm the change

## Basic Configuration

### 1. Configure LLM Providers

Configure AI providers in the dashboard:

1. Go to "LLM Configuration" page
2. Click "Add Provider"
3. Select provider type (e.g., OpenAI)
4. Enter API Key and configuration parameters
5. Save configuration

### 2. Configure Chat Platforms

Select the chat platforms to connect:

1. Go to "Platform Configuration" page
2. Select platform type (e.g., QQ)
3. Fill in platform configuration information
4. Enable the platform

### 3. Install Plugins

Install some basic plugins:

1. Go to "Plugin Management" page
2. Browse available plugins
3. Click "Install" button
4. Wait for installation to complete

## Test the Bot

### 1. Send Test Message

Send a message in the configured chat platform:

```
/help
```

### 2. Check Response

The bot should reply with help information showing available command list.

### 3. Test AI Conversation

Send any message, and the bot will use the configured LLM service to reply.

## Next Steps

Now you have successfully started NekoBot! Next you can:

- 📖 Read [Configuration Guide](/en/guide/configuration) to learn detailed configuration
- 🧩 Check [Plugin System](/en/guide/plugins) to learn plugin development
- 🔧 Explore [API Documentation](/en/api/) for advanced integration
- 💡 Browse [Plugin Store](/en/plugins/) to install more features

## FAQ

### Q: What if startup fails?

A: Check the following:
- Is Python version 3.8+?
- Are all dependencies installed?
- Is port 8080 occupied?
- Check error logs for detailed information

### Q: Cannot access dashboard?

A: Confirm:
- Is the service running normally?
- Is firewall blocking port 8080?
- Is the browser address correct?

### Q: Bot not responding to messages?

A: Check:
- Is platform configuration correct?
- Is the bot enabled?
- Is network connection normal?

## Get Help

If you encounter problems, you can get help through:

- 📖 View [Complete Documentation](/en/guide/)
- 🐛 [Submit Issue](https://github.com/NekoBotDevs/NekoBot/issues)
- 💬 [Community Discussions](https://github.com/NekoBotDevs/NekoBot/discussions)

