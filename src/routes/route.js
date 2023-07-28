const express = require('express');
const router = express.Router();
const {signupPage,loginPage,editUser,deleteUser,createPremiumUser } = require('../controller/usercontroller');
const {createArticle,getArticleById,getAllArticles}= require('../controller/articleController');
const {createComment} = require('../controller/commentController')
const {authentication} = require('../middleware/auth');
const {userValidations ,loginValidations,updateValidations} = require('../middleware/userValidations');
const {articleValidations} = require('../middleware/articleValidations');
const {commentValidations} = require('../middleware/commentValidations');
// User Api's----------------
router.post('/signup',userValidations, signupPage);
router.post('/login',loginValidations,loginPage);
router.post('/editUser',authentication,updateValidations,editUser);
router.delete('/deleteUser',authentication,deleteUser);

// Premium Api------
router.post('/goPremium',authentication,createPremiumUser)

// Article Api's-------------
router.post('/createArticle',articleValidations, createArticle);
router.get('/getArticle/:id',getArticleById);
router.get('/getAllArticles',getAllArticles);

// Comment Api------------
router.post('/comment',authentication,commentValidations,createComment);


module.exports = router;