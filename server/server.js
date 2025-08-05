import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import events from "./routes/events.js";

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/events", events);

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});