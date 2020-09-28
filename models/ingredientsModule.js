const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientsSchema = new Schema({
    name: { type: String, default: "" },
    lotNumber: { type: Number, unique: true },
    availableQuantity: { type: Number, default: "" },
    thresholdQuantity: { type: Number, default: "" },
    price: { type: Number, default: "" },
    vendorName: { type: String, default: "" },
    vendorEmail: { type: String, default: "" },

}, { collection: "ingredients" });

mongoose.model("ingredients", ingredientsSchema);