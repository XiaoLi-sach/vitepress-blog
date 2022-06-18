import { defineConfig } from 'vitepress'

const config = defineConfig({
  title: 'XiaoLi_1456',

  themeConfig: {
    nav: [
      {
        text: '文档',
        activeMatch: '/docs/',
        link: '/docs/hello'
      }
    ],
    sidebar: {
      '/docs/': [
        {
          text: 'Hello',
          link: '/docs/hello',
        },
        { text: 'ES6标准入门一书总结', link: '/docs/es6/' },
      ],
    }
  }
})

export default config
