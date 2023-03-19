//entry_index, entry_detail, entry_create_get, entry_create_post, entry_delete

const Blog = require('../models/blog');

const entry_index = (req,res) =>
{
    Blog.find().sort({ createdAt: -1 })
    .then((result) =>
    {
      res.render('index',{ title:'All entries', entry:result })
    })
    .catch((err)=>{
          console.log(err);
     });
}

const entry_detail = (req, res) => {
    //a get req to the server to get a specific entry with its id and display it in a page
    const id =req.params.id;
    Blog.findById(id)
     .then((result => {
        res.render('details', { entry : result, title:'Entry details' });
     }))
     .catch(err =>{
       console.log(err);
     });
}

//route which tends to render the create page
const entry_create_get = (req, res) => {
    res.render('create',{ title:'Create entry' });
}

//route which tends to add a new entry to the database
const entry_create_post = (req, res) => {
    const entry= new Blog(req.body);

    entry.save()
     .then((result) =>{
        res.redirect('/entries');
     })
    .catch((err)=>{
        console.log(err);
    });
}



const entry_update_detail = async(req, res) => {
    const article = await Blog.findById(req.params.id)
    res.render('update', { entry: article , title:'Update entry'})
}

//err part:-not working
const entry_update= async(req, res, next) => {

    req.article = await Blog.findById(req.params.id) 
    next()
    let article = req.article

    article.name = req.body.name
    article.expense = req.body.expense
    article.amount = req.body.amount  
    try {
        article = await article.save()
        res.redirect(`/entries/${article.id}`)
    }
    catch(e)
    {
      res.render('update', { entry: article , title:'Update entry'})
    }
}



const entry_delete = (req, res) => {
    const id =req.params.id;
    Blog.findByIdAndDelete(id)
    // we can use only as ajson method since we are using ajax in frontend to delete the blog usinf script tag frm details.ejs
        .then(result => {
            res.json({ redirect: '/entries' });
        })
        .catch(err => {
            console.log(err);
        })

}


module.exports = {
    entry_index,
    entry_detail,
    entry_create_get,
    entry_create_post,
    entry_delete,
    entry_update_detail,
    entry_update
}
