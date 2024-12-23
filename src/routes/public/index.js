import express, { response } from 'express';
import PublicController from '../../controllers/public.js'

const router = express.Router()

router.post('/signUp', PublicController.signUp)
// router.get('/shop', (req,res,next) => {
//     return res.status(200).json({
//         message: "Demo",
//     })
// })

export default router
