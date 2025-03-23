const mongoose = require("mongoose");
const MenuSchema=new mongoose.Schema({
    name:{type:String,required:true},
    category:{type:String},
    price:{type:Number,required:true},
    description:{type:String},
    available:{type:Boolean,default:true},
    image:{type:String}
},{
    timestamps:true
});
module.exports=mongoose.model("Menu",MenuSchema);
