const Mongoose=require('mongoose');
async function databaseConnect(){
   await Mongoose.connect('mongodb+srv://shreya05082:M5fk4Zr9iNWdXl4T@caradmin.wr7om.mongodb.net/');
   console.log("database Connection");
}

module.exports=databaseConnect;
 