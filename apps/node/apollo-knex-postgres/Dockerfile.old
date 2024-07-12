FROM node:14

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY yarn.lock .
RUN yarn && yarn global add pm2

# Bundle app source
COPY . .

# Exports
EXPOSE 4000
# Start with pm2 using max clustered workers
CMD ["pm2-runtime", "start", "server.js", "-i", "max"]
