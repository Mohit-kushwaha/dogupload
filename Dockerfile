FROM node:18.17.0-alpine

WORKDIR /app

# start app
RUN npm install nodemon -g 

# Install dependencies
COPY package*.json ./
RUN npm install

COPY ./ ./

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
RUN echo your NODE_ENV for current ENVIORMENT is $NODE_ENV   ;
CMD ["sh","-c","npm run start"]
