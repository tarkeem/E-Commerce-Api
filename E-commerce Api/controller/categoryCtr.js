const category = require('../model/category')
const factory=require('../controller/factoryHandlers')
const { v4: uuidv4 } = require('uuid');
const uploadSingleImage = require('../middlewares/multerMiddleware').uploadSingleImage;
const sharp=require('sharp')

const asyncHandler=require('express-async-handler')

exports.uploadCategoryImage = uploadSingleImage('image');
// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  //console.log(req.file)
  if (req.file) {
   await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`)


    // Save image into our db
    req.body.image=filename
    
  }

  //if there is no image dont worry nhe bext validator middleware will handl it
  next()

 
});








exports.createOne=factory.createOne(category)
exports.readOne=factory.readOne(category)
exports.updateOne=factory.updateOne(category)
exports.deleteOne=factory.deleteOne(category)