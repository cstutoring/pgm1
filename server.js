var express = require("express");//talk to the webborwser  to the node.js, require: loads in the files.

var path = require("path");

const bp = require("body-parser");

const cors = require("cors");

const restaurantDB = require("./modules/restaurantDB.js"); //reading the file in

const db = new restaurantDB();//makes the restaurant object

var app = express();//make the express object to use get/post

app.use(express.static('public'));

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(cors());// teel the express to use the cors



app.get("/", (req, res) => {//default



    res.json({ message: "API Listening" });



});



db.initialize('mongodb+srv://dbUser:Seneca2021@cluster0.yhdwf.mongodb.net/sample_restaurants?retryWrites=true&w=majority').then(() => {

    app.listen(HTTP_PORT, () => {

        console.log(`server listening on: ${HTTP_PORT}`);

    });

}).catch((err) => {

    console.log(err);

});





app.post("/api/restaurants", (req, res) => {

    data = db.makeData();

    //var result = db.addNewRestaurant(req.body);

    var result = data;

    console.log(JSON.stringify(result));

    if (result != null) {

        res.status(201).json({ message: "New Restaurant created" });

    }

    else {

        res.status(400).json({ message: "New Restaurant not created" });

    }





});



app.get("/api/test", async (req, res) => {

    data = await db.makeData();

    var result = await db.addNewRestaurant(data);

    var result = data;

    console.log(JSON.stringify(result));

    if (result != null) {

        res.status(201).json({ message: "New Restaurant created" });

    }

    else {

        res.status(400).json({ message: "New Restaurant not created" });

    }





});





app.get("/api/restaurants", async (req, res) => {

    console.log(req.query.page, req.query.perPage, req.query.borough);

    return res.json(await db.getAllRestaurants(parseInt(req.query.page), parseInt(req.query.perPage), req.query.borough));





});



app.get("/api/restaurants/:id", async(req, res) => {

    console.log(req.params.id);

    try {
        let restaurantName = await db.getRestaurantById(req.params.id);

        if (restaurantName) {

            res.json(restaurantName);

        } else {

            res.status(404).json({ message: "no restaurant name found" })

        }
    }
    catch
    {
        console.log("ERROR");
    }



});



app.put("/api/updateRestaurantById/:id", async(req, res) => {

    if (await db.updateRestaurantById(req.params.id, req.body)) {

        res.json({ message: "Restaurant name updated successfully" });

    } else {

        res.status(404).json({ message: "no Restaurant name found" });

    }

});



app.delete("/api/deleteRestaurantById/:id", async (req, res) => {

    if (await db.deleteRestaurantById(req.params.id)) {

        res.json({ message: "Restaurant name deleted successfully" });

    } else {

        res.status(404).json({ message: "no Restaurant name found" });

    }







});



app.get("/api/getAllUsers", async (req, res) => {

    res.json(await db.getAllUsers());

});