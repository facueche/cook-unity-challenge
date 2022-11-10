FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Cannot wait for postgres yet
# RUN npx prisma migrate dev --name init
CMD [ "npm", "run", "dev" ]
