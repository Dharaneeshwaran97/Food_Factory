const mongoose = require("mongoose");
const User = require("../models/userModule");
const Food = require("../models/foodModule");
const Order = require("../models/orderModule");
const Ingredients = require("../models/ingredientsModule");

module.exports = app => {

    app.post("/createUser", req, res => {
        let data = req.body;
        let userDetails = new User({
            ...data
        });
        userDetails.save().then(details => {
            if (details) {
                return res.send('User Added Successfully');
            } else {

                return res.send('User Not Added ');
            }
        }).catch(err => {
            console.log("User save error", err);
        });

    })

    app.post("/createFood", req, res => {
        let data = req.body;
        let foodValues = new Food({
            ...data
        });
        foodValues.save().then(details => {
            if (details) {
                return res.send('Food Added Successfully');
            } else {

                return res.send('Food Not Added ');
            } s
        }).catch(err => {
            console.log("Food save error", err);
        });

    })

    app.post("/createIngredients", req, res => {
        let data = req.body;
        let ingredientsValues = new Ingredients({
            ...data
        });
        ingredientsValues.save().then(details => {
            if (details) {
                return res.send('Ingredients Added Successfully');
            } else {

                return res.send('Ingredients Not Added ');
            } s
        }).catch(err => {
            console.log("Ingredients save error", err);
        });

    })

    app.post('/login', req, res => {
        let data = req.body;
        User.find({
            Email: req.body.Email,
            Password: req.body.Password
        }, (err, user) => {
            if (err) {
                console.log("Please check Email and Password...");
                throw err;
            } else {
                res.send("SignUp Successfully");
            }
        }).catch(err => {
            console.log("Signup error", err);
        });
    })

    app.post('/resetPassword', req, res => {
        let date = req.body;

        User.findOneAndUpdate({ "Email": req.body.email }, { "Password": req.body.Password }, function (err, values) {
            if (values) {
                res.send("Reset Password Successfully");
            }
            else {
                console.log("Please check Email and Password...");
                throw err;
            }
        }).catch(err => {
            console.log("ResetPassword save error", err);
        });
    })

    app.post('/deActivateUser/:userId', req, res => {
        let data = req.params.id;

        User.findOneAndUpdate({ "_id": data }, { "Status": "Deactivate" }, function (err, values) {
            if (values) {
                res.send("Deactivated User Successfully");
            }
            else {
                console.log("Deactivated User Not Success");
                throw err;
            }
        }).catch(err => {
            console.log("Deactivated save error", err);
        });
    });

    app.post('/createOrder/:userId', req, res => {
        let userId = req.params.id;
        let Name = req.body.foodName;
        let Quantity = req.body.foodQuantity
        const value = new Order({
            FoodName: Name,
            FoodQuantity: Quantity,
            UserId: userId,
        });
        value.save().then(details => {
            if (details) {
                return res.send('Order Added Successfully');
            } else {
                return res.send('Order Not Added ');
            }
        }).catch(err => {
            console.log("Order save error", err);
        });

    })

    app.get('/getOrders', req, res => {
        Order.find({}), function (err, orderValues) {
            if (err) {
                console.log("Order not found...");
                throw err;
            } else {
                res.send("To Get order successfully");
            }
        }
    })

    app.post('/getSameVendor', req, res => {
        let data = req.body;
        Ingredients.find({
            vendorName: req.body.vendorName,
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
    })

    app.post('/getAvailableIngredients ', req, res => {
        let data = req.body.thresholdQuantity;
        Ingredients.find({
            Quantity: { $lt: data }
        }, (err, quantity) => {
            if (err) {
                console.log("Get Vendors Name Not Success");
                throw err;
            } else {
                res.json(quantity);
                console.log("Get Vendors Name Successfully ");
            }
        }).catch(err => {
            console.log("Ingredients get error", err);
        });
    })

    app.get('/higherCostOfProduction', req, res => {
        Food.find({ foodSellingCost: { $gte: foodProductionCost } }, (err, costValues) => {
            if (err) {
                console.log("Get CostOfProduction Not Success");
                throw err;
            } else {
                res.json(costValues);
                console.log("Get CostOfProduction Successfully ");
            }
        }).catch(err => {
            console.log("Production get error", err);
        });
    })


}