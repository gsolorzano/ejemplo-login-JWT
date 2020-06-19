import express from 'express';
import jwt from 'jsonwebtoken'

const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.body.token;
    if (token) {
      jwt.verify(token, String(process.env.MASTER_PW), (err : any, decoded : any) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválido' });    
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