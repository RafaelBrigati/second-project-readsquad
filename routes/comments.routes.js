const express = require('express');
const axios = require('axios')
const router = express.Router();


router.get('/comments',(req, res)=> {
                    axios.get('https://openlibrary.org/people/mekBot/books/currently-reading.json')
                
                    .then( response => {
                        console.log(response.data.reading_log_entries[0].work);
                        res.render('bcomments', { allComments: response.data.reading_log_entries })
                        
                    })
                    .catch(err => { console.log(err)});
});

