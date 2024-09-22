const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/routes')
const env = require('dotenv');
env.config();

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const mypath = path.join(__dirname, 'views');
const database = require('./config/db');
const cookieParser = require('cookie-parser');
    

app.set('view engine', 'ejs');


app.use('/upload',express.static(path.join(__dirname,'upload')));
app.use(express.static(mypath));


// body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());


// Use the routes
app.use('/', router);


app.get('/', (req, res)=>{
    res.render('Hello Users, I am Maroon!')
});






    

app.listen(PORT, (error)=>{
    if(!error){
        console.log(`Server Running on http://localhost:${PORT}`);
    }
});