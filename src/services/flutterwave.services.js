const User = require('../models/Users')
const Transaction = require('../models/Transactions')

class UserService {
  
    async addCustomerRecord(data){
      return User.create(data)
    }

    async addTransactionRecord(data){
      return new Transaction(data)
    }

    async getCustomerRecord(data){
      return User.findOne(data)
    }

    async getTransactionRecord(data){
      return Transaction.findOne(data)
    }
  
  
}

const userService = new UserService()
module.exports = userService