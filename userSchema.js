const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    }

});
const UserModel=mongoose.model("UserModel",userSchema);
module.exports=UserModel;
