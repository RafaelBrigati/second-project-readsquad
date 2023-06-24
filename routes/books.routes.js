const express = require('express');
const axios = require('axios')
const router = express.Router();

const allBooks = axios.get('https://openlibrary.org/people/mekBot/books/currently-reading.json')
                    .then( response => console.log(response.data))
                    .catch(err => console.log(err))

/* GET bookspage */
router.get("/books", (req, res, next) => {
  res.render("books");
});

module.exports = router;
