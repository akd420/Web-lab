const express = require("express")
const bodyParser = require('body-parser');
const APIApp = express()


const Product = require('./model/productModels')
const mongoose = require('mongoose');
const product = require("./model/productModels");

APIApp.use(bodyParser.json());
APIApp.use(express.urlencoded({extended:false}))

APIApp.get('/Product/',async(req,res)=>{
    try{
        const product = await Product.find({})
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


APIApp.get('/Product/:productId',async(req,res)=>{
    try{
        const{productId} = req.params
        const product = await Product.findOne({productId})
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

APIApp.patch('/Product/:productId',async(req,res)=>{
    try{
        const{productId} = req.params
        const product = await Product.findOne({productId})
        if (!product) {
            return res.status(404).json({ message: `Product not found of ${productId}` });
        }

        const updates = req.body;

        
        Object.assign(product, updates);
        await product.save();
        
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

APIApp.post('/Product/',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        if(product){
            return res.status(200).json({"message": "Product already exists"});
        }
        res.status(200).json({product})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


APIApp.delete('/Product/:productId',async(req,res)=>{
    try{
        const{productId} = req.params
        const product = await Product.findOneAndDelete({productId})
        if (!product) {
            return res.status(404).json({ message: `Product not found of ${productId}` });
        }
        res.status(200).json({message:`product is successfully deleted`})
        
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

mongoose.connect('mongodb://127.0.0.1:27017')
.then(()=>{
    console.log('connected to mongodb')
    APIApp.listen(3000,()=>{

        console.log("server is running")
    })
    
}).catch(err=>console.log(err))