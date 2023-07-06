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


  

export default storageBodegas;