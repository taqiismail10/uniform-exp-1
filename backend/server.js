import "dotenv/config";
import express from "express";
const app = express()
const PORT = process.env.PORT || 1000
// Wafi509

// * Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    return res.json({ message: "Hello, it's working..." });
});

import ApiRoutes from "./routes/api.js";
app.use("/api", ApiRoutes);



app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))