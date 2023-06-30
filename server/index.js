const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const Url=require('./Url');
const routes=require('./routes');
const app = express();
const PORT= 5500; 
const MONGODB_URI = 'mongodb+srv://user123:User123@cluster0.ydbd6gy.mongodb.net/'
const cors=require('cors'); 
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true}
    ).then(()=>{
        console.log('Connected to MongoDB')
    }).catch((err)=>{
        console.error("Error connecting to Mongodb: ",err)
    }); 

app.use(bodyParser.json());
app.use(express.json()); 
app.use('/api',routes); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));   
