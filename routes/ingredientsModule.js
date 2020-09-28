const mongoose = require("mongoose");
const Ingredients = require("../models/ingredientsModule");


module.exports = app => {

    // Create a foodIngredients
    app.post("/createIngredients", req, res => {
        // req.body values : name,name,availableQuantity,thresholdQuantity,price,vendorName,vendorEmail
        let data = req.body;
        let ingredientsValues = new Ingredients({
            ...data
        });
        // Store the req.body values into Ingredients collection
        ingredientsValues.save().then(details => {
            if (details) {
                return res.send('Ingredients Added Successfully');
            } else {

                return res.send('Ingredients Not Added ');
            }
            // Its show an error to not able to Ingredients food value

        }).catch(err => {
            console.log("Ingredients save error", err);
        });

    });


    // get a Ingredients details
    app.get("/getAllIngredients", req, res => {
        //Get all Ingredients values in Ingredients collection
        Ingredients.find().then(info => {
            if (info) {
                return res.json({ info, status: 200, type: 'Success' })
            } else {
                return res.send(`Not able to find all Ingredients`);
            }
        }).catch(err => {
            console.log(" Ingredients Find error", err);
        })

    });



    // Update the Ingredients 
    app.post('/updateIngredients/:ingredientsId', req, res => {
        // req.params get into clicked ingredientsId
        let data = req.params.ingredientsId;
        //search the Ingredients id based Ingredients and update the values
        Ingredients.findOneAndUpdate({ "_id": data }, req.body, function (err, values) {
            if (values) {
                return res.json({ values, status: 200, type: 'Success' })

            }
            else {
                res.send(err, "Not Update Ingredients");
                throw err;
            }
        }).catch(err => {
            console.log("Ingredients Update error", err);
        });
    });


    // Find a particular Ingredients and delete
    app.get("/removeIngredients/:ingredientsId", req, res => {
        let { id } = req.params.foodId;

        //find IngredientsId based to remove the  values in Ingredients collection
        Ingredients.findByIdAndDelete({ _id: id })
            .then(details => {
                if (details) {
                    return res.json({ details, status: 200, type: 'Success' })
                } else {
                    return res.send('Something went wrong please try after sometime')
                }
            }).catch(err => {
                console.log("Ingredients delete error", err);
            });
    });


    // get a purchased Ingredients to same vendor
    app.post('/getSameVendor', req, res => {
        // user insert the vendername 
        let vendorName = req.body.vendorName;
        // to got a vendor name into user 
        Ingredients.find({
            vendorName: vendorName,
        }, (err, vendorName) => {
            if (err) {
                console.log("Get Vendors Name Not Success");
                throw err;
            } else {
                res.json(vendorName);
                console.log("Get Vendors Name Successfully ");
            }
        }).catch(err => {
            console.log("Vendors Get error", err);
        });
    });


    // get a all available ingredients to stack
    app.post('/getAvailableIngredients ', req, res => {
        // got the thresholdQuantity to the user input
        let data = req.body.thresholdQuantity;
        // get the Ingredients quantity less than the thresholdQuantity
        Ingredients.find({
            availableQuantity: { $lt: data }
        }, (err, availableQuantity) => {
            if (err) {
                console.log("Get Vendors Name Not Success");
                throw err;
            } else {
                res.json(availableQuantity);
                console.log("Get Vendors Name Successfully ");
            }
        }).catch(err => {
            console.log("Ingredients get error", err);
        });
    });




}