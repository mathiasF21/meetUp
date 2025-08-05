import express from "express";
import { connectToDatabase } from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all events.
router.get("/", async (req, res) => {
    try {
        const db = await connectToDatabase();
        let collection = db.collection("events");
        let events = await collection.find({}).toArray();
        res.send(events).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error fetching events");
    }
});

// Get a single event by id.
router.get("/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        let collection = db.collection("events");
        let query = {_id: new ObjectId(req.params.id) };
        let event = await collection.findOne(query);

        if(!event) res.send("Event not found").status(404);
        else res.send(event).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error fetching event");
    }
});

// Create a new event.
router.post("/", async (req, res) => {
    try {
        const db = await connectToDatabase();
        let newEvent = {
            name: req.body.name,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            image: req.body.image,
            tags: req.body.tags,
            createdBy: req.body.createdBy,
        };

        let collection = db.collection("events");
        let result =  await collection.insertOne(newEvent)
        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error adding event")
    }
});

// Update an event by id.
router.patch("/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query =  { _id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                name: req.body.name,
                description: req.body.description,
                date: req.body.date,
                location: req.body.location,
                image: req.body.image,
                tags: req.body.tags,
                createdBy: req.body.createdBy,
            },
        };
        let collection = db.collection("events");
        let result =  await collection.updateOne(query, updates);
        
        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error updating event");
    }
});

// Delete an event by id.
router.delete("/:id", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const query = { _id: new ObjectId(req.params.id)};

        const collection = db.collection("events");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error deleting event");
    }
})



export default router;