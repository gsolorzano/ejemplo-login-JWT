import express from 'express';
import jwt from 'jsonwebtoken'

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.body.token;
    if (token) {
      jwt.verify(token, "miclavesupersecreta123*", (err : any, decoded : any) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
        //   req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          msg: null
      });
    }
 });

 export default rutasProtegidas;