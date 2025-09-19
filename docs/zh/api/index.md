# API 参考

NekoBot 提供完整的 RESTful API 接口，用于管理机器人、插件和配置。

## 基础信息

- **基础URL**: `http://localhost:8080/api/v1`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

## 认证

所有API请求都需要在请求头中包含JWT令牌：

```http
Authorization: Bearer <your-jwt-token>
```

### 获取令牌

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "nekobot",
  "password": "your-password"
}
```

**响应**:
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

## 插件管理 API

### 获取插件列表

```http
GET /api/v1/plugins
```

**响应**:
```json
{
  "success": true,
  "data": [
    {
      "id": "weather_plugin",
      "name": "天气查询",
      "version": "1.0.0",
      "description": "查询天气信息",
      "author": "NekoBotDevs",
      "enabled": true,
      "installed_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### 安装插件

```http
POST /api/v1/plugins/install
Content-Type: application/json

{
  "source": "github",
  "url": "https://github.com/username/plugin-repo",
  "branch": "main"
}
```

**参数说明**:
- `source`: 插件来源 (`github`, `zip`, `url`)
- `url`: 插件地址
- `branch`: Git分支（可选）

### 启用/禁用插件

```http
POST /api/v1/plugins/{plugin_id}/toggle
Content-Type: application/json

{
  "enabled": true
}
```

### 卸载插件

```http
DELETE /api/v1/plugins/{plugin_id}
```

### 重载插件

```http
POST /api/v1/plugins/{plugin_id}/reload
```

## 配置管理 API

### 获取系统配置

```http
GET /api/v1/config
```

**响应**:
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

### 更新配置

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

## LLM 配置 API

### 获取LLM提供商列表

```http
GET /api/v1/llm/providers
```

### 添加LLM提供商

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

### 测试LLM提供商

```http
POST /api/v1/llm/providers/{provider_id}/test
Content-Type: application/json

{
  "message": "Hello, world!"
}
```

## 平台管理 API

### 获取平台列表

```http
GET /api/v1/platforms
```

### 配置平台

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

### 启动/停止平台

```http
POST /api/v1/platforms/{platform_type}/toggle
Content-Type: application/json

{
  "enabled": true
}
```

## 日志管理 API

### 获取日志列表

```http
GET /api/v1/logs
```

**查询参数**:
- `level`: 日志级别 (`DEBUG`, `INFO`, `WARNING`, `ERROR`)
- `start_time`: 开始时间 (ISO 8601)
- `end_time`: 结束时间 (ISO 8601)
- `limit`: 返回数量限制
- `offset`: 偏移量

### 获取实时日志

```http
GET /api/v1/logs/stream
```

**响应**: Server-Sent Events (SSE)

### 下载日志文件

```http
GET /api/v1/logs/download
```

## 用户管理 API

### 获取用户信息

```http
GET /api/v1/user/profile
```

### 更新用户信息

```http
PUT /api/v1/user/profile
Content-Type: application/json

{
  "username": "new_username",
  "email": "user@example.com"
}
```

### 修改密码

```http
POST /api/v1/user/change-password
Content-Type: application/json

{
  "old_password": "old_password",
  "new_password": "new_password"
}
```

## 系统状态 API

### 获取系统状态

```http
GET /api/v1/status
```

**响应**:
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

### 获取系统信息

```http
GET /api/v1/system/info
```

## 错误处理

所有API都遵循统一的错误响应格式：

```json
{
  "success": false,
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "参数无效",
    "details": "username字段不能为空"
  }
}
```

### 错误代码

| 代码 | HTTP状态 | 描述 |
|------|----------|------|
| `UNAUTHORIZED` | 401 | 未授权访问 |
| `FORBIDDEN` | 403 | 权限不足 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `INVALID_PARAMETER` | 400 | 参数无效 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |
| `PLUGIN_ERROR` | 500 | 插件执行错误 |
| `CONFIG_ERROR` | 400 | 配置错误 |

## 速率限制

API请求有速率限制：

- **认证接口**: 每分钟10次
- **其他接口**: 每分钟100次
- **日志流**: 每分钟1000次

超出限制时返回429状态码。

## SDK 示例

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

# 使用示例
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

// 使用示例
const api = new NekoBotAPI('http://localhost:8080', 'your-token');
const plugins = await api.getPlugins();
```

