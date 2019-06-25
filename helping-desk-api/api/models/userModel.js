const sequelize = require("sequelize");
const Organization = require("./organizationModel");
const db = require("../../config/db");
const User = db.define(
  "User",
  {
    user_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: sequelize.STRING
    },
    user_email: {
      type: sequelize.STRING
    },
    user_passsword: {
      type: sequelize.STRING
    },
    user_role: {
      type: sequelize.STRING
    },
    organization_id: {
      type: sequelize.INTEGER,
      references: {
        model: "organization",
        key: "organization_id",
        allowNull: true
      }
    }
  },
  {
    timestamps: false
  }
);
User.belongsTo(Organization, { foreignKey: "organization_id" });
module.exports = User;
