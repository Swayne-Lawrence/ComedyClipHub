const UserCon= require("../controllers/user.controller");
const {authenticate}=require("../config/jwt.config");


module.exports=(app)=>{
    app.post("/api/users/register", UserCon.register);
    app.post("/api/users/login", UserCon.login);
    app.post("/api/users/logout", UserCon.logout);
    app.get("/api/users/logged",authenticate, UserCon.getLoggedUser);
    app.get("/api/users/:id", authenticate, UserCon.findOneUser);
    app.get("/api/users",authenticate, UserCon.findAllUsers);
    app.put("/api/users/:id",authenticate,  UserCon.updateUser);
    app.delete("/api/users/:id",authenticate, UserCon.deleteUser);
}