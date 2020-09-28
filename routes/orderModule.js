const mongoose = require("mongoose");

const Order = require("../models/orderModule");

module.exports = app => {

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

    });

    // Get all orders in order collection
    app.get('/getOrders', req, res => {
        Order.find(), function (err, orderValues) {
            if (err) {
                console.log("Order not found...");
                throw err;
            } else {
                res.send("To Get order successfully");
                return res.json(orderValues);
            }
        }
    });



    // Update the Order 
    app.post('/updateOrder/:orderId', req, res => {
        // req.params get into clicked orderId
        let data = req.params.orderId;
        //search the orderId based order and update the values
        Order.findOneAndUpdate({ "_id": data }, req.body, function (err, values) {
            if (values) {
                return res.json({ values, status: 200, type: 'Success' })

            }
            else {
                res.send(err, "Not Update Order");
                throw err;
            }
        }).catch(err => {
            console.log("Update Order error", err);
        });
    });


    // Find a particular Order and delete
    app.get("/removeOrder/:orderId", req, res => {
        let { id } = req.params.foodId;

        //find orderId based to remove the  values in order collection
        Order.findByIdAndDelete({ _id: id })
            .then(details => {
                if (details) {
                    return res.json({ details, status: 200, type: 'Success' })
                } else {
                    return res.send('Something went wrong please try after sometime')
                }
            }).catch(err => {
                console.log("Order delete error", err);
            });
    });



}