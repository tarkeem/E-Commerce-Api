const express = require("express");

const router=express.Router()
const categoryCtr=require('../controller/categoryCtr')
const categoryValidator=require('../validators/categoryValidator')



router.post(
'/create',
categoryCtr.uploadCategoryImage,categoryCtr.resizeImage,
categoryValidator.createCategoryValidator,
categoryCtr.createOne
)
router.get('/get',categoryValidator.getCategoryValidator,categoryCtr.readOne)
router.put('/update',categoryValidator.updateCategoryValidator,categoryCtr.updateOne)
router.delete('/delete',categoryValidator.deleteCategoryValidator,categoryCtr.deleteOne)


module.exports=router