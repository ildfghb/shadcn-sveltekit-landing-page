# 第一阶段：构建阶段，基于 Node.js 构建应用
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到容器中
COPY package.json package-lock.json ./

# 清理 npm 缓存并重新生成 lock 文件
RUN npm cache clean --force && \
    rm -f package-lock.json && \
    npm install

# 将项目源代码复制到容器中
COPY . .

# 构建项目（生产模式）
RUN npm run build

# 调试：检查构建产物
RUN echo "=== 检查构建产物 ===" && \
    find /app -name "*.html" -type f && \
    ls -la /app/.svelte-kit/ && \
    if [ -d "/app/.svelte-kit/output" ]; then \
        echo "找到 output 目录:" && ls -la /app/.svelte-kit/output/; \
    fi && \
    if [ -d "/app/build" ]; then \
        echo "找到 build 目录:" && ls -la /app/build/; \
    fi && \
    if [ -d "/app/dist" ]; then \
        echo "找到 dist 目录:" && ls -la /app/dist/; \
    fi

# 第二阶段：使用 Nginx 提供静态资源
FROM nginx:alpine

# 删除 Nginx 默认文件
RUN rm -rf /usr/share/nginx/html/*

# 复制 SvelteKit 构建文件
# adapter-static 默认输出到 build 目录
COPY --from=build /app/build /usr/share/nginx/html

# 拷贝自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/nginx.conf

# 调试：验证文件是否正确复制
RUN echo "=== 检查 Nginx 静态文件目录 ===" && \
    ls -la /usr/share/nginx/html/ && \
    echo "=== 检查是否有 index.html ===" && \
    if [ -f "/usr/share/nginx/html/index.html" ]; then \
        echo "找到 index.html 文件" && head -n 10 /usr/share/nginx/html/index.html; \
    else \
        echo "警告: 未找到 index.html 文件"; \
    fi

# 测试 Nginx 配置
RUN nginx -t

# 暴露 Nginx 服务端口
EXPOSE 80

# 启动 Nginx（前台运行）
CMD ["nginx", "-g", "daemon off;"]