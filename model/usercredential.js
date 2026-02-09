const  mongoose=require('mongoose');



const usercredential =new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    userid:{
        type:Number,
        required:true,
       
    },

    lat: {
        type: Number,
        default: 11.1271
    },

    lng: {
        type: Number, 
        default: 78.6569
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('usercredential',usercredential);