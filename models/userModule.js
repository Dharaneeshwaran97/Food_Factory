
const express = require("express");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    Name: { type: String, default: "" },
    Email: { type: String, unique: true },
    Address: { type: String, default: "" },
    Phone: { type: Number, default: "" },
    Password: { type: String, default: "" },
    Status: { type: String, default: "Active" },
    lastLoginAt: { type: Date, default: "" }

}, { timestamps: true });

mongoose.model("user", userSchema);


