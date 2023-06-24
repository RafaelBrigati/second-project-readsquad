const express = require('express');
const router = express.Router();

/* GET bookspage */
router.get("/books", (req, res, next) => {
  res.render("books");
});

module.exports = router;
