const Person = require('../models/person.model'); 
const User = require("../models/user.models")  
  
module.exports.createpeople = (req, res) => {
    Person.create(req.body)
    .then(people=> res.json(people))
    .catch(err=>res.status(400).json(err))

  
}

module.exports.getallpeople = (req, res) => {
    Person.find({})

    .then(people=> {
        console.log(people)
        res.json(people)
    })
    .catch(err=>res.status(400).json(err))
   
}
module.exports.getpeople = (req, res) => {
    Person.findOne({_id: req.params.id})
    .then(people=> res.json(people))
    .catch(err=>res.status(400).json(err))

}



module.exports.updatepeople = (req, res) => {
    Person.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
    .then(updatedpeople=> res.json(updatedpeople))
    .catch(err=>res.status(400).json(err))

}

module.exports.deletepeople = (req, res) => {
    Person.deleteOne({_id:req.params.id})
    .then(people=> res.json(people))
    .catch(err=>res.status(400).json(err))

}
