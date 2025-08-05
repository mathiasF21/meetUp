import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`);
});