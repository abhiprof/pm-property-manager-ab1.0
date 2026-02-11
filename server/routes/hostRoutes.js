const express=require('express');
const router=express.Router();
const hostController=require('../controller/hostController')

router.post('/add-property',hostController.postProperty);

module.exports=router;