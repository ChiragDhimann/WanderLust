const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing");

const Url="mongodb://127.0.0.1:27017/wanderLust";

main().then((res)=>{
    console.log("Database Connect");
})
.catch((err)=>{
    console.log("err");
})

async function main(){
    await mongoose.connect(Url);
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj, owner:'65e1f6521c8274327d413a37'}));
    await Listing.insertMany(initData.data);
    console.log("Data save successfully");
}

// initDB();

