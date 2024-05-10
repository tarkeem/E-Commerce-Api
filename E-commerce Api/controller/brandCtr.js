const brand = require('../model/brand')
const factory=require('./factoryHandlers')

exports.createOne=factory.createOne(brand)
exports.readOne=factory.readOne(brand)
exports.updateOne=factory.updateOne(brand)
exports.deleteOne=factory.deleteOne(brand)