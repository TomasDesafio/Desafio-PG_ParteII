import { Router } from 'express'

import express from 'express'
import { getData, insertData,editPost,deletePost } from '../model/index.js'

const router = express.Router()



router.get('/posts', async (req, res) => {
  const result = await getData()
  console.log(result)
  //console.log(typeof(result))
  res.json({result})
  
})

router.post('/posts', async (req, res) => {
  const post = {
    titulo: req.body.titulo,
    img: req.body.img,
    descripcion: req.body.descripcion
  };
  console.log(req.body)
  console.log(post)

  /*const { nombre, precio, stock } = req.body
  if (nombre === undefined || precio === undefined || stock === undefined) return res.status(400).json({ message: 'Datos incorrectos' })*/
  const response = await insertData(post)
  res.json({ data: response })
  //res.json("Producto Agregado")


})

router.put('/posts/like/:id', async (req, res) => {
  try {
    const {id } = req.params
    //const { titulo, img,descripcion, likes } = req.body;
    const response = await editPost(id);
    res.status(200).send('Product edited');
  } catch (error) {
    res.status(500).send(error.message);
  }


})

router.delete('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await deletePost(id);
    res.status(200).send('Product deleted successfully'); 
  } catch (error) {
    res.status(500).send(error.message);
  }

  


})




export default router