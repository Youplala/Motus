FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV PGUSER=postgres
ENV PGHOST=db
ENV PGPASSWORD=password
ENV PGDATABASE=postgres
CMD ["node", "index.js"]
