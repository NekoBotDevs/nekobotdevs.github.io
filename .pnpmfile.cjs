// pnpm 配置文件
module.exports = {
  hooks: {
    readPackage(pkg) {
      // 可以在这里修改包配置
      return pkg
    }
  }
}

