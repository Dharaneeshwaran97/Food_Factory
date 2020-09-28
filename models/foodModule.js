const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const foodSchema = new Schema({
    name: { type: String, default: "" },
    cuisine: { type: String, default: "" },
    costOfProduction: { type: Number, default: "" },
    sellingCost: { type: Number, default: "" },
    ingredients: { type: String, default: "" },
    lotNumber: { type: Number, unique: true }

}, { timestamps: true });

mongoose.model("food", foodSchema);
