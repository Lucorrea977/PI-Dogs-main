const server = require('./src/app.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at', process.env.PORT);
  });
});
