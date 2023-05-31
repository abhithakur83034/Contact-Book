const express = require('express')
var cors = require('cors')
// const Joi = require('joi');
require('./db/config');
const User = require('./db/user');
const app = express();

app.use(express.json());
app.use(cors());


app.post('/register',async(req,res)=>{
    console.log(req.body)
    try {
        const user =new User(req.body)
        const result = await user.save();
        
        res.send(result)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ result: "An error occurred" });
    }
})




app.get("/list-contact",  async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.find();
      if (user.length > 0) {
        res.send(user);
      } else {
        res.send({ result: "No result found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ result: "An error occurred" });
    }
  });




  app.delete("/delete-contact/:id", async (req, res) => {
    try {
      // console.log(req.params.id);
      const result = await User.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ result: "An error occurred" });
    }
  });


  app.get("/updatecontact/:id", async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user) {
        res.send(user);
      } else {
        res.send({ result: "No result found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ result: "An error occurred" });
    }
  });

  app.put("/updatecontact/:id", async (req, res) => {
    console.log( req.body);
    console.log(  req.params.id );
    try {
      const user = await User.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
  
      res.send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send({ result: "An error occurred" });
    }
  });

app.listen(8000)