const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require("./db/index");
const userRouter = require("./Routes/user routes/index");
const teamRouter = require("./Routes/Team/index");

console.log("check 1");

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
console.log("check 2");

connectDb();
console.log("check 3");

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(teamRouter); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
