# Stamp Stock Manage

邮票库存管理系统 - 一个基于 Tauri 2 的桌面应用程序。

## 技术栈

### 前端
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **TailwindCSS** - 样式框架
- **Radix UI** - 无障碍组件库
- **TanStack Router** - 路由管理
- **TanStack Query** - 数据请求
- **TanStack Table** - 表格组件
- **Zustand** - 状态管理

### 后端
- **Go 1.22** - 服务端语言
- **Chi** - HTTP 路由
- **SQLite** - 数据库 (modernc.org/sqlite)
- **SQLx** - 数据库操作

### 桌面
- **Tauri 2** - 桌面应用框架
- **Rust** - Tauri 核心

## 环境要求

- **Node.js** >= 18
- **pnpm** >= 8
- **Go** >= 1.22
- **Rust** >= 1.70 (用于 Tauri)

## 快速开始

### 1. 安装依赖

```bash
# 运行安装脚本（推荐）
./scripts/setup.sh

# 或手动安装
pnpm install
cd backend && go mod download
```

### 2. 开发模式

#### 仅前端开发
```bash
pnpm dev
```
访问 http://localhost:5173

#### 仅后端开发
```bash
pnpm dev:backend
```
后端默认运行在 http://localhost:8080

#### 前后端同时开发
```bash
pnpm dev:all
```

#### Tauri 桌面应用开发
```bash
# 先构建后端 sidecar
./scripts/build-sidecar.sh

# 启动 Tauri 开发模式
pnpm tauri:dev
```

### 3. 构建

#### 构建前端
```bash
pnpm build
```

#### 构建后端
```bash
pnpm build:backend
# 或
./scripts/build-backend.sh
```

#### 构建 Tauri 桌面应用
```bash
# 1. 先构建 sidecar（Go 后端）
./scripts/build-sidecar.sh

# 2. 构建桌面应用
pnpm tauri:build
```

## 项目结构

```
stamp_stock_manage/
├── src/                    # React 前端源码
│   ├── api/               # API 客户端
│   ├── components/        # React 组件
│   │   └── ui/           # 基础 UI 组件
│   ├── routes/           # 路由配置
│   ├── stores/           # Zustand 状态
│   └── types/            # TypeScript 类型
├── backend/               # Go 后端源码
│   ├── internal/
│   │   ├── config/       # 配置
│   │   ├── database/     # 数据库
│   │   ├── handler/      # HTTP 处理器
│   │   ├── middleware/   # 中间件
│   │   └── router/       # 路由
│   └── pkg/
│       └── response/     # 响应工具
├── src-tauri/            # Tauri 配置和 Rust 代码
│   ├── binaries/         # 编译后的后端二进制
│   └── src/              # Rust 源码
├── scripts/              # 构建脚本
└── public/               # 静态资源
```

## 开发脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动前端开发服务器 |
| `pnpm dev:backend` | 启动后端开发服务器 |
| `pnpm dev:all` | 同时启动前后端 |
| `pnpm build` | 构建前端 |
| `pnpm build:backend` | 构建后端 |
| `pnpm lint` | 运行 ESLint |
| `pnpm tauri:dev` | Tauri 开发模式 |
| `pnpm tauri:build` | 构建桌面应用 |

## 许可证

MIT
