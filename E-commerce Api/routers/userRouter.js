const authCtr = require('../controller/authCtr');
const express = require('express');

const router = express.Router();
const userCtr=require('../controller/userCtr')
const userValidator=require('../validators/userValidator')


router.use(authCtr.protect);


//user routers is diiferent from auth router as it is not consider any authentication process
//getLoggedUserData is resposible to assign user date to req object

//user
router.get('/getMe', userCtr.getLoggedUserData, userCtr.getUser);
router.put('/changeMyPassword',userCtr.getLoggedUserData,userValidator.changeUserPasswordValidator,userCtr.updateLoggedUserPassword);
router.put('/updateMe',userCtr.getLoggedUserData,userValidator.updateLoggedUserValidator,userCtr.updateLoggedUserData);
router.delete('/deleteMe',userCtr.deleteLoggedUserData);


//the same like the previous one but an admin who operate
// Admin
router.use(authCtr.allowedTo('admin', 'manager'));
router.put(
  '/admin/changePassword/:id',
  userValidator.changeUserPasswordValidator,
  userCtr.changeUserPassword
);
router
  .route('/admin/')
  .get(userCtr.getUsers)
  .post(userCtr.uploadUserImage,userCtr.resizeImage,userValidator.createUserValidator,userCtr.createUser);
router
  .route('/admin/:id')
  .get(userValidator.getUserValidator,userCtr.getUser)
  .put(userCtr.uploadUserImage,userCtr.resizeImage,userValidator.updateUserValidator,userCtr.updateUser)
  .delete(userValidator.deleteUserValidator,userCtr.deleteUser)

module.exports = router;