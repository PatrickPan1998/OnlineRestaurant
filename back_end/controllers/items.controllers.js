// const { param } = require("../routes/items.routes");

//test fake data
// const menus=[
//     {id: 1,name: 'fried rice',price: 10},
//     {id: 2,name: 'fried noodles', price: 10},
//     {id: 3,name: 'fish', price: 3}
// ];
const Menu=require("../models/Menu");
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
    const {name,price,category,description,available}=req.body;
    if(!name||!price){
        return res.status(400).json({message: 'name and price should not be null'});
    }
    try {
        const newMenu=new Menu({
            name,
            category,
            price,
            description: description || ``,
            available
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
exports.deleteById=async(req,res)=>{
    const id =Number(req.params.id);
    const index=menus.findIndex(menu=>menu.id === id);
    if(!Number.isInteger(id)){
        return res.status(400).json({error:"Invalid ID format"});
    }
    if (index==-1){
        return res.status(404).json({message:'not found'});
    }
    const deleteMenu=menus.splice(index,1)[0];
    res.json({message:'dish successfully deleted'});
};
//interface: menus-update
exports.updateById=async(req,res)=>{
    const id = Number(req.params.id);
    const updateData=req.body;
    const index=menus.findIndex(menu=>menu.id === id);
    if(index==-1){
        return res.status(404).json({message:"menu not found"});
    }
    menus[index]={id, ...updateData};
    res.json({
        message:"Menu with ID ${id} has been updated",
        menu:menus[index]
    });
};

exports.get=async(req, res) => {
  res.send('Hello from backend!');
};