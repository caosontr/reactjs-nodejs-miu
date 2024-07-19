import express from "express";
import connectDB from "./config/dbconfig.js";
import productRouter from "./routes/product.js";
import categoryRouter from "./routes/category.js";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Sử dụng CORS middleware trước khi định nghĩa các route
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(productRouter);
app.use(categoryRouter);
app.use(userRouter);

connectDB(process.env.DB_URI);

const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`Server chạy cổng ${port}`);
});
