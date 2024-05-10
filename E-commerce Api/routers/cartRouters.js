const express = require('express');

const cartCtr= require('../controller/cartCtr');
const authService = require('../controller/authCtr');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));
/*router
  .route('/')
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);*/

  router.post('/addproduct',cartCtr.addProductToCart)
  router.get('/getusercart',cartCtr.getLoggedUserCart)
  router.delete('/clearcart',cartCtr.clearCart)

//router.put('/applyCoupon', applyCoupon);

router
  .route('/itemcart/:itemId')
  .put(cartCtr.updateCartItemQuantity)
  .delete(cartCtr.removeSpecificCartItem);

module.exports = router;
