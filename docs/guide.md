# Install and maintain Conversation Reflow

English | [中文](guide.zh.md)

## Install and use

The declared DSH version is exactly `0.2.2-rc.1`. Other versions need separate validation because this plugin depends on DSH markup. Install the prebuilt `.tgz` from GitHub Releases with DSH Plugin Manager, or replace the download path and run:

```text
dsh plugin --profile web add <absolute-path-to-downloaded.tgz>
```

Use your intended profile name. The Desktop CLI requires opening Desktop once to initialize its profile, then fully quitting Desktop before plugin commands. Do not enable this public package alongside `@local/dsh-conversation-reflow`: they contribute the same styles. Disable or remove the old local bundle before enabling this one.

The stylesheet targets the native main conversation. Its width cap follows the measured conversation column and respects a narrower user width. Long text and table cells can wrap; table overflow remains within its wrapper. Code blocks retain native scrolling.

There are no configuration options. Disable the bundle to restore the native layout. To uninstall it from the example profile:

```text
dsh plugin --profile web remove dsh-conversation-reflow
```

## Compatibility and privacy

The plugin depends on native conversation data attributes, width variables, and the md-table-wide hook. A custom embedded conversation or replacement renderer may use different markup. Fixed-width third-party content can still require horizontal scrolling.

The styles inherit native typography and colors. No workspace names, paths, or conversation content are collected or sent by the plugin. Public examples and screenshots should use synthetic names and messages. Representative Chromium fixtures can check layout but do not establish compatibility with every live DSH page or third-party plugin.

## Develop and release

The browser entry is already source JavaScript; no compilation or dependency installation is needed. Node.js `^22.19.0 || >=24.0.0` and pnpm `11.28.5` can check syntax and create the npm-format runtime archive:

```text
pnpm run check
pnpm pack --out <external-output-directory>/dsh-conversation-reflow.tgz
```

Use an existing output directory outside the checkout. The [Host carrier](../index.js), [browser entry](../client.js), [patch](../cordis.patch.yml), locales, icon, license, and documentation are included in the archive. Test against the target DSH version before extending `engines.dsh`.

Attach the archive to a versioned GitHub Release with the stable asset name `dsh-conversation-reflow.tgz`. The [prepared market entry](https://github.com/MeirinRuan/dsh-conversation-reflow/blob/main/market/MeirinRuan__dsh-conversation-reflow.yml) points at `releases/latest/download/` and can be submitted after the public repository is at least one day old. Add the `dsh-plugin` repository topic and follow the [directory contribution guide](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin/blob/main/contributing.md). npm publication is optional. Submit only the entry YAML to that directory repository; release publication does not itself list the plugin in dsh-market.
