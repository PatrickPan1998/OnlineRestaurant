const express=require("express");
const router =express.Router();
const itemController=require("../controllers/items.controllers");
const authenticate=require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/",itemController.get);
router.get("/menus",itemController.getAllMenus);
router.post("/addMenus",upload.single("image"),authenticate,itemController.addMenus);
router.delete("/deleteById/:id",authenticate,itemController.deleteById);
router.get("/getMenusById/:id",itemController.getMenusById);
router.put("/updateById/:id",upload.single("image"),authenticate,itemController.updateById);
module.exports=router;

