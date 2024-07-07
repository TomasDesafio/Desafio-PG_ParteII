import { Router } from 'express'

import express from 'express'
import { getDatacontrollers, insertDatacontrollers,editPostcontrollers,deletePostcontrollers,notFound,home } from '../controllers/index.js'

const router = express.Router()


router.get("/", home);
router.get('/posts',getDatacontrollers)

router.post('/posts',insertDatacontrollers)

router.put('/posts/like/:id',editPostcontrollers )

router.delete('/posts/:id',deletePostcontrollers)

router.get("*", notFound);



export default router