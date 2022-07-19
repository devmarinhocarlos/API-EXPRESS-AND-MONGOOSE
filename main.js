const express = require("express"); 
const app = express();
const PORT = process.env.PORT || 3000; // port

const mongoose = require("mongoose");

app.use(express.json()); // middleware

const {Client} = require('./models/models');

// CRUD

// Read all clients
app.get("/clients", async (req, res) => {
    const allClients = await Client.find();
    return res.status(200).json(allClients);
});

// Read client for id
app.get("/clients/:id", async (req, res) => {
    const { id } = req.params;
    const client = await Client.findById(id);
    return res.status(200).json()
});

// Insert new client
app.post("/clients/add", async (req, res) => {
    const newClient = new Client({ ...req.body });
    const insertClient = await newClient.save();
    return res.status(201).json(insertClient);
})

// Update client for id
app.put("/clients/update/:id", async (req, res) => {
    const { id } = req.params;
    await Client.updateOne( { id }, req.body);
    const updateClient = await Client.findById(id);
    return res.status(200).json(updateClient);
})

// Delete client for id
app.delete("/clients/delete/:id", async (req, res) => {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    return res.status(200).json(deletedClient);
});
  

// Testing the server
app.use('/', async (req, res) => {
    return res.json({message : "Testing the server"});
});

// Create database
const start = async () => {
    // Testing connection
    try {
        // Connect to mongodb
        await mongoose.connect(
            "mongodb://localhost:27017/dbclient"
        );
        // Start server
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        }); 
    }catch (err) {
        console.error(err);
        process.exit(1);
    }
};
// Run function
start();