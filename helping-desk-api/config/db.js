const env = require("./env");
const Sequelize = require("sequelize");
module.exports = new Sequelize(env.database, env.username, env.password, {
  port: env.port,
  host: env.host,
  dialect: env.dialect
});
