FROM node:18
WORKDIR /app
COPY app.js .
COPY pages/home.html .
COPY pages/hello.html .
COPY pages/goodbye.html .
COPY pages/template.html .
RUN npm install express axios
EXPOSE 3000
CMD ["node", "app.js"]
