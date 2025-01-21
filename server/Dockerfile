FROM node:16
WORKDIR /app
COPY server/package*.json ./
RUN npm install --force
COPY server/ ./
EXPOSE 5000

CMD ["npm", "start"]