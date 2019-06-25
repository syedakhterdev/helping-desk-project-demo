const Ticket = require("../models/ticketModel");
const Organization = require("../models/organizationModel");
const User = require("../models/userModel");
// Retrieve All tickets
exports.listAllTicket = (req, res) => {
  if (req.user.role === "Admin") {
    Ticket.findAll({ include: [Organization, User] }).then(result => {
      res.send(result);
    });
  } else {
    Ticket.findAll({
      where: { organization_id: req.user.organization_id },
      include: [Organization, User]
    }).then(result => {
      res.send(result);
    });
  }
};
// create new  ticket
exports.createNewTicket = (req, res) => {
  const ticket = new Ticket({
    ticket_title: req.body.ticket_title,
    ticket_description: req.body.ticket_description,
    user_id: req.user.user_id,
    organization_id: req.user.organization_id
  });
  ticket.save().then((result, err) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(true);
  });
};
// Retrieve single ticket

exports.findById = function(req, res) {
  Ticket.findByPk(req.params.ticketId).then(ticket => {
    res.send(ticket);
  });
};

// update a ticket

exports.updateTicket = function(req, res) {
  const id = req.params.ticketId;
  Ticket.update(
    {
      ticket_title: req.body.ticket_title,
      ticket_description: req.body.ticket_description,
      post_time: req.body.post_time,
      ticket_status: req.body.ticket_status,
      user_id: req.body.user_id,
      organization_id: req.body.organization_id
    },
    { where: { id: req.params.ticketId } }
  ).then(ticket => {
    res.status(200).send(ticket);
  });
};

// delete ticket
exports.deleteTicket = (req, res) => {
  const id = req.params.ticketId;
  Ticket.destroy({
    where: { ticket_id: id }
  }).then(() => {
    res.status(200).send("data is deleted successfully with id = " + id);
  });
};
