# LLM Configuration

NekoBot supports multiple LLM (Large Language Model) providers, providing powerful AI conversation capabilities.

## Supported LLM Providers

### Text Generation Services

| Provider | Support Status | Type | Notes |
|----------|----------------|------|-------|
| OpenAI | ✅ | Text Generation | Supports GPT-3.5, GPT-4, etc. |
| Anthropic | ✅ | Text Generation | Supports Claude series |
| Google Gemini | ✅ | Text Generation | Supports Gemini Pro, etc. |
| Alibaba Cloud Bailian | ✅ | LLMOps | Supports Qwen series |
| Ollama | ✅ | Model Loader | Local deployment of open source models |
| LM Studio | ✅ | Model Loader | Local deployment of open source models |

### Voice Services

| Provider | Support Status | Type | Notes |
|----------|----------------|------|-------|
| Whisper | ✅ | Speech-to-Text | Supports API and local deployment |
| SenseVoice | ✅ | Speech-to-Text | Local deployment |
| OpenAI TTS | ✅ | Text-to-Speech | Official TTS API |
| Edge TTS | ✅ | Text-to-Speech | Free TTS service |
| Alibaba Cloud Bailian TTS | ✅ | Text-to-Speech | Alibaba Cloud TTS |

## Configure LLM Providers

### OpenAI Configuration

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
    organization: "org-your-org-id"  # Optional
```

### Anthropic Configuration

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

### Google Gemini Configuration

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

### Alibaba Cloud Bailian Configuration

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

### Local Model Configuration

#### Ollama Configuration

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

#### LM Studio Configuration

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

## Voice Service Configuration

### Whisper Configuration

```yaml
whisper:
  enabled: true
  type: "speech_to_text"
  config:
    api_key: "your-openai-api-key"  # Use OpenAI API
    model: "whisper-1"
    language: "en"  # Optional, auto-detect
    response_format: "json"
    temperature: 0.0
```

### Edge TTS Configuration

```yaml
edge_tts:
  enabled: true
  type: "text_to_speech"
  config:
    voice: "en-US-AriaNeural"  # English female voice
    rate: "+0%"  # Speech rate
    pitch: "+0Hz"  # Pitch
    volume: "+0%"  # Volume
```

## Advanced Configuration

### Multi-Provider Configuration

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

### Load Balancing Configuration

```yaml
llm:
  load_balancing:
    enabled: true
    strategy: "round_robin"  # Round robin
    # strategy: "weighted"   # Weighted
    # strategy: "random"     # Random
    providers:
      openai:
        weight: 3
        max_concurrent: 10
      anthropic:
        weight: 2
        max_concurrent: 5
```

### Cache Configuration

```yaml
llm:
  cache:
    enabled: true
    ttl: 3600  # Cache time (seconds)
    max_size: 1000  # Maximum cache entries
    strategy: "lru"  # Cache strategy
```

## Prompt Configuration

### System Prompts

```yaml
# config/prompts.yaml
system_prompts:
  default: |
    You are a helpful AI assistant. Please answer user questions in English.
    Be accurate, helpful, and friendly.
  
  weather: |
    You are a weather assistant specialized in answering weather-related questions.
    Please provide accurate and detailed weather information.
  
  coding: |
    You are a programming assistant specialized in helping users solve programming problems.
    Please provide clear and accurate code examples and explanations.
```

### User Prompts

```yaml
user_prompts:
  greeting: "Hello! I'm NekoBot, happy to serve you!"
  help: "I can help you check weather, answer questions, execute tasks, etc."
  error: "Sorry, I encountered some problems, please try again later."
```

### Dynamic Prompts

```python
# Generate prompts dynamically based on context
async def get_dynamic_prompt(context: dict) -> str:
    base_prompt = "You are a helpful AI assistant."
    
    if context.get("platform") == "qq":
        base_prompt += "Please answer concisely, suitable for QQ chat."
    elif context.get("platform") == "discord":
        base_prompt += "Please answer in English, suitable for Discord chat."
    
    if context.get("user_role") == "admin":
        base_prompt += "The user is an admin, you can provide more features."
    
    return base_prompt
```

## Context Management

### Conversation History

```python
# Save conversation history
async def save_conversation(user_id: str, message: str, response: str):
    await self.db.insert("conversations", {
        "user_id": user_id,
        "message": message,
        "response": response,
        "timestamp": datetime.now()
    })

# Get conversation history
async def get_conversation_history(user_id: str, limit: int = 10):
    return await self.db.select(
        "conversations", 
        where={"user_id": user_id},
        order_by="timestamp DESC",
        limit=limit
    )
```

### Context Window

```yaml
llm:
  context:
    max_tokens: 4000
    max_messages: 20
    strategy: "sliding_window"  # Sliding window
    # strategy: "summarization"  # Summary compression
```

## Tool Calling

### Web Search Tool

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

### Calculator Tool

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

### File Operations Tool

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

## Monitoring and Logging

### Usage Statistics

```python
# Record LLM usage statistics
async def record_llm_usage(provider: str, tokens: int, cost: float):
    await self.db.insert("llm_usage", {
        "provider": provider,
        "tokens": tokens,
        "cost": cost,
        "timestamp": datetime.now()
    })
```

### Performance Monitoring

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

## Best Practices

### 1. Cost Optimization

- Use caching to reduce duplicate requests
- Choose appropriate models
- Set reasonable token limits
- Monitor usage

### 2. Performance Optimization

- Use async requests
- Implement connection pooling
- Set reasonable timeout values
- Use load balancing

### 3. Security Considerations

- Protect API keys
- Validate user input
- Limit request frequency
- Log sensitive operations

### 4. User Experience

- Provide fast responses
- Handle errors gracefully
- Support streaming output
- Personalize responses

## Troubleshooting

### Common Issues

1. **Invalid API Key**
   - Check key format
   - Verify key permissions
   - Confirm account status

2. **Request Timeout**
   - Increase timeout time
   - Check network connection
   - Use backup providers

3. **Token Limit**
   - Reduce context length
   - Use smaller models
   - Implement chunking

4. **High Costs**
   - Enable caching
   - Use local models
   - Optimize prompts

### Debugging Tips

```yaml
# Enable debug mode
llm:
  debug: true
  log_requests: true
  log_responses: true
  log_tokens: true
```

With the above configuration, you can fully utilize NekoBot's LLM capabilities to create intelligent AI bots!

