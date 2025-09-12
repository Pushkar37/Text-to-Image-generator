const express=require('express');
const generateImage = require('../controllers/ImageController');
const UserAuth = require('../middleware/auth');
const ImageRouter=express.Router();

ImageRouter.post("/generate-image",generateImage);
module.exports=ImageRouter;