const express = require('express');
const axios = require('axios')
const router = express.Router();

// app.set('view engine', 'hbs') 
// app.set('views', __dirname + '/views')


router.get('/books',(req, res)=> {
                    axios.get('https://openlibrary.org/people/mekBot/books/currently-reading.json')
                    .then( response => console.log(response.data))
                    .then(allBooks => {
                        res.render('books', { allBooks }); 
                    })
                    .catch(err => { console.log(err)});
});






module.exports = router;
