const express = require("express");
const router = express.Router();
const {
  getClients,
  getClient,
  createClients,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const validateToken = require("../middleware/validateTokenHandler");

// Apply validateToken middleware only for non-POST requests
router.use((req, res, next) => {
  if (req.method !== "POST") {
    validateToken(req, res, next);
  } else {
    next();
  }
});

router.route("/").get(getClients).post(createClients);
router.route("/:id").get(getClient).delete(deleteClient).put(updateClient);

module.exports = router;
