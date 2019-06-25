const Organization = require("../models/organizationModel");
// Retrieve All Organization
exports.listAllOrganization = (req, res) => {
  Organization.findAll().then(result => {
    res.send(result);
  });
};
// create new  Organization
exports.createNewOrganization = (req, res) => {
  console.log("lsljdflasjfd", req.body);
  const organization = new Organization(req.body);
  organization.save().then((result, err) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.send(true);
  });
};
// Retrieve single Organization

exports.findById = function(req, res) {
  Organization.findByPk(req.params.organizationId).then(organization => {
    res.send(organization);
  });
};

// update a Organization

exports.updateOrganization = function(req, res) {
  const id = req.params.OrganizationId;
  Organization.update(
    {
      organization_name: req.body.ticket_title,
      organization_description: req.body.ticket_description
    },
    { where: { organization_id: id } }
  ).then(organization => {
    res.status(200).send(organization);
  });
};

// delete Organization
exports.deleteOrganization = (req, res) => {
  const id = req.params.organizationId;
  Organization.destroy({
    where: { organization_id: id }
  }).then(result => {
    res.send(true);
  });
};
