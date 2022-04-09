const mongoose= require("mongoose");

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    useNewURLParser: true,
    useUnifiedTopology:true
}
).then(()=>{
    console.log("you have successfully connected to the database")
}).catch((err)=>{console.log("there was a problem connecting to the database",err)})