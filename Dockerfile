# 1. Choose the base environment (a lightweight Linux machine with Node.js installed)
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the package files first (this makes future builds faster)
COPY package*.json ./

# 4. Install the dependencies inside the container
RUN npm install

# 5. Copy the rest of your application code (server.js) into the container
COPY . .

# 6. Expose the port the app runs on so the outside world can see it
EXPOSE 7860

# 7. The command to start the application
CMD ["npm", "start"]