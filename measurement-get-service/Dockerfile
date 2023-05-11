FROM node:18-alpine
ENV APP_PATH /measurement-get-service
WORKDIR $APP_PATH
COPY . .
RUN npm install
CMD ["node", "src/server.js"]
EXPOSE 13404
