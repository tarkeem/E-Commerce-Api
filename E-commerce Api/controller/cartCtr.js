const expressAsyncHandler = require('express-async-handler');
const Cart=require('../model/cart')
const Product=require('../model/product');
const ApiError=require('../utilits/ApiError')


calculateTotal=(usercart)=>{

   // console.log(usercart)
    let total=0

    usercart.cartItems.forEach(element => {
        total+=element.price*element.quantity
    });
    usercart.totalCartPrice=total
    usercart.totalPriceAfterDiscount=undefined
    return total

}

exports.addProductToCart=expressAsyncHandler(async(req,res,next)=>{
    const productId=req.body.productId
    const color=req.body.color
    const product=await Product.findById(productId)

    //console.log(product)
    //console.log(req.user)

    const cart=await Cart.findOne({user:req.user._id})


    if(!cart)
    {
        cart= await Cart.create({ 
            user:req.user._id,
            cartItems:[{product:productId,price:product.price,color:color}]
        })
    }
    else
    {
        const productIndex= cart.cartItems.findIndex(item=>{
           return item.product==productId
        }
        )


        if(productIndex>-1)
        {
            const newcartItem=cart.cartItems[productIndex]
            newcartItem.quantity+=1
            cart.cartItems[productIndex]=newcartItem
        }
        else
        {
            cart.cartItems.push({
                product: productId, color:color, price: product.price
            })
        }
    }

    calculateTotal(cart)

   await cart.save()

   res.status(200).json({
    status: 'success',
    message: 'Product added to cart successfully',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
    

})


exports.getLoggedUserCart=expressAsyncHandler(async(req,res,next)=>{
    const cart=await Cart.find({user:req.user._id})

    if(!cart)
    {
        //dont forget return
       return next(new ApiError("no cart for this user",404))
    }
    res.status(200).json({
        status: 'success',
        //numOfCartItems: cart.cartItems.length(),
        data: cart,
      });
})

exports.removeSpecificCartItem = expressAsyncHandler(async (req, res, next) => {


    const cart=await Cart.findOneAndUpdate({user:req.user._id},{
        $pull:{cartItems:{_id:req.params.itemId}}
    })

    calculateTotal(cart)
     await cart.save()
    res.status(200).json({
        status: 'success',
        numOfCartItems: cart.cartItems.length,
        data: cart,
      });
})


exports.clearCart =expressAsyncHandler(async(req,res,next)=>{
   await Cart.findOneAndDelete({user:req.user._id})

    res.status(200).send()
})


exports.updateCartItemQuantity = expressAsyncHandler(async (req, res, next) => {
    const { quantity } = req.body;
  
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return next(new ApiError(`there is no cart for user ${req.user._id}`, 404));
    }
  
    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );
    if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantity = quantity;
      cart.cartItems[itemIndex] = cartItem;
    } else {
      return next(
        new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
      );
    }
  
    calcTotalCartPrice(cart);
  
    await cart.save();
  
    res.status(200).json({
      status: 'success',
      numOfCartItems: cart.cartItems.length,
      data: cart,
    });
  });