const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const app = express()

app.use(express.json()) //middleware
app.use(express.urlencoded({extended: false})) //middleware

app.get('/', (req, res)=> {
    res.send("node is running at 3000 ")
})

//to read a user
app.get('/api/users', async (req, res)=> {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/api/user/:id', async (req, res)=> {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//to create a user

app.post('/api/user',async (req, res)=>{
    try {
        const user =  await User.create(req.body);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

//to update a user

app.put('/api/user/:id', async (req,res)=> {
    try {
      const {id} = req.params;
      const user = await User.findByIdAndUpdate(id, req.body);
      if(!user){
        return res.status(400).json({messsage: "user not found"})
      } 

      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// to delete user

app.delete('/api/user/:id', async(req, res) => {
    try {
        const {id}= req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).json({message: "user not found"})
        }
        res.status(200).json({message: "user deleted successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect("mongodb+srv://arshanashraf2002:BiqCWqkEmEdnPFCM@backendapi.resnr.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendAPI")
.then(()=> {
    console.log("connected to database");
    app.listen(3000,()=>{
        console.log("server is running at port 3000");
        
    })
    
})
.catch(()=> {
    console.log("connection failed!!");
    
})