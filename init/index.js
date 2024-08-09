const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


const mongoUrl = "mongodb://localhost:27017/wanderlust";
async function main(){
    await mongoose.connect(mongoUrl);
}

main()
.then(()=>{
    console.log("Connection sucessful");
})
.catch((err)=>{
    console.log(err);
})


const initDB = async()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "66a71faa1a75e9f404ebc9a3"
    }));
    await Listing.insertMany(initdata.data);
    console.log("Data was initailized...");
}

initDB()
.then(()=>{
    console.log("success..");
})
.catch((err)=>{
    console.log(err);
})