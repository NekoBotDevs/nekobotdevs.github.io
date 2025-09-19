# API Reference

NekoBot provides complete RESTful API interfaces for managing bots, plugins, and configurations.

## Basic Information

- **Base URL**: `http://localhost:8080/api/v1`
- **Authentication**: JWT Bearer Token
- **Data Format**: JSON
- **Character Encoding**: UTF-8

## Authentication

All API requests require JWT token in the request header:

```http
Authorization: Bearer <your-jwt-token>
```

### Get Token

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "nekobot",
  "password": "your-password"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "expires_in": 3600,
    "user": {
      "id": 1,
      "username": "nekobot",
      "role": "admin"
    }
  }
}
```

## Plugin Management API

### Get Plugin List

```http
GET /api/v1/plugins
```

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "weather_plugin",
      "name": "Weather Query",
      "version": "1.0.0",
      "description": "Query weather information",
      "author": "NekoBotDevs",
      "enabled": true,
      "installed_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Install Plugin

```http
POST /api/v1/plugins/install
Content-Type: application/json

{
  "source": "github",
  "url": "https://github.com/username/plugin-repo",
  "branch": "main"
}
```

**Parameters**:
- `source`: Plugin source (`github`, `zip`, `url`)
- `url`: Plugin URL
- `branch`: Git branch (optional)

### Enable/Disable Plugin

```http
POST /api/v1/plugins/{plugin_id}/toggle
Content-Type: application/json

{
  "enabled": true
}
```

### Uninstall Plugin

```http
DELETE /api/v1/plugins/{plugin_id}
```

### Reload Plugin

```http
POST /api/v1/plugins/{plugin_id}/reload
```

## Configuration Management API

### Get System Configuration

```http
GET /api/v1/config
```

**Response**:
```json
{
  "success": true,
  "data": {
    "bot": {
      "name": "NekoBot",
      "prefix": "/",
      "timezone": "Asia/Shanghai"
    },
    "llm": {
      "default_provider": "openai",
      "providers": {
        "openai": {
          "api_key": "sk-...",
          "model": "gpt-3.5-turbo",
          "max_tokens": 2048
        }
      }
    },
    "platforms": {
      "qq": {
        "enabled": true,
        "app_id": "123456",
        "token": "your-token"
      }
    }
  }
}
```

### Update Configuration

```http
PUT /api/v1/config
Content-Type: application/json

{
  "bot": {
    "name": "MyBot",
    "prefix": "!"
  }
}
```

## LLM Configuration API

### Get LLM Provider List

```http
GET /api/v1/llm/providers
```

### Add LLM Provider

```http
POST /api/v1/llm/providers
Content-Type: application/json

{
  "name": "openai",
  "type": "text_generation",
  "config": {
    "api_key": "sk-...",
    "base_url": "https://api.openai.com/v1",
    "model": "gpt-3.5-turbo",
    "max_tokens": 2048,
    "temperature": 0.7
  }
}
```

### Test LLM Provider

```http
POST /api/v1/llm/providers/{provider_id}/test
Content-Type: application/json

{
  "message": "Hello, world!"
}
```

## Platform Management API

### Get Platform List

```http
GET /api/v1/platforms
```

### Configure Platform

```http
POST /api/v1/platforms/{platform_type}/config
Content-Type: application/json

{
  "enabled": true,
  "config": {
    "app_id": "123456",
    "token": "your-token",
    "secret": "your-secret"
  }
}
```

### Start/Stop Platform

```http
POST /api/v1/platforms/{platform_type}/toggle
Content-Type: application/json

{
  "enabled": true
}
```

## Log Management API

### Get Log List

```http
GET /api/v1/logs
```

**Query Parameters**:
- `level`: Log level (`DEBUG`, `INFO`, `WARNING`, `ERROR`)
- `start_time`: Start time (ISO 8601)
- `end_time`: End time (ISO 8601)
- `limit`: Return count limit
- `offset`: Offset

### Get Real-time Logs

```http
GET /api/v1/logs/stream
```

**Response**: Server-Sent Events (SSE)

### Download Log File

```http
GET /api/v1/logs/download
```

## User Management API

### Get User Information

```http
GET /api/v1/user/profile
```

### Update User Information

```http
PUT /api/v1/user/profile
Content-Type: application/json

{
  "username": "new_username",
  "email": "user@example.com"
}
```

### Change Password

```http
POST /api/v1/user/change-password
Content-Type: application/json

{
  "old_password": "old_password",
  "new_password": "new_password"
}
```

## System Status API

### Get System Status

```http
GET /api/v1/status
```

**Response**:
```json
{
  "success": true,
  "data": {
    "version": "1.0.0",
    "uptime": 3600,
    "memory_usage": {
      "used": "512MB",
      "total": "2GB",
      "percentage": 25.6
    },
    "cpu_usage": 15.2,
    "disk_usage": {
      "used": "1.2GB",
      "total": "10GB",
      "percentage": 12.0
    },
    "active_plugins": 5,
    "total_plugins": 10,
    "active_platforms": 2
  }
}
```

### Get System Information

```http
GET /api/v1/system/info
```

## Error Handling

All APIs follow a unified error response format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid parameter",
    "details": "username field cannot be empty"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Unauthorized access |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `INVALID_PARAMETER` | 400 | Invalid parameter |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `PLUGIN_ERROR` | 500 | Plugin execution error |
| `CONFIG_ERROR` | 400 | Configuration error |

## Rate Limiting

API requests have rate limits:

- **Authentication APIs**: 10 requests per minute
- **Other APIs**: 100 requests per minute
- **Log Stream**: 1000 requests per minute

Returns 429 status code when limit is exceeded.

## SDK Examples

### Python SDK

```python
import requests

class NekoBotAPI:
    def __init__(self, base_url, token):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }
    
    def get_plugins(self):
        response = requests.get(
            f'{self.base_url}/api/v1/plugins',
            headers=self.headers
        )
        return response.json()
    
    def install_plugin(self, source, url, branch=None):
        data = {
            'source': source,
            'url': url
        }
        if branch:
            data['branch'] = branch
        
        response = requests.post(
            f'{self.base_url}/api/v1/plugins/install',
            headers=self.headers,
            json=data
        )
        return response.json()

# Usage example
api = NekoBotAPI('http://localhost:8080', 'your-token')
plugins = api.get_plugins()
```

### JavaScript SDK

```javascript
class NekoBotAPI {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    }
    
    async getPlugins() {
        const response = await fetch(`${this.baseUrl}/api/v1/plugins`, {
            headers: this.headers
        });
        return await response.json();
    }
    
    async installPlugin(source, url, branch = null) {
        const data = { source, url };
        if (branch) data.branch = branch;
        
        const response = await fetch(`${this.baseUrl}/api/v1/plugins/install`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        });
        return await response.json();
    }
}

// Usage example
const api = new NekoBotAPI('http://localhost:8080', 'your-token');
const plugins = await api.getPlugins();
```

