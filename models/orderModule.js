const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderNum: { type: Number, unique: true },
    FoodName: { type: String, default: "" },
    FoodQuantity: { type: String, default: "" },
    status: { type: String, default: "Ordered" },
    orderDate: { type: Data, default: "" },
    dateOfdelivery: { type: Date, default: "" },
    modeOfTransport: { type: String, default: "" },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { colection: "orderFood" });
mongoose.model("orderFood", orderSchema);