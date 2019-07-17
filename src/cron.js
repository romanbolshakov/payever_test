const cron = require('node-cron');
const userService = require('./services/user.service');

let page = 5;
const fileName = require('path').resolve(__dirname, '../user_list.json');

const task = cron.schedule('0-59 * * * *', async () => {
  console.log('Executed...');
  page++;
  userService.getAndSaveUserListPage(page, fileName);
}, {scheduled: false});

//task.start();
page++;
userService.getAndSaveUserListPage(page, fileName);

