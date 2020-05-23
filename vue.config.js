const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/dist/',
  outputDir: 'dist',
  assetsDir: 'src',
  lintOnSave: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8081,
    hotOnly: false,
    // proxy: false
    proxy: {
      '/tripapi': {
        target: 'https://testapi.kailly.com',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('file-loader')
      .loader('file-loader')
    config.resolve.alias
      .set('@', resolve('src'))
  },
  configureWebpack: {  // 覆盖webpack默认配置的都在这里
    resolve: {   // 配置解析别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@v': path.resolve(__dirname, './src/views'),
        '@a': path.resolve(__dirname, './src/assets')
      }
    }
  }
}
