const sequelize = require("sequelize");
const User = require("./userModel");
const Organization = require("./organizationModel");
const db = require("../../config/db");
const Ticket = db.define(
  "Ticket",
  {
    ticket_id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ticket_title: {
      type: sequelize.STRING
    },
    ticket_description: {
      type: sequelize.STRING
    },
    post_time: {
      type: sequelize.TIME
    },
    ticket_status: {
      type: sequelize.STRING
    },
    organization_id: {
      type: sequelize.INTEGER,
      references: {
        model: "organization",
        key: "organization_id",
        allowNull: true
      }
    },
    user_id: {
      type: sequelize.INTEGER,
      references: {
        model: "user",
        key: "user_id",
        allowNull: true
      }
    }
  },
  {
    timestamps: false
  }
);
// association
Ticket.belongsTo(Organization, { foreignKey: "organization_id" });
Ticket.belongsTo(User, { foreignKey: "user_id" });

module.exports = Ticket;
