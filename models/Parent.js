const {Schema, model, Types} = require('mongoose')

const schema = Schema({
    userId: {type: Types.ObjectId, ref: 'User', unique: true},
    parentName: {type: String, required: true},
    childName: {type: String, required: true},
    childAge: {type: Number, required: true},
    city: {type: String, required: true},
    salary: {type: Number, required: true},
    description: {type: String, required: true}
})

module.exports = model('Parent', schema)