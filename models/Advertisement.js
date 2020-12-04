const {Schema, model, Types} = require('mongoose')

const schema = Schema({
    userId: {type: Types.ObjectId, ref: 'User', unique: true, required: true},
    type: {type: String, required: true},
    responds: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Advertisement', schema)