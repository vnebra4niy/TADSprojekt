FROM node:16
WORKDIR /app
COPY client/package*.json ./
RUN npm install --force
COPY client/ ./
EXPOSE 3000

CMD ["npm", "start"]