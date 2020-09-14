
const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    Name: { type: String, default: "" },
    Email: { type: String, default: "" },
    Address: { type: String, default: "" },
    Phone: { type: Number, default: "" },
    Password: { type: String, default: "" },
    Status: { type: String, default: "Active" }

}, { collection: "user" });

mongoose.model("user", userSchema);


