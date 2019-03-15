FROM node:latest

WORKDIR /usr/mis

COPY package*.json /usr/mis/

RUN npm install 

COPY . /usr/mis 

EXPOSE 4000 

ENV PORT 4000

CMD [ "npm", "start" ] 

