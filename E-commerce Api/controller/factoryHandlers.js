const asyncHandler = require('express-async-handler');
const ApiError = require('../utilits/ApiError');
const ApiFeatures=require("../utilits/ApiFeatures")

//express-async-handler handle the async error and send it to error middleware


exports.createOne=(Model)=>{
    return asyncHandler( async(req,res)=>{
       newdoc=await Model.create(req.body)
       res.status(201).json({"message":newdoc})
    })
}


exports.readOne=(Model,populateOpt)=>{
    return asyncHandler( async(req,res,next)=>{

        //req.query != req.params
        id=req.params.id
       query=Model.findById(id)
       if(populateOpt)
       {
        query=newdoc.populate(populateOpt)
       }
       newdoc=await query
       if(!newdoc)
       {
        //dont forget return to terminate the function
        return next(new ApiError('not found the doc',404))
       }
       res.status(201).json({"message":newdoc})
    })
}


exports.updateOne=(Model)=>{
    return asyncHandler( async(req,res)=>{
        id=req.query.id
       newdoc=await Model.findByIdAndUpdate(id,req.body,{new:true})
       
       if(!newdoc)
       {
        next(new ApiError('not found the doc',404))
       }
       newdoc.save()
       res.status(201).json({"message":newdoc})
    })
}


exports.deleteOne=(Model)=>{
    return asyncHandler( async(req,res,next)=>{
        id=req.query.id
       newdoc=await Model.findByIdAndDelete(id)
       
       if(!newdoc)
       {
        next(new ApiError('not found the doc',404))
       }
       newdoc.remove()
       res.status(201).json({"message":newdoc})
    })
}


exports.getAll = (Model, modelName = '') =>
  asyncHandler(async (req, res) => {

    console.log(req.query)
    console.log(req.body)

    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelName)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });