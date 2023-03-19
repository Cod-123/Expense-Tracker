
const express = require('express');
const morgan= require('morgan');
const mongoose = require('mongoose');
const entryRoutes = require('./routes/entryRoutes');



// express app
const app = express();

//connection to mongodb
const dbURI='mongodb+srv://vishal:test1234@node-beg.amlhliy.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => app.listen(3500))
 .catch((err) => console.log(err));

app.set('view engine', 'ejs');
//middleware 
//this middelware wraps up the data received frm the form while submitting data and sends it to the server
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});




// listen for requests
console.log('listening for requests on port 3500');


//url that the app will listen to
app.get('/', (req, res) => {

    res.redirect('/entries');
});

app.get('/about', (req, res) => {

   
    res.render('about',{ title:'About' });
});





//route to add entry to the database
// app.get('/add-entry',(req,res)=>{
//     const blog = new Blog({
//         name: 'vishal',
//         expense: 'shopping',
//         amount: 500
//     });

//     blog.save()
//      .then((result) =>
//      {
//         res.send(result)
//      })
//      .catch((err)=>{
//         console.log(err);
//      });

// });

// //route to retrieve all entries
// app.get('/all-entries',(req,res)=>{

//     Blog.find()
//      .then((result)=>
//      {
//         res.send(result);
//      })

//      .catch((err)=>{
//         console.log(err);
//      });
// });

// //route to retrieve a specific entry
// app.get('/one-entry',(req,res)=>{

//     Blog.findById('63f6eb9eb44838d11113ced3')
//      .then((result)=>
//      {
//         res.send(result);
//      })

//      .catch((err)=>{
//         console.log(err);
//      });
// });


//entry routes
app.use(entryRoutes);




//redirects to about page
// app.get('/about-me', (req, res) => {

//     res.redirect('/about');
// });

//404 page
app.use((req, res) => {
    
    //res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404',{ title:'404' });
});

