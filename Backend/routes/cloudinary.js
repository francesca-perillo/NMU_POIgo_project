const express = require('express');
const { cloudinary } = require('../utils/cloudinary');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const photoBase64 = "data:image/png;base64,"+req.body.photo;
        
        if (!photoBase64) return res.status(400).send('No file');
       
        const uploadResponse = await cloudinary.uploader.upload(photoBase64,{
            upload_preset: "upload_POIGO",
            transformation: {
                crop: "fill",
                width: 256,
                height: 256,
            }
        });
        res.json({msg: uploadResponse.secure_url});
    } catch (err) {
        console.log(err);

        //check if the error is caused by cloudinary
        if(err.http_code && err.message)
            return res.status(err.http_code).send({error: err.message});

        res.status(500).send('Something went wrong!');
    }
});

module.exports = router;