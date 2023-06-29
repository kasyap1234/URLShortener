const mongoose= require('mongoose');

const UrlSchema= new mongoose.Schema({
    originalUrl:String, 
    shortUrl: String, 
    createdAt: {
        type: Date, 
        default: Date.now
    } 
}); 
const Url=mongoose.model('Url',UrlSchema); 
module.exports=Url; 
