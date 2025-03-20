const express=require("express");
const router =express.Router();
const itemController=require("../controllers/items.controllers");

router.get("/menus",itemController.getAllMenus);
router.post("/addMenus",itemController.addMenus);
router.delete("/deleteById/:id",itemController.deleteById);
router.get("/",itemController.get);
router.get("/getMenusById/:id",itemController.getMenusById);
router.put("/updateById/:id",itemController.updateById);
module.exports=router;

