const mongoose=require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
const Listing=require('../models/listing.js');
const initData=require("./data.js");
async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB=async ()=>{
    await Listing.deleteMany();
    initData.data=initData.data.map((obj)=>({...obj,owner:"689b1684951fd9fc24712776"}));
    await Listing.insertMany(initData.data);
    console.log('DataBase is initilized');
}
initDB();