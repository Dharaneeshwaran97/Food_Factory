const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientsSchema = new Schema({
    IngredientName: { type: String, default: "" },
    Quantity: { type: String, default: "" },
    vendorName: { type: String, default: "" },
}, { collection: "ingredients" });

mongoose.model("ingredients", ingredientsSchema);