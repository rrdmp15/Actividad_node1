import mysql from 'mysql2';
import { Router } from "express";
const storageBodegas = Router();
let con = undefined;

storageBodegas.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig);
    next();
})

storageBodegas.get('/', (req, res)=>{
    con.query(
        /*sql*/`SELECT * FROM bodegas ORDER BY nombre`,
        (err, data, fil)=>{
            res.send(JSON.stringify(data));
        }
    )
})

storageBodegas.post('/', (req, res) => {
    const { nombre, id_responsable, estado, created_by, update_by, updated_at, deleted_at } = req.body;
    
    con.query(
      /*sql*/ `INSERT INTO bodegas (nombre, id_responsable, estado, created_by, update_by, updated_at, deleted_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, id_responsable, estado, created_by, update_by, updated_at, deleted_at],
      (err, data, fil) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.send(JSON.stringify(data));
        }
      }
    );
  });
  

export default storageBodegas;