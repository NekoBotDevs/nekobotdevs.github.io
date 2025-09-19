# 开发说明

本文档说明如何开发和维护 NekoBot 文档项目。

## 项目结构

```
nekobotdevs.github.io/
├── docs/                          # 文档源码
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.ts            # 主配置文件
│   │   └── theme/               # 自定义主题
│   │       ├── index.ts         # 主题入口
│   │       ├── custom.css       # 自定义样式
│   │       ├── Layout.vue       # 布局组件
│   │       ├── NotFound.vue     # 404页面
│   │       └── components/      # 自定义组件
│   ├── public/                  # 静态资源
│   │   └── logo.svg            # 项目Logo
│   ├── zh/                     # 中文文档
│   │   ├── guide/              # 指南
│   │   ├── api/                # API文档
│   │   └── plugins/            # 插件文档
│   ├── en/                     # 英文文档
│   │   ├── guide/              # Guide
│   │   ├── api/                # API Reference
│   │   └── plugins/            # Plugin Documentation
│   └── index.md                # 首页
├── scripts/                     # 脚本文件
│   ├── setup.sh               # 设置脚本（Linux/macOS）
│   ├── setup.bat              # 设置脚本（Windows）
│   └── deploy.sh              # 部署脚本
├── .github/                     # GitHub配置
│   └── workflows/              # GitHub Actions
│       └── docs.yml           # 文档部署工作流
├── package.json                # 项目配置
├── README.md                   # 项目说明
├── CONTRIBUTING.md             # 贡献指南
├── DEVELOPMENT.md              # 开发说明
└── LICENSE                     # 许可证
```

## 技术栈

- **文档框架**: VitePress 1.0+
- **构建工具**: Vite
- **包管理器**: pnpm 8+
- **Node.js**: 16+
- **主题**: 自定义主题
- **样式**: CSS3 + CSS变量
- **国际化**: VitePress i18n

## 开发环境设置

### 1. 克隆项目

```bash
git clone https://github.com/NekoBotDevs/nekobotdevs.github.io.git
cd nekobotdevs.github.io
```

### 2. 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

访问 `http://localhost:5173` 查看文档。

## 开发工作流

### 1. 创建新页面

1. 在对应语言目录下创建 Markdown 文件
2. 在 `docs/.vitepress/config.ts` 中添加导航和侧边栏配置
3. 确保文件名和路径正确

### 2. 添加新语言

1. 在 `config.ts` 的 `locales` 中添加新语言配置
2. 创建对应的文档目录
3. 翻译现有文档内容

### 3. 修改样式

1. 编辑 `docs/.vitepress/theme/custom.css`
2. 使用 CSS 变量进行主题定制
3. 确保响应式设计

### 4. 添加组件

1. 在 `docs/.vitepress/theme/components/` 下创建 Vue 组件
2. 在 `docs/.vitepress/theme/index.ts` 中注册组件
3. 在 Markdown 中使用组件

## 构建和部署

### 本地构建

```bash
pnpm build
```

构建结果位于 `docs/.vitepress/dist` 目录。

### 预览构建结果

```bash
pnpm preview
```

### 部署到 GitHub Pages

1. 构建文档：`pnpm build`
2. 将 `docs/.vitepress/dist` 目录内容推送到 `gh-pages` 分支
3. 在 GitHub 仓库设置中启用 Pages

### 自动部署

项目配置了 GitHub Actions 工作流，推送到 `main` 分支时会自动构建和部署。

## 代码规范

### Markdown

- 使用标准的 Markdown 语法
- 标题层级要清晰
- 代码块要指定语言
- 链接要使用相对路径

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

### CSS

- 使用 CSS 变量
- 遵循 BEM 命名规范
- 支持响应式设计
- 避免内联样式

## 测试

### 本地测试

```bash
# 启动开发服务器
pnpm dev

# 在浏览器中测试
# 检查所有页面是否正常显示
# 测试导航和搜索功能
# 验证响应式设计
```

### 构建测试

```bash
# 构建文档
pnpm build

# 检查构建结果
ls -la docs/.vitepress/dist

# 预览构建结果
pnpm preview
```

## 性能优化

### 图片优化

- 使用 SVG 格式（优先）
- 压缩图片文件
- 使用适当的尺寸
- 添加 alt 属性

### 代码分割

- 使用动态导入
- 按需加载组件
- 优化包大小

### 缓存策略

- 设置适当的缓存头
- 使用 CDN 加速
- 优化静态资源

## 故障排除

### 常见问题

1. **依赖安装失败**
   ```bash
   # 清除缓存
   pnpm store prune
   
   # 重新安装
   pnpm install
   ```

2. **构建失败**
   ```bash
   # 检查 Node.js 版本
   node --version
   
   # 检查 pnpm 版本
   pnpm --version
   ```

3. **页面显示异常**
   - 检查 Markdown 语法
   - 验证文件路径
   - 查看控制台错误

### 调试技巧

1. **启用调试模式**
   ```bash
   DEBUG=vitepress pnpm dev
   ```

2. **查看构建日志**
   ```bash
   pnpm build --verbose
   ```

3. **检查网络请求**
   - 使用浏览器开发者工具
   - 查看 Network 面板
   - 检查资源加载状态

## 维护指南

### 定期任务

1. **更新依赖**
   ```bash
   pnpm update
   ```

2. **检查安全漏洞**
   ```bash
   pnpm audit
   ```

3. **清理无用文件**
   ```bash
   # 清理构建缓存
   rm -rf docs/.vitepress/dist
   rm -rf docs/.vitepress/cache
   ```

### 版本管理

1. **创建标签**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **更新版本号**
   ```bash
   # 更新 package.json 中的版本号
   pnpm version patch
   ```

## 贡献指南

请参考 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何贡献代码。

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

- **项目地址**: https://github.com/NekoBotDevs/nekobotdevs.github.io
- **问题反馈**: https://github.com/NekoBotDevs/nekobotdevs.github.io/issues
- **讨论区**: https://github.com/NekoBotDevs/nekobotdevs.github.io/discussions

