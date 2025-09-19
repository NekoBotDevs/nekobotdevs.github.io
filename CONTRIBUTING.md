# 贡献指南

感谢您对 NekoBot 文档项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 1. Fork 项目

点击项目页面右上角的 "Fork" 按钮，将项目 fork 到您的 GitHub 账户。

### 2. 克隆项目

```bash
git clone https://github.com/您的用户名/nekobotdevs.github.io.git
cd nekobotdevs.github.io
```

### 3. 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173` 查看文档。

### 5. 创建分支

```bash
git checkout -b feature/your-feature-name
```

### 6. 进行修改

- 修改文档内容
- 添加新页面
- 修复错误
- 改进样式

### 7. 提交更改

```bash
git add .
git commit -m "feat: 添加新功能描述"
```

### 8. 推送分支

```bash
git push origin feature/your-feature-name
```

### 9. 创建 Pull Request

在 GitHub 上创建 Pull Request，详细描述您的更改。

## 文档编写规范

### Markdown 格式

- 使用标准的 Markdown 语法
- 标题层级要清晰
- 代码块要指定语言
- 链接要使用相对路径

### 中文文档

- 文件放在 `docs/zh/` 目录下
- 使用简体中文
- 术语要统一
- 语言要简洁明了

### 英文文档

- 文件放在 `docs/en/` 目录下
- 使用美式英语
- 语法要正确
- 表达要自然

### 图片资源

- 图片放在 `docs/public/` 目录下
- 使用 SVG 格式（优先）
- 文件名要有意义
- 大小要适中

## 代码规范

### TypeScript

- 使用 TypeScript 严格模式
- 添加类型注解
- 遵循 ESLint 规则
- 使用 Prettier 格式化

### Vue 组件

- 使用 Composition API
- 添加 Props 类型定义
- 使用 `<script setup>` 语法
- 组件名使用 PascalCase

### CSS 样式

- 使用 CSS 变量
- 遵循 BEM 命名规范
- 支持响应式设计
- 避免内联样式

## 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 类型说明

- `feat`: 新功能
- `fix`: 修复错误
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 示例

```
feat: 添加插件开发指南
fix: 修复导航菜单显示问题
docs: 更新API文档
style: 调整首页样式
```

## 问题报告

### 报告 Bug

1. 检查是否已有相关 Issue
2. 使用 Issue 模板
3. 提供详细的复现步骤
4. 包含环境信息

### 功能请求

1. 检查是否已有相关讨论
2. 详细描述功能需求
3. 说明使用场景
4. 提供可能的实现方案

## 开发环境

### 必需工具

- Node.js 16+
- pnpm 8+
- Git
- 代码编辑器（推荐 VS Code）

### 推荐插件

- VitePress
- Vue Language Features
- TypeScript Vue Plugin
- Prettier
- ESLint

## 许可证

本项目采用 MIT 许可证。贡献即表示您同意将您的贡献在 MIT 许可证下发布。

## 联系方式

- **项目地址**: https://github.com/NekoBotDevs/nekobotdevs.github.io
- **问题反馈**: https://github.com/NekoBotDevs/nekobotdevs.github.io/issues
- **讨论区**: https://github.com/NekoBotDevs/nekobotdevs.github.io/discussions

## 感谢

感谢所有为 NekoBot 文档项目做出贡献的开发者！

---

如果您有任何问题，请随时联系我们。我们很乐意为您提供帮助！

