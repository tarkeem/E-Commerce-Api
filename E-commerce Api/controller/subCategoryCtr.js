const factory = require('./factoryHandlers');
const SubCategory = require('../model/subCategory');
const asyncHandler=require('express-async-handler')
const { v4: uuidv4 } = require('uuid');
const sharp=require('sharp')

const uploadSingleImage=require('../middlewares/multerMiddleware').uploadSingleImage

exports.uploadSubCategoryImage = uploadSingleImage('image');
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  
  const filename = `subCategory-${uuidv4()}-${Date.now()}.jpeg`;
  //console.log(req.file)
  if (req.file) {
   await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/subCategory/${filename}`)


    // Save image into our db
    req.body.image=filename
    
  }

  //if there is no image dont worry the next validator middleware will handl it
  next()

 
});





exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = factory.readOne(SubCategory);

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
