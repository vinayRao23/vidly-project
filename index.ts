const app = require("./app");

require("./startup/logging")();
require("./startup/db")();
require("./startup/config")();

const port: string | 5000 = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = server;
