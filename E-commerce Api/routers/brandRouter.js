const express = require("express");

const router=express.Router()
const brandCtr=require('../controller/brandCtr')
const brandValidator=require('../validators/brandValidator')



router.post('/create',brandValidator.createBrandValidator,brandCtr.createOne)
router.get('/get',brandValidator.getBrandValidator,brandCtr.readOne)
router.put('/update',brandValidator.updateBrandValidator,brandCtr.updateOne)
router.delete('/delete',brandValidator.deleteBrandValidator,brandCtr.deleteOne)


module.exports=router


