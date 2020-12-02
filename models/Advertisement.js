const {Schema, model, Types} = require('mongoose')

const schema = Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    responds: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Advertisement', schema)