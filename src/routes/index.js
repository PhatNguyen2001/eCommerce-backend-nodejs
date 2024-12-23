import express from 'express';
import publicRoute from './public/index.js'

export const router = express.Router()

// router.use('/api/v1',publicController.signUp)
router.get('/shopss', (req,res,next) => {
    return res.status(200).json({
        message: "Demo",
    })
})

router.use('/shop', publicRoute);
