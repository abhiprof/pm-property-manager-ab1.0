const express=require('express');
const router=express.Router();
const hostController=require('../controller/hostController')

router.post('/add-property',hostController.postProperty);
router.put('/edit-property/:id',hostController.editProperty);
router.delete('/delete-property/:id',hostController.deleteProperty);

module.exports=router;