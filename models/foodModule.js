const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    foodName: { type: String, default: "" },
    foodRate: { type: String, default: "" },
    foodProductionCost: { type: Number, default: "" },
    foodSellingCost: { type: Number, default: "" }

}, { collection: "food" });

mongoose.model("food", foodSchema);
