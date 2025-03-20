const express=require("express");
const router =express.Router();
const itemController=require("../controllers/items.controllers");
const authenticate=require("../middleware/auth");

router.get("/",itemController.get);
router.get("/menus",itemController.getAllMenus);
router.post("/addMenus",authenticate,itemController.addMenus);
router.delete("/deleteById/:id",authenticate,itemController.deleteById);
router.get("/getMenusById/:id",authenticate,itemController.getMenusById);
router.put("/updateById/:id",authenticate,itemController.updateById);
module.exports=router;

