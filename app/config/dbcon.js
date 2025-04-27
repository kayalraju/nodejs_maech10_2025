
const mongoose = require('mongoose');
const dbCon=async()=>{
    try{
      const db= await mongoose.connect(process.env.MONGOURL)
      if(db){
        console.log("dadabase connected");
      }else{
        console.log("dadabase not connected");
      }

    }catch(err){
        console.log(err);
    }
}

module.exports=dbCon;