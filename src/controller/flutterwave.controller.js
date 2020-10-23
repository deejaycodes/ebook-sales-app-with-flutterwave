const dotenv = require('dotenv');
const axios = require('axios');
const flutterwaveService = require('../services/flutterwave.services')


dotenv.config();

class FlutterwaveController {
        
    async Verify(req, res) {
      try {
      
      const verifyTransaction = await axios({
        url: "https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({txref: req.body.txref, SECKEY: process.env.SECRET_KEY})
      })
        const data =  verifyTransaction.data
        let a = data.status
        let b= data.data.chargedamount
        let c= data.data.amount
        if(a == "success" && b>=c){
          console.log('You paid indeed')
          console.log(data.data.chargedamount)
        }else{
          console.log('stop')
        }
        const newUser = {
          name: data.data.custname,
          email:data.data.custemail,
          phone:data.data.custphone
        }

        console.log(newUser)
        await flutterwaveService.addCustomerRecord(newUser)
        await flutterwaveService.addTransactionRecord(verifyTransaction.data)
        
         console.log("finally: " , data.status)
         
     
      res.redirect('/flutterwave/success')
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }

     async Customers(req, res) {
    try {
      
      const getCustomers =   await flutterwaveService.getCustomerRecord()
     
      return res.status(200).json({
        status: 200,
        data: getCustomers
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }


  async successpage(req,res){
    return res.send({
      email:'customer_email',
    })

  }
   async Transactions(req, res) {
    try {
      
      const getTransactions =   await flutterwaveService.getTransactionRecord()
     
      return res.status(200).json({
        status: 200,
        data: getTransactions
      });

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        status: 400,
        error: "Not verified",
      });
    }
  }
}

const flutterwaveController = new FlutterwaveController()
module.exports =  flutterwaveController;