import express from "express";
import mongoose from "mongoose";


const itemSchema ={
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
   name: "Welcome to your todoList!" 
  });

const item2 = new Item({ 
  name: "Hit the + button to add a new item."
 });

const item3 = new Item({
   name: "<-- Hit this to delete an item."
   });


const defaultItems = [item1, item2, item3];

const listSchema ={
  name :String,
  items:[itemSchema]
}

const List = mongoose.model("List",listSchema)


export  {Item,defaultItems,List}