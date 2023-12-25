import express from "express"
import {Item,defaultItems,List} from "../Models/ToDolistModel.js"
import mongoose from "mongoose";
import _ from "lodash"


const router = express.Router();



router.get("/", function (req, res) {
    // Find all items in the database and render them
  
  
    Item.find({}).then(function(FoundItems){
      if(FoundItems.length === 0){
  
        Item.insertMany(defaultItems)
        .then(function () {
          console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
          console.log(err);
        });
       res.redirect("/");
      } else{
        // const day = date.getDate();
        res.render("list", {kindOfDay: "Today" , newItem:FoundItems});
  
      }
    })
     .catch(function(err){
      console.log(err);
    })
  
  });
  
  
router.get('/:customListName', function(req, res) {
    const customListName = _.capitalize(req.params.customListName);
    
    List.findOne({ name: customListName })
      .then((doc) => {
        if (!doc) {
          // List doesn't exist, create a new one
          const list = new List({
            name: customListName,
            items: defaultItems
          });
  
          list.save()
  
        
            .then(() => {
              console.log("New list created and saved!");
              res.redirect("/" + customListName);
            })
            .catch((err) => {
              console.log("Error saving the new list:", err)
              res.status(500).send("Error creating a new list.");
            });
  
          }
            else {
              console.log("List exists!");
              res.render('list',  {kindOfDay: doc.name , newItem:doc.items} ); 
            }
      })
      .catch((err) => {
        console.log("Error finding the list:", err);
        res.status(500).send("Error finding the list.");
      });
  });
  
router.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName =req.body.list ;
  
    const item = new Item({
      name: itemName
    });
  
    if(listName === "Today"){
      item.save(); 
      res.redirect("/");
    } else{
      List.findOne({name:listName})
      .then((doc)=>{
        doc.items.push(item);
        doc.save();
        res.redirect("/" + listName );
      
      }).catch((err)=>{
        console.log("Error finding the list:", err);
      })
    }
  
  });

router.post("/delete", function(req, res){
    const checkedItemId  = req.body.checkbox ;
    const listName = req.body.listName ;
  
    if(listName === "Today"){
      Item.findByIdAndDelete(checkedItemId)
      .then(function(){
        console.log("successfully deleted");
        res.redirect("/");
    })
       .catch(function(err){
        console.log(err);
       }) 
    } else{
    List.findOneAndUpdate(
     {name:listName},
     {$pull:{items:{_id:checkedItemId}}} 
    ) 
     .then(foundList=>{
      if(foundList){
        res.redirect("/" + listName ); 
      } else{
        console.log("List is not found")
      }
     }) 
     .catch(err=>{
     console.log(err)
     })   
    }
  
  });
  
router.get("/work", function (req, res) {
  
  });
  
router.get("/about", function (req, res) {
    res.render("about");
  });
export default router 