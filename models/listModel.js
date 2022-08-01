const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    content:{
        type:[String],
        default:[]
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }
});
  
  const List = mongoose.model('List', listSchema);
  module.exports = List;