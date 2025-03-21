const express = require('express');
const app = express();
const port = 5000;
const dotenv=require("dotenv");
dotenv.config();
const connectDB=require('./config/db');
connectDB();
// Cross domain processing
const cors=require('cors');
app.use(cors());

//test
console.log("Mongodb uri: ",process.env.MONGO_URI);
console.log("JWT SECRET: ",process.env.JWT_SECRET);

//Parse JSON request body
app.use(express.json());
const itemRoutes=require("./routes/items.routes");
app.use("/items",itemRoutes);
const userRouter=require("./routes/users.routes");
app.use("/",userRouter);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
