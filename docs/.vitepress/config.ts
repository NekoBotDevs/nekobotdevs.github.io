import { defineConfig } from 'vitepress'
import { resolve } from 'path'

export default defineConfig({
  title: 'NekoBot',
  description: 'AI驱动的机器人框架',
  base: '/nekobotdevs.github.io/',
  
  // 多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh',
      title: 'NekoBot',
      description: 'AI驱动的机器人框架',
      themeConfig: {
        nav: [
          { text: '首页', link: '/' },
          { text: '指南', link: '/zh/guide/' },
          { text: 'API', link: '/zh/api/' },
          { text: '插件', link: '/zh/plugins/' },
          { text: 'GitHub', link: 'https://github.com/NekoBotDevs/NekoBot' }
        ],
        sidebar: {
          '/zh/guide/': [
            {
              text: '开始使用',
              items: [
                { text: '介绍', link: '/zh/guide/' },
                { text: '快速开始', link: '/zh/guide/getting-started' },
                { text: '安装', link: '/zh/guide/installation' },
                { text: '配置', link: '/zh/guide/configuration' }
              ]
            },
            {
              text: '核心功能',
              items: [
                { text: '插件系统', link: '/zh/guide/plugins' },
                { text: '命令系统', link: '/zh/guide/commands' },
                { text: 'LLM配置', link: '/zh/guide/llm' },
                { text: '日志管理', link: '/zh/guide/logging' }
              ]
            },
            {
              text: '平台对接',
              items: [
                { text: 'QQ', link: '/zh/guide/platforms/qq' },
                { text: 'Discord', link: '/zh/guide/platforms/discord' },
                { text: 'Telegram', link: '/zh/guide/platforms/telegram' },
                { text: '微信', link: '/zh/guide/platforms/wechat' }
              ]
            }
          ],
          '/zh/api/': [
            {
              text: 'API参考',
              items: [
                { text: '概述', link: '/zh/api/' },
                { text: '认证', link: '/zh/api/auth' },
                { text: '插件管理', link: '/zh/api/plugins' },
                { text: '配置管理', link: '/zh/api/config' }
              ]
            }
          ],
          '/zh/plugins/': [
            {
              text: '插件开发',
              items: [
                { text: '介绍', link: '/zh/plugins/' },
                { text: '创建插件', link: '/zh/plugins/creating' },
                { text: '插件API', link: '/zh/plugins/api' },
                { text: '发布插件', link: '/zh/plugins/publishing' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en',
      title: 'NekoBot',
      description: 'AI-powered bot framework',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Guide', link: '/en/guide/' },
          { text: 'API', link: '/en/api/' },
          { text: 'Plugins', link: '/en/plugins/' },
          { text: 'GitHub', link: 'https://github.com/NekoBotDevs/NekoBot' }
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Introduction', link: '/en/guide/' },
                { text: 'Quick Start', link: '/en/guide/getting-started' },
                { text: 'Installation', link: '/en/guide/installation' },
                { text: 'Configuration', link: '/en/guide/configuration' }
              ]
            },
            {
              text: 'Core Features',
              items: [
                { text: 'Plugin System', link: '/en/guide/plugins' },
                { text: 'Command System', link: '/en/guide/commands' },
                { text: 'LLM Configuration', link: '/en/guide/llm' },
                { text: 'Logging', link: '/en/guide/logging' }
              ]
            },
            {
              text: 'Platform Integration',
              items: [
                { text: 'QQ', link: '/en/guide/platforms/qq' },
                { text: 'Discord', link: '/en/guide/platforms/discord' },
                { text: 'Telegram', link: '/en/guide/platforms/telegram' },
                { text: 'WeChat', link: '/en/guide/platforms/wechat' }
              ]
            }
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Overview', link: '/en/api/' },
                { text: 'Authentication', link: '/en/api/auth' },
                { text: 'Plugin Management', link: '/en/api/plugins' },
                { text: 'Configuration', link: '/en/api/config' }
              ]
            }
          ],
          '/en/plugins/': [
            {
              text: 'Plugin Development',
              items: [
                { text: 'Introduction', link: '/en/plugins/' },
                { text: 'Creating Plugins', link: '/en/plugins/creating' },
                { text: 'Plugin API', link: '/en/plugins/api' },
                { text: 'Publishing', link: '/en/plugins/publishing' }
              ]
            }
          ]
        }
      }
    }
  },

  themeConfig: {
    // 搜索配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          },
          en: {
            translations: {
              button: {
                buttonText: 'Search Docs',
                buttonAriaLabel: 'Search Docs'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
                }
              }
            }
          }
        }
      }
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/NekoBotDevs/NekoBot' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024 NekoBotDevs'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/NekoBotDevs/NekoBot/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 大纲
    outline: {
      level: [2, 3],
      label: '页面大纲'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // 自定义主题
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../')
      }
    }
  },

  // 头部配置
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'AI驱动的机器人框架' }],
    ['meta', { name: 'keywords', content: 'NekoBot, 机器人, AI, 插件, 框架' }]
  ]
})
