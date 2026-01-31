FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies based on the package.json
COPY package*.json ./
RUN npm install --production

# Copy app sources
COPY . .

# Cloud Run sets the port via $PORT; default to 8080
ENV PORT 8080
EXPOSE 8080

CMD ["npm", "start"]
