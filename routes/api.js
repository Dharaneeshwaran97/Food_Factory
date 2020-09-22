const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

const User = require("../models/userModule");
const Food = require("../models/foodModule");
const Order = require("../models/orderModule");
const Ingredients = require("../models/ingredientsModule");

module.exports = app => {
    // Create a New User 
    app.post("/createUser", req, res => {
        // user entered values :  Name,Email,Address,Phone,Password
        // req.body.status : it's default value Not entered by user 
        let data = req.body;
        // Encrypt the user password and store the different string. It is not identify  unauthorized person 
        request.body.password = Bcrypt.hashSync(request.body.password);

        let userDetails = new User({
            ...data
        });
        //  Store the req.body values into User collection
        userDetails.save().then(details => {
            if (details) {
                return res.send('User Added Successfully');
            } else {
                return res.send('User Not Added ');
            }
            // Its show an error to not able to save users value
        }).catch(err => {
            console.log("User save error", err);
        });

    })

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
                return res.send('Food Added Successfully');
            } else {

                return res.send('Food Not Added ');
            }
            // Its show an error to not able to save food value
        }).catch(err => {
            console.log("Food save error", err);
        });

    })

    // Create a foodIngredients
    app.post("/createIngredients", req, res => {
        // req.body values : IngredientName,Quantity,vendorName
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

    })
    // Login to app using users Email, password
    app.post('/login', req, res => {
        // to change the normal string to encrypt password
        request.body.password = Bcrypt.hashSync(request.body.password);
        // check the user input and stored data values if it is match allow to login otherwise show an error 
        // Got a email and password to the user
        User.findOne({
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


    // to set a resetpassword based on user email id
    app.post('/resetPassword', req, res => {

        //req.body got a users email and password

        request.body.password = Bcrypt.hashSync(request.body.password);  // this code to encrtpted the users password

        // to find the users based on email id and change the encrtpted password
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

    // Deactivated the users status 
    app.post('/deActivateUser/:userId', req, res => {
        // req.params get into login user
        let data = req.params.id;
        //search the user id based user and update the status Activate into Deactive
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

    // create food order to particular user
    app.post('/createOrder/:userId', req, res => {
        //  passed the userId or req.params to the app url
        let userId = req.params.id;
        // req.body values entered in users 
        let Name = req.body.foodName;
        let Quantity = req.body.foodQuantity
        const value = new Order({
            FoodName: Name,
            FoodQuantity: Quantity,
            UserId: userId,
        });
        // save the order to order collection
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
    // Get all orders in order collection
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

    // get a purchased Ingredients to same vendor
    app.post('/getSameVendor', req, res => {
        // to got a vendor name into user 
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

    // get a all available ingredients to stack
    app.post('/getAvailableIngredients ', req, res => {
        // got the thresholdQuantity to the user input
        let data = req.body.thresholdQuantity;
        // get the Ingredients quantity less than the thresholdQuantity
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

    // get the production  cost higher than  selling cost
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