const express = require("express");
const ticketCntrl = require("../controllers/ticketController");
const router = express.Router();

// retrieve and create ticket
router
  .route("/tickets")
  .get(ticketCntrl.listAllTicket)
  .post(ticketCntrl.createNewTicket);

router.get("/tickets/:ticketId", ticketCntrl.findById);

// update a ticket

router.put("/tickets/:ticketId", ticketCntrl.updateTicket);

// delete a ticket
router.delete("/tickets/:ticketId", ticketCntrl.deleteTicket);

module.exports = router;
