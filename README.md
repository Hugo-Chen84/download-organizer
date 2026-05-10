# File Download Organizer

一个跨浏览器的文件分类下载管理插件，支持 Chrome 和 Microsoft Edge 浏览器。

## 功能特性

- **自动分类下载**：根据文件扩展名自动将下载文件分类到对应文件夹
- **6大分类**：文档、代码、图片、视频、压缩包、安装包
- **用户界面**：提供分类规则查看和下载历史记录功能
- **冲突处理**：自动处理文件命名冲突

## 支持的文件类型

### 📄 文档 (documents)
- .docx, .ppt, .pdf, .pptx, .doc, .xls, .xlsx
- .md, .txt, .rtf, .odt, .csv, .epub, .mobi

### 💻 代码 (code)
- .c, .v, .py, .xdf, .h, .js, .html, .css
- .java, .cpp, .php, .go, .rb, .swift, .ts, .json

### 🖼️ 图片 (images)
- .jpg, .img, .png, .gif, .bmp, .svg, .webp, .tiff, .ico

### 🎬 视频 (videos)
- .mp4, .avi, .mov, .wmv, .flv, .mkv, .webm

### 📦 压缩包 (archives)
- .zip, .7z, .rar, .tar, .gz, .bz2, .iso

### 🔧 安装包 (installers)
- .exe, .msi, .dmg, .pkg, .deb, .rpm

## 安装方法

### Chrome / Edge 浏览器

1. 下载本仓库的 ZIP 包并解压，或使用 Git 克隆：
   ```bash
   git clone https://github.com/yourusername/file-download-organizer.git
   ```

2. 打开浏览器扩展管理页面：
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`

3. 开启「开发者模式」

4. 点击「加载已解压的扩展程序」，选择解压后的 `project1` 文件夹

5. 插件安装完成，会在浏览器工具栏显示图标

## 使用说明

1. 安装插件后，所有下载的文件会自动分类到对应文件夹
2. 点击浏览器工具栏的插件图标，可以查看：
   - **分类规则**：查看所有支持的文件类型及其分类
   - **下载历史**：查看最近20条下载记录

## 项目结构

```
project1/
├── manifest.json    # 扩展配置文件
├── background.js    # 后台服务脚本
├── popup.html       # 弹出界面
├── popup.js         # 界面交互逻辑
└── icons/           # 图标资源
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

## 技术栈

- Manifest V3
- JavaScript (ES6+)
- HTML5 / CSS3

## 浏览器兼容性

- ✅ Google Chrome (最新版)
- ✅ Microsoft Edge (最新版)

## 许可证

MIT License