const cron = require('node-cron');
const { exec } = require('child_process');
require('dotenv').config();

cron.schedule('0 0 * * 0', () => {
  const timestamp = new Date().toISOString().split('T')[0];
  const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;
  const outFile = `backups/${DB_NAME}_${timestamp}.sql`;
  const cmd = `mysqldump -u ${DB_USER} -p'${DB_PASSWORD}' ${DB_NAME} > ${outFile}`;
  exec(cmd, (err) => {
    if (err) console.error('Backup failed:', err);
    else console.log(`Backup created: ${outFile}`);
  });
});
