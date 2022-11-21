const cron = require('node-cron');
const updateBd = require('./util/updateBd')

cron.schedule('0 0 * * *', () => {
// cron.schedule('* * * * *', () => {
  updateBd()
})

