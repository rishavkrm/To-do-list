const express = require('express')
const List = require('./../models/listModel')
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const authController = require('./../controller/authController');


const Router = express.Router()

Router.route('/')
.get(authController.protect,catchAsync(async(req,res,next)=>{
    const user = req.user;
    const id = user.id;
    // console.log("🤨id:"+id)
    const list = await List.findOne({owner:id});
    // console.log("🤨list:"+list)
    const newListItems = list.content;
    var today = new Date();
    var day = today.getDay();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();
    days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    res.render("list",{dayName:(days[day-1]+","+date+"/"+month+"/"+year), newListItems:newListItems,"loginORlogout":'LOGOUT'});}))
.post(authController.protect,catchAsync(async(req,res,next)=>{
    const user = req.user;
    const id = user.id;
    const list = await List.findOne({owner:id});
    const listArray = list.content;
    newAddedItem = req.body.todo_new;
    // console.log("🤨id:"+list)
    listArray.push(newAddedItem);
    await List.updateOne({owner:id},{content:listArray})
    // console.log("🤨id:"+list)
    res.redirect("/");}))

module.exports = Router