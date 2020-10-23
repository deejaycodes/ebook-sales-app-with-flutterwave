const express = require('express')
const flutterwaveController =  require('../controller/flutterwave.controller')
const router = express.Router();

//Endpoints
router.post('/verify', (req,res)=>{
    flutterwaveController.Verify(req,res)
  
})

router.get('/success', (req,res)=>{
    flutterwaveController.successpage(req,res)
})

router.post('/verifydata', (req,res)=>{
    flutterwaveController.Verifyy(req,res)
   
})

router.get('/customers', (req,res)=>{
    flutterwaveController.Customers(req,res)
})

router.get('/transactions', (req,res)=>{
   flutterwaveController.Transactions(req,res)
})



module.exports = router;


