const productCtr=require('../controller/productCtr')
const express=require('express')
const productValidator=require('../validators/productValidator')
const router=express.Router()


router.post('/create',productValidator.createProductValidator,productCtr.createOne)
router.get('/getall',productCtr.getAll)
router.get('/getbyid/:id',productCtr.createOne)
router.delete('/delete/:id',productCtr.createOne)
router.put('update/:id',productCtr.createOne)

module.exports=router