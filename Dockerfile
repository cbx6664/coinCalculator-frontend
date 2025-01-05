# 使用 Nginx 作为静态文件服务器
FROM nginx:alpine

# 复制构建后的 React 静态文件到 Nginx 默认目录
COPY build/ /usr/share/nginx/html/

# 暴露端口 80
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
