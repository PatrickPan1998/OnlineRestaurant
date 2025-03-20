// const { param } = require("../routes/items.routes");

//test fake data
const menus=[
    {id: 1,name: 'fried rice',price: 10},
    {id: 2,name: 'fried noodles', price: 10},
    {id: 3,name: 'fish', price: 3}
];
//interface: menus-show
exports.getAllMenus=(req,res)=>{
    res.json(menus);
};
//interfact: findMenusById
exports.getMenusById=async(req,res)=>{
    console.log("Raw ID",req.params.id);
    const id = Number(req.params.id,10);
    if(!Number.isInteger(id)){
        return res.status(400).json({error:"Invalid ID format"})
    }
    const menu=menus.find(menu=>menu.id==id);
    if(!menu){
        return res.status(404).json({error:"id does not exist"});
    }
    res.json(menu);
    
};
//interface: menus-add
exports.addMenus=async(req,res)=>{
    const {name,price,description}=req.body;
    if(!name||!price){
        return res.status(400).json({message: 'name and price should not be null'});
    }
    const newMenu={
        id: menus.length+1,
        name,
        price,
        description: description || ``
    };
    menus.push(newMenu);
    res.status(201).json({message:'new dish successfully added',menu:newMenu});
};
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