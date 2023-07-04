const express = require('express');
const axios = require('axios')
const router = express.Router();

/* GET bookspage */
router.get("/signUp", (req, res, next) => {
  res.render("signUp");
});

module.exports = router;