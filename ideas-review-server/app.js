import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import { APIResponse } from "./utils/APIResponse.js";

const app = express();

// Middleware :
app.use(express.json({
  limit:"10mb"
}));
app.use(morgan("dev"));

app.use(
  cors({

    origin: ['http://localhost:5173',"http://192.168.1.2:5173","https://htl-ideas-review.vercel.app"], 
    credentials: true, 
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    exposedHeaders: ["set-cookie"]
  })
);


app.use(
  urlencoded({
    extended: true,
    limit:"10b"    
  })
);

app.use(express.static("public"));
app.use(cookieParser());


// SYSTEM TEST ROUTE
app.get("/api/v1/test", (req, res) => {
  return res
    .status(200)
    .json(new APIResponse(200, { running: true }, "System Status Online"));
});

// ROUTES ----- IMPORT
import userRouter from "./routes/user.routes.js";

// routes
app.use("/api/v1/users",userRouter );

export { app };
