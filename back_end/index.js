const express = require('express');
const app = express();
const port = 5000;

// Cross domain processing
const cors=require('cors');
app.use(cors());

//Parse JSON request body
app.use(express.json());
const itemRoutes=require("./routes/items.routes");
app.use("/items",itemRoutes);
const userRouter=require("./routes/users.routes");
app.use("/",userRouter);

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
