const mongoose = require("mongoose");
const Food = require("../models/foodModule");


module.exports = app => {
    // Create a food details
    app.post("/createFood", req, res => {
        // req.body values : foodName,foodRate,foodProductionCost,foodSellingCost
        let data = req.body;
        let foodValues = new Food({
            ...data
        });
        // Store the req.body values into Food collection
        foodValues.save().then(details => {
            if (details) {
                return res.send({ details, status: 200, type: 'Success' });
            } else {

                return res.send('Food Not Added ');
            }
            // Its show an error to not able to save food value
        }).catch(err => {
            console.log("Food save error", err);
        });

    });

    // Create a food details
    app.get("/getAllFood", req, res => {
        //Get all food values in food collection
        Food.find().then(info => {
            if (info) {
                return res.json({ info, status: 200, type: 'Success' })
            } else {
                return res.send(`Not able to find all food`);
            }
        }).catch(err => {
            console.log(" Food Find error", err);
        })

    });



    // Update the foods 
    app.post('/updateFood/:foodId', req, res => {
        // req.params get into clicked foodId
        let data = req.params.foodId;
        //search the food id based food and update the values
        Food.findOneAndUpdate({ "_id": data }, req.body, function (err, values) {
            if (values) {
                return res.json({ values, status: 200, type: 'Success' })
            }
            else {
                res.send(err, "Not Update Food");
                throw err;
            }
        }).catch(err => {
            console.log("Update Food error", err);
        });
    });


    // Find a particular food and delete
    app.get("/removeFood/:foodId", req, res => {
        let { id } = req.params.foodId;

        //find foodId based to remove the  values in food collection
        Food.findByIdAndDelete({ _id: id })
            .then(details => {
                if (details) {
                    return res.json({ details, status: 200, type: 'Success' })
                } else {
                    return res.send('Something went wrong please try after sometime')
                }
            }).catch(err => {
                console.log("Food delete error", err);
            });
    });


    // get the production  cost higher than  selling cost
    app.get('/higherCostOfProduction', req, res => {
        Food.find({ foodSellingCost: { $gte: foodProductionCost } }, (err, costValues) => {
            if (err) {
                console.log("Get CostOfProduction Not Success");
                throw err;
            } else {
                console.log("Get CostOfProduction Successfully ");
                return res.json({ costValues, status: 200, type: 'Success' })
            }
        }).catch(err => {
            console.log("Production get error", err);
        });
    });

}