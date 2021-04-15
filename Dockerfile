FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PORT=8080
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run configure" ]
CMD [ "npm", "start" ]