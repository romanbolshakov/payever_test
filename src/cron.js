const cron = require('node-cron');
const userService = require('./services/user.service');

let page = 0;
const fileName = require('path').resolve(__dirname, '../user_list.json');

const task = cron.schedule('0-59 * * * *', async () => {
  console.log('Executed...');
  page++;
  if (page === 60) page = 1;
  userService.getAndSaveUserListPage(page, fileName);
}, {scheduled: false});

task.start();

