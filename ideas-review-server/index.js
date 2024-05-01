import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

// Load environment variables
dotenv.config();

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});










































// // index.js
// const express = require('express');
// const cors = require('cors') 
// const dotenv = require("dotenv")

// dotenv.config()
// const app = express();
// const PORT = process.env.PORT || 8080;

// // Middleware to parse JSON bodies

// app.use(express.json());
// app.use(
//     express.urlencoded({
//       extended: true,
//       limit: "16kb",
//     })
//   );
// // app.use(cookieParser());
// app.use(cors())
// // POST endpoint for /verifyauth
// app.post('/verifyauth', async (req, res) => {
//   const { code } = req.body;
//   console.log(code);

//   // Here you would handle the authentication verification process
//   // For example, exchanging the code for an access token and validating it


// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
