const express = require('express');
const app = require('./config/express');

const serverBoot = () => {
  const server = require('http').Server(app);
  const port = 3000;
  server.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  })
}

serverBoot();
