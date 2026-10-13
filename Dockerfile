FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=18765 HOST=0.0.0.0
COPY . .
EXPOSE 18765
CMD ["node", "scripts/production-server.mjs"]
