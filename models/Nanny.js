const {Schema, model, Types} = require('mongoose')

const schema = Schema({
    userId: {type: Types.ObjectId, ref: 'User', unique: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    city: {type: String, required: true},
    salary: {type: Number, required: true},
    description: {type: String, required: true}
})

module.exports = model('Nanny', schema)