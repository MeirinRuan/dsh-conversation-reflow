# 会话自适应布局安装与维护

[English](guide.md) | 中文

## 安装与使用

当前精确声明支持 DSH `0.2.2-rc.1`。插件依赖 DSH 页面结构，其他版本需另行验证。在 DSH 插件管理器中安装 GitHub Releases 的预构建 `.tgz`，或替换下载路径并运行：

```text
dsh plugin --profile web add <absolute-path-to-downloaded.tgz>
```

使用你实际要安装的配置名。桌面版 CLI 要求先打开一次桌面版初始化配置，再完全退出桌面版后执行插件命令。不要同时启用公开包和 `@local/dsh-conversation-reflow`，两者提供相同样式。启用公开包前先禁用或移除旧本地包。

样式作用于原生主会话，宽度上限跟随测得的会话列宽，并保留用户设定的更窄宽度。长文本和表格单元格可以换行，表格溢出限制在表格容器内，代码块沿用原生滚动。

插件没有配置项。禁用包可恢复原生布局。从示例配置卸载使用：

```text
dsh plugin --profile web remove dsh-conversation-reflow
```

## 兼容性与隐私

插件依赖原生会话的数据属性、宽度变量和 md-table-wide 标记。自定义嵌入会话或替代渲染器可能采用不同结构，第三方固定宽度内容仍可能需要横向滚动。

样式继承原生字体和颜色。插件不收集或发送工作区名称、路径及会话内容。公开示例和截图应使用模拟名称和消息。Chromium 代表性页面验证可检查布局，但不等于兼容所有真实 DSH 页面或第三方插件。

## 开发与发布

浏览器入口本身就是 JavaScript 源码，无需编译或安装依赖。使用 Node.js `^22.19.0 || >=24.0.0` 和 pnpm `11.28.5` 检查语法并生成 npm 格式运行归档：

```text
pnpm run check
pnpm pack --out <external-output-directory>/dsh-conversation-reflow.tgz
```

使用工作区之外已存在的输出目录。归档包含 [Host 入口](../index.js)、[浏览器入口](../client.js)、[补丁](../cordis.patch.yml)、语言文件、图标、许可证和文档。扩大 `engines.dsh` 前，先在目标 DSH 版本验证。

把归档附加到版本化 GitHub Release，资产名固定为 `dsh-conversation-reflow.tgz`。[市场条目草案](https://github.com/MeirinRuan/dsh-conversation-reflow/blob/main/market/MeirinRuan__dsh-conversation-reflow.yml)指向 `releases/latest/download/`，公开仓库创建满一天后可申请收录。仓库添加 `dsh-plugin` topic，并遵循[目录贡献指南](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/blob/main/contributing.md)。npm 发布是可选项。只向目录仓库提交条目 YAML；发布 Release 本身不代表已被 dsh-market 收录。
