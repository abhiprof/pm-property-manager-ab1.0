const express=require('express');
const router=express.Router();
const hostController=require('../controller/hostController')

router.get('/',hostController.getAll);
router.get('/:id',hostController.getPropertyById);

module.exports=router;