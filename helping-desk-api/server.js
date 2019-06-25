const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const userRouter = require("./api/routes/userRoutes");
const ticketRouter = require("./api/routes/ticketRoutes");
const organizationRouter = require("./api/routes/organizationRoute");
const authRoute = require("./api/routes/authRoute");
const utils = require("./api/utils/auth");
const cors = require("cors");
const app = express();
const db = require("./config/db");
port = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// testing for connection
db.authenticate()
  .then(function() {
    console.log("database  is connected successfully");
  })
  .catch(function(err) {
    console.log("wrong");
  })
  .done();

app.use(authRoute);

app.use(utils.ensureAuthenticated);
app.use(userRouter);

app.use(ticketRouter);
app.use(organizationRouter);
app.listen(port, () => {
  console.log("listing at port ", port);
});
