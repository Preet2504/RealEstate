import  express, { request, response }  from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js';

mongoose.connect("mongodb+srv://preet:Vrrp%402002@realestate.wm13rzd.mongodb.net/").then(() => {
    console.log('Connected to MongoDB!');
  }) .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
);

app.use("/api/user",userRouter);