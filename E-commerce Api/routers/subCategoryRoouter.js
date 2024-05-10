const express = require("express");

const router=express.Router()
const subCategoryCtr=require('../controller/subCategoryCtr')
const subCategoryValidator=require('../validators/subCategoryValidator')



router.post(
'/create',
subCategoryCtr.uploadSubCategoryImage
)
router.get('/get',subCategoryValidator.getSubCategoryValidator,subCategoryCtr.getSubCategory)
router.put('/update',subCategoryValidator.updateSubCategoryValidator,subCategoryCtr.updateSubCategory)
router.delete('/delete',subCategoryValidator.deleteSubCategoryValidator,subCategoryCtr.deleteSubCategory)


module.exports=router