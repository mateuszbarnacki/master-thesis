FROM node:18-alpine
ENV APP_PATH /measurement-post-service
WORKDIR $APP_PATH
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 13403