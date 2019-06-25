const express = require("express");
const organizationCntrl = require("../controllers/organizationController");
const router = express.Router();

// retrieve and create Organization
router
  .route("/organizations")
  .get(organizationCntrl.listAllOrganization)
  .post(organizationCntrl.createNewOrganization);

router.get("/organizations/:organizationId", organizationCntrl.findById);

// update a Organization

router.put(
  "/organizations/:organizationId",
  organizationCntrl.updateOrganization
);

// delete a Organization
router.delete(
  "/organizations/:organizationId",
  organizationCntrl.deleteOrganization
);

module.exports = router;
