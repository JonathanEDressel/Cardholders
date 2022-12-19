const {check, validationResult} = require('express-validator/check');
const express = require("express")
const app = express()
const mongoose = require("mongoose") 
const cardholderModel = require("./models/Cardholder")

//allows us to connect to the front-end
const cors = require("cors");

const port = process.env.PORT || 8000;
app.use(express.json())
app.use(express.static('public'));
app.use(cors())

//establishes connection to database
mongoose.connect("mongodb+srv://dresselj:Nd9OpZURvwOgspTB@cardholders-cluster.mvcvbj2.mongodb.net/?retryWrites=true&w=majority")

//get all cards
app.get("/", async function (req, res) {
    cardholderModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get("/getCards/:businessName", async function (req, res) {
    const name = req.params.businessName

    const obj = await cardholderModel.findOne({ businessName:name })
    if(obj) {
        res.json(obj)
    }
    else {
        res.json("Cannot find specified card")
    }
})

app.put("/:businessName", async function (req, res) {
    let obj = await cardholderModel.findOneAndUpdate(
    {
        businessName: req.params.businessName,
    },
    {
        businessName: req.body.businessName,
        phoneNumber: req.body.phoneNumber,
        ceoName: req.body.ceoName,
        numberEmployees: req.body.numberEmployees
    })

    res.json(obj)
})

app.post("/createCards", async function (req, res) {
    const card = req.body
    const newCard = await cardholderModel.create(card)

    res.json(card)
})

app.delete("/deleteCard/:name", async function (req, res, next) {
    const obj = await cardholderModel.findOneAndDelete({businessName: req.params.name }).exec()
    if(obj) {
        res.json(obj)
    }
    else {
        res.json(obj)
    }
})

//starting the server
app.listen(port, () => {
    console.log("-- starting on PORT: ", port)
});

app.use('*', function (req, res, next) {
    res.json({
      error: "Requested resource " + req.originalUrl + " does not exist"
    });
});