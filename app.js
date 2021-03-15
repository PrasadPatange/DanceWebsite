// Start server using->nodemon ./app.js
// In Browser->localhost:8000
// import express module
const express = require("express");
const path = require("path");

const app = express();
// from mongoose Documentation
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
//import body-parser
const bodyparser = require('body-parser'); 

const port = 8000;

// from mongoose Documentation
// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,  
    email: String,
    address: String,
    desc: String
});

// from mongoose Documentation
// convert Model
  const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})
// app.post() method express chya help ne used kraycha asel tr 
// and post request marun database mdhe save kraycha asel request.body la tr aplyala.
//  ek module install kayla lagel
//npm install body-parser


app.post('/contact', (req, res)=>{
    // Contact->object
    // req.body->request aa rahi usase content extract krke naya contact object banale
   var myData = new Contact(req.body);
//    .then()->promise return krayla lagel because nodejs async ahe
   myData.save().then(()=>{
       res.send("This is Item has been save to the Database");
// Error display
   }).catch(()=>{
       res.status(400).send("Item was Not Saved to the Database");
   });
    // res.status(200).render('contact.pug');
})




// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
