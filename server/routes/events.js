import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
    let collection = await db.collection("events");
    let events = await collection.find({}).toArray();
    res.send(events).status(200);
});

// Get a single event
router.get("/:id", async (req, res) => {
    let collection = await db.collection("events");
    let query = {_id: new ObjectId(req.params.id) };
    let event = await collection.findOne(query);

    if(!event) res.send("Event not found").status(404);
    else res.send(event).status(200);
});

// Create a new event
router.post("/", async (req, res) => {
    try {
        let newEvent = {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            image: req.body.image,
            tags: req.body.tags,
            createdBy: req.body.createdBy,
        };

        let collection = await db.collection("events");
        let result =  await collection.insertOne(newEvent)
        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error adding event")
    }
});



export default router;