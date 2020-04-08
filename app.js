const express = require("express")
// const ExpressError = require("./expressError.js")

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/mean", function(req, res) {
  textNums = req.query.nums;
  console.log( "The text query was", textNums)
  nums = textNums.split(',');
  console.log( "The query array was", nums);

  let sum = 0;
  for (num of nums) {
    sum += Number(num);
  }

  let avg = (sum / nums.length);
  return res.send(`The mean of ${nums} is ${avg}.`);
})

app.listen(3000, function() {
  console.log("App on port 3000")
})