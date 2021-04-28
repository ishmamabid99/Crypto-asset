const mongoose = require('mongoose');
const express = require('express');

const url = process.env.ATLAS_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const InfoSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  symbol:{
    type:String,
    required:true
  },
  tokenPrice:{
    type:Number,
    required:true
  },
  tokenNumber:{
    type:Number,
    required:true
  },
  houseNo:{
    type:String,
    require:true
  },
  plot:{
    type:Number,
    required:true
  },
  owner:{
    type:String,
    required:true
  },
  deed:{
    type:Number,
    required:true
  },
  ward:{
    type:Number,
    required:true
  },
  roadNo:{
    type: Number ,
    required:true
  },
  postCode:{
    type: Number,
    required:true

  },
  area:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  hash:{
    type:String,
    required:true
  },
  video:{
    type:String,
    required:true
  },
  state:{
    type: Number,
    required:true
  }
});
const Info = mongoose.model("info", InfoSchema);


module.exports = Info;
