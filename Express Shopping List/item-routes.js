const express = require("express")
const itemsRoutes = new express.Router()
const ExpressError = require("./expressError.js")
const items = require("./fakeDb.js")

itemsRoutes.get("/", function(req, res) {
  return res.send(items);
})

itemsRoutes.post("/", function(req, res) {
  let body = req.body;
  console.log("The body is", body)
  items.push(body);
  return res.json({"added": body});
})

itemsRoutes.get("/:name", function(req, res, next) {
  let name = req.params.name;
  
  try {
    const item = items.find(i => (
      i.name === name
    ));
    if(!item) throw new ExpressError(`${name} not found`, 404);
    return res.json({item});
  } catch (err) {
    return next(err);
  }
})

itemsRoutes.patch("/:name", function(req, res, next) {
  let name = req.params.name;
  let body = req.body;
  
  try {
    const item = items.find(i => (
      i.name === name
      ));
      
      if(!item) throw new ExpressError(`${name} not found`, 404);
      
      let idx = items.indexOf(item);
      items[idx] = body;
      return res.json({"updated": body});
    
  } catch (err) {
    return next(err);
  }
})

itemsRoutes.delete("/:name", function(req, res, next) {
  let name = req.params.name;
  
  try {
    const item = items.find(i => (
      i.name === name
      ));
      
      if(!item) throw new ExpressError(`${name} not found`, 404);
      
      let idx = items.indexOf(item);
      items.splice(idx, 1);
      return res.json({"message": "deleted"});
    
  } catch (err) {
    return next(err);
  }
})

module.exports = itemsRoutes;