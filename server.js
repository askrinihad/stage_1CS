const express= require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const compte= require('./routes/compte');



const app = express();

app.use(bodyParser.json());


//db config
const db = require('./config/key').mongoURI;

//connect to mongo

mongoose
 .connect(db)
 .then(()=> console.log('MongoDB connected...'))
 .catch(err => console.log(err));

 //use routes
 app.use('/compte',compte);
 //app.use('/',derang);
 


 const port = process.env.PORT || 5000;

 app.listen(port, () => console.log('server started on port ${port}'));