// const { param } = require("../routes/items.routes");

//test fake data
// const menus=[
//     {id: 1,name: 'fried rice',price: 10},
//     {id: 2,name: 'fried noodles', price: 10},
//     {id: 3,name: 'fish', price: 3}
// ];
const Menu=require("../models/Menu");
const fs=require("fs");
const path=require("path");
//interface: menus-show
exports.getAllMenus=async(req,res)=>{
    try{
        const menus=await Menu.find();
        res.json(menus);
    }catch(err){
        res.status(500).json({message:"Failed to fetch menus",error:err});
    }
};
//interfact: findMenusById
exports.getMenusById=async(req,res)=>{
    try {
        const menu=await Menu.findById(req.params.id);
        if(!menu){
            return res.status(404).json({error:"menu not found"});
        }
        res.json(menu);
    } catch (error) {
        return res.status(400).json({error:"Invalid ID format",details:err.message});
    }
    
};
//interface: menus-add
exports.addMenus=async(req,res)=>{
    try {
        const {name,price,category,description,available}=req.body;
        const image=req.file ? `/uploads/${req.file.filename}`:null;
        console.log("hi",req.body)
        if(!name||!price){
            return res.status(400).json({message: 'name and price should not be null'});
        }
        
        const newMenu=new Menu({
            name,
            category,
            price,
            description: description || ``,
            available,
            image
        });
        await newMenu.save();
        res.status(201).json({message:'New dish successfully added',menu:newMenu});
    } catch (err) {
        res.status(500).json({message:'Failed to add menu',error:err});
    }
};
/*
test data:
{
    "name":"fried chicken",
    "category":"666",
    "price":10,
    "description":"very good",
    "available":true
}
*/
//interface: menus-delete
exports.deleteById = async (req, res) => {
    try {
      const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
      if (!deletedMenu) {
        return res.status(404).json({ message: "Menu not found" });
      }

      if (deletedMenu.image) {
        const imagePath = path.join(__dirname, "..", deletedMenu.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
  
      res.json({ message: "Dish successfully deleted", menu: deletedMenu });
    } catch (err) {
      res.status(400).json({ error: "Invalid ID format", details: err.message });
    }
  };
  
//interface: menus-update

exports.updateById = async (req, res) => {
    try {
      const { name, price, category, description, available } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
  
      const oldMenu = await Menu.findById(req.params.id);
      if (!oldMenu) {
        return res.status(404).json({ message: "Menu not found" });
      }
  
      if (image && oldMenu.image) {
        const oldPath = path.join(__dirname, "..", oldMenu.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath); // delete
        }
      }
  
      // update
      const updatedMenu = await Menu.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          category,
          description,
          available,
          ...(image && { image }) 
        },
        { new: true }
      );
  
      res.json({
        message: `Menu with ID ${req.params.id} has been updated`,
        menu: updatedMenu
      });
    } catch (err) {
      res.status(400).json({ error: "Invalid ID format", details: err.message });
    }
  };

exports.get=async(req, res) => {
  res.send('Hello from backend!');
};