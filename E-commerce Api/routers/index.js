categoryRouters=require('../routers/categoryRouter')
brandtRouters=require('../routers/brandRouter')
productRouters=require('../routers/productRoute')
subCategoryRouters=require('../routers/subCategoryRoouter')
authRouters=require('../routers/authRouters')
userRouters=require('../routers/userRouter')
cartRouters=require('../routers/cartRouters')
orderRouters=require('../routers/orderRouters')
mainIndexRouter=(app)=>{

    app.use('/api/v1/category',categoryRouters)
    app.use('/api/v1/brand',brandtRouters)
    app.use('/api/v1/product',productRouters)
    app.use('/api/v1/subCatergory',subCategoryRouters)
    app.use('/api/v1/auth',authRouters)
    app.use('/api/v1/user',userRouters)
    app.use('/api/v1/cart',cartRouters)
    app.use('/api/v1/order',orderRouters)

}

module.exports=mainIndexRouter