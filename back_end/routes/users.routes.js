const express=require("express");
const router =express.Router();
const userController=require("../controllers/users.controllers");

router.post("/user/register",userController.register);
router.post("/user/login",userController.login);
router.get("/user/me",userController.getUser);

module.exports=router;
