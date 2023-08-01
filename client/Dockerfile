FROM node:18-alpine
ENV APP_PATH /client
WORKDIR $APP_PATH
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 3000