const express = require('express');

//importing the controller file from the controllers folder in order to make use of the functions in it
const Controller=require('../controllers/Controller');
//const Blog = require('../models/blog');
const router=express.Router();


router.get('/entries/create', Controller.entry_create_get);

//this allows us to view all the entries made by sending a get request to the server
router.get('/entries', Controller.entry_index);

//a post req to the server to add a new entry
router.post('/entries', Controller.entry_create_post);


router.get('/entries/:id',Controller.entry_detail);



router.get('/entries/edit/:id', Controller.entry_update_detail);


router.put('/entries/:id', Controller.entry_update);
    // const article = await Article.findById(req.params.id)
    // res.render('views/update', { article: article })
  



//route to delete the entry
router.delete('/entries/:id', Controller.entry_delete);



module.exports = router;
