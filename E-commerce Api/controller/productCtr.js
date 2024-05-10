const factory=require('./factoryHandlers')
const product=require('../model/product')

exports.createOne=factory.createOne(product)
exports.deleteOne=factory.deleteOne(product)
exports.updateOne=factory.updateOne(product)
exports.getAll=factory.getAll(product)