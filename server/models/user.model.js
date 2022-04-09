const mongoose= require("mongoose");
const bcrypt= require("bcrypt");

const UserSch= new mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please enter a username"],
        maxlength:[20,"Username cannot be more then 20 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    password:{
        type:String,
        required:[true,"Please enter a password"],
        minlength:[8,"Password must be more then 8 characters"]
    },
    profilePic:{
        type:String,
        minlength:[10,"Enter proper url"]
        
    }
},{timestamps:true});

UserSch.virtual("confirmPassword")
.get(()=>this._confirmPassword)
.set((value)=>this._confirmPassword=value);

UserSch.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword","Passwords must match")
    }
    next();
})

UserSch.pre("save",function(next){
    bcrypt.hash(this.password,10)
    .then((hashed)=>{
        this.password=hashed;
        next();
    })
})

const User = mongoose.model("User",UserSch)

module.exports=User;