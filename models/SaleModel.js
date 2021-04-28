const mongoose = require('mongoose');
const express = require('express');

const url = process.env.ATLAS_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const SaleSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    title : {
        type: String,
        required:true 
    },
    seller:{
        type :String,
        required: true
    },
    amount:{
        type: Number,
        required:true
    },
    price:{
        type:String,
        required:true
    }

});
const Sale = mongoose.model("sale", SaleSchema);

module.exports = Sale;
