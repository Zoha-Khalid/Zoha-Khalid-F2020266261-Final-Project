const mongoose = require("mongoose")

const connectDB= async()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/F2020266261-Final-Project',{
    useNewUrlParser: true,
})
    console.log(`Successfully Connected To MongoDB`);
    }
catch(e){
    console.log(`no connection`);
}};
module.exports=connectDB;