const sequelize = require("sequelize");
const db = require("../../config/db");
const Organization = db.define(
  "Organization",
  {
    organization_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    organization_name: {
      type: sequelize.STRING
    },
    organization_description: {
      type: sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);
module.exports = Organization;
