# LLM 配置

NekoBot 支持多种 LLM（大语言模型）服务商，提供强大的 AI 对话能力。

## 支持的 LLM 服务商

### 文本生成服务

| 服务商 | 支持状态 | 类型 | 备注 |
|--------|----------|------|------|
| OpenAI | ✅ | 文本生成 | 支持 GPT-3.5、GPT-4 等 |
| Anthropic | ✅ | 文本生成 | 支持 Claude 系列 |
| Google Gemini | ✅ | 文本生成 | 支持 Gemini Pro 等 |
| 阿里云百炼 | ✅ | LLMOps | 支持通义千问等 |
| Ollama | ✅ | 模型加载器 | 本地部署开源模型 |
| LM Studio | ✅ | 模型加载器 | 本地部署开源模型 |

### 语音服务

| 服务商 | 支持状态 | 类型 | 备注 |
|--------|----------|------|------|
| Whisper | ✅ | 语音转文本 | 支持 API 和本地部署 |
| SenseVoice | ✅ | 语音转文本 | 本地部署 |
| OpenAI TTS | ✅ | 文本转语音 | 官方 TTS API |
| Edge TTS | ✅ | 文本转语音 | 免费 TTS 服务 |
| 阿里云百炼 TTS | ✅ | 文本转语音 | 阿里云 TTS |

## 配置 LLM 服务商

### OpenAI 配置

```yaml
# config/llm.yaml
openai:
  enabled: true
  type: "text_generation"
  config:
    api_key: "sk-your-api-key"
    base_url: "https://api.openai.com/v1"
    model: "gpt-3.5-turbo"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    frequency_penalty: 0.0
    presence_penalty: 0.0
    timeout: 30
    max_retries: 3
    organization: "org-your-org-id"  # 可选
```

### Anthropic 配置

```yaml
anthropic:
  enabled: true
  type: "text_generation"
  config:
    api_key: "sk-ant-your-api-key"
    model: "claude-3-sonnet-20240229"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    timeout: 30
    max_retries: 3
```

### Google Gemini 配置

```yaml
google:
  enabled: true
  type: "text_generation"
  config:
    api_key: "your-api-key"
    model: "gemini-pro"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    top_k: 40
    timeout: 30
    max_retries: 3
```

### 阿里云百炼配置

```yaml
dashscope:
  enabled: true
  type: "text_generation"
  config:
    api_key: "sk-your-api-key"
    model: "qwen-turbo"
    max_tokens: 2048
    temperature: 0.7
    top_p: 1.0
    timeout: 30
    max_retries: 3
```

### 本地模型配置

#### Ollama 配置

```yaml
ollama:
  enabled: true
  type: "text_generation"
  config:
    base_url: "http://localhost:11434"
    model: "llama2"
    max_tokens: 2048
    temperature: 0.7
    timeout: 60
    max_retries: 3
```

#### LM Studio 配置

```yaml
lm_studio:
  enabled: true
  type: "text_generation"
  config:
    base_url: "http://localhost:1234"
    model: "local-model"
    max_tokens: 2048
    temperature: 0.7
    timeout: 60
    max_retries: 3
```

## 语音服务配置

### Whisper 配置

```yaml
whisper:
  enabled: true
  type: "speech_to_text"
  config:
    api_key: "your-openai-api-key"  # 使用 OpenAI API
    model: "whisper-1"
    language: "zh"  # 可选，自动检测
    response_format: "json"
    temperature: 0.0
```

### Edge TTS 配置

```yaml
edge_tts:
  enabled: true
  type: "text_to_speech"
  config:
    voice: "zh-CN-XiaoxiaoNeural"  # 中文女声
    rate: "+0%"  # 语速
    pitch: "+0Hz"  # 音调
    volume: "+0%"  # 音量
```

## 高级配置

### 多提供商配置

```yaml
# config/llm.yaml
llm:
  default_provider: "openai"
  providers:
    openai:
      enabled: true
      priority: 1
      config:
        api_key: "sk-your-api-key"
        model: "gpt-3.5-turbo"
    
    anthropic:
      enabled: true
      priority: 2
      config:
        api_key: "sk-ant-your-api-key"
        model: "claude-3-sonnet-20240229"
    
    ollama:
      enabled: true
      priority: 3
      config:
        base_url: "http://localhost:11434"
        model: "llama2"
```

### 负载均衡配置

```yaml
llm:
  load_balancing:
    enabled: true
    strategy: "round_robin"  # 轮询
    # strategy: "weighted"   # 加权
    # strategy: "random"     # 随机
    providers:
      openai:
        weight: 3
        max_concurrent: 10
      anthropic:
        weight: 2
        max_concurrent: 5
```

### 缓存配置

```yaml
llm:
  cache:
    enabled: true
    ttl: 3600  # 缓存时间（秒）
    max_size: 1000  # 最大缓存条目
    strategy: "lru"  # 缓存策略
```

## 提示词配置

### 系统提示词

```yaml
# config/prompts.yaml
system_prompts:
  default: |
    你是一个有用的AI助手，请用中文回答用户的问题。
    回答要准确、有用、友好。
  
  weather: |
    你是一个天气助手，专门回答天气相关的问题。
    请提供准确、详细的天气信息。
  
  coding: |
    你是一个编程助手，专门帮助用户解决编程问题。
    请提供清晰、准确的代码示例和解释。
```

### 用户提示词

```yaml
user_prompts:
  greeting: "你好！我是 NekoBot，很高兴为您服务！"
  help: "我可以帮助您查询天气、回答问题、执行任务等。"
  error: "抱歉，我遇到了一些问题，请稍后再试。"
```

### 动态提示词

```python
# 根据上下文动态生成提示词
async def get_dynamic_prompt(context: dict) -> str:
    base_prompt = "你是一个有用的AI助手。"
    
    if context.get("platform") == "qq":
        base_prompt += "请用简洁的语言回答，适合QQ聊天。"
    elif context.get("platform") == "discord":
        base_prompt += "请用英文回答，适合Discord聊天。"
    
    if context.get("user_role") == "admin":
        base_prompt += "用户是管理员，可以提供更多功能。"
    
    return base_prompt
```

## 上下文管理

### 对话历史

```python
# 保存对话历史
async def save_conversation(user_id: str, message: str, response: str):
    await self.db.insert("conversations", {
        "user_id": user_id,
        "message": message,
        "response": response,
        "timestamp": datetime.now()
    })

# 获取对话历史
async def get_conversation_history(user_id: str, limit: int = 10):
    return await self.db.select(
        "conversations", 
        where={"user_id": user_id},
        order_by="timestamp DESC",
        limit=limit
    )
```

### 上下文窗口

```yaml
llm:
  context:
    max_tokens: 4000
    max_messages: 20
    strategy: "sliding_window"  # 滑动窗口
    # strategy: "summarization"  # 摘要压缩
```

## 工具调用

### 网络搜索工具

```yaml
tools:
  web_search:
    enabled: true
    provider: "google"
    config:
      api_key: "your-google-api-key"
      search_engine_id: "your-search-engine-id"
      max_results: 5
```

### 计算工具

```yaml
tools:
  calculator:
    enabled: true
    functions:
      - "add"
      - "subtract"
      - "multiply"
      - "divide"
      - "power"
      - "sqrt"
```

### 文件操作工具

```yaml
tools:
  file_operations:
    enabled: true
    allowed_paths:
      - "/tmp/"
      - "/data/uploads/"
    functions:
      - "read_file"
      - "write_file"
      - "list_directory"
```

## 监控和日志

### 使用统计

```python
# 记录LLM使用统计
async def record_llm_usage(provider: str, tokens: int, cost: float):
    await self.db.insert("llm_usage", {
        "provider": provider,
        "tokens": tokens,
        "cost": cost,
        "timestamp": datetime.now()
    })
```

### 性能监控

```yaml
monitoring:
  enabled: true
  metrics:
    - "response_time"
    - "token_usage"
    - "error_rate"
    - "cost_per_request"
  alerts:
    - condition: "response_time > 10s"
      action: "switch_provider"
    - condition: "error_rate > 0.1"
      action: "disable_provider"
```

## 最佳实践

### 1. 成本优化

- 使用缓存减少重复请求
- 选择合适的模型
- 设置合理的token限制
- 监控使用量

### 2. 性能优化

- 使用异步请求
- 实现连接池
- 设置合理的超时时间
- 使用负载均衡

### 3. 安全考虑

- 保护API密钥
- 验证用户输入
- 限制请求频率
- 记录敏感操作

### 4. 用户体验

- 提供快速响应
- 处理错误 gracefully
- 支持流式输出
- 个性化回复

## 故障排除

### 常见问题

1. **API 密钥无效**
   - 检查密钥格式
   - 验证密钥权限
   - 确认账户状态

2. **请求超时**
   - 增加超时时间
   - 检查网络连接
   - 使用备用提供商

3. **Token 限制**
   - 减少上下文长度
   - 使用更小的模型
   - 实现分块处理

4. **成本过高**
   - 启用缓存
   - 使用本地模型
   - 优化提示词

### 调试技巧

```yaml
# 启用调试模式
llm:
  debug: true
  log_requests: true
  log_responses: true
  log_tokens: true
```

通过以上配置，您就可以充分利用 NekoBot 的 LLM 功能，创建智能的 AI 机器人！

