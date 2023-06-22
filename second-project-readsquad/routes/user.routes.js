const express = require('express');
const router = express.Router();

/* GET bookspage */
router.get("/user", (req, res, next) => {
  res.render("User");
});

module.exports = router;
