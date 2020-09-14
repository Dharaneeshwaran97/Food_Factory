const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    FoodName: { type: String, default: "" },
    FoodQuantity: { type: String, default: "" },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { colection: "orderFood" });
mongoose.model("orderFood", orderSchema);