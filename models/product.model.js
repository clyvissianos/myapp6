const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Double = require('@mongoosejs/double')

const Schema = mongoose.Schema

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, 'Product is a required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    cost: {
        type: mongoose.Schema.Types.Double,
        required: [true, 'Cost is a required field'],
        max: 100
    },
    description: {
        type: String,
        max: 100
    },
    quantity: {
        type: mongoose.Schema.Types.Double,
        rewuired: [true, 'Quantity is a required field'],
        max: 100
    }
})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product', productSchema)