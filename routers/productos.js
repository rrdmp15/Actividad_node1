import mysql from 'mysql2';
import { Router } from "express";
const storageProductos = Router();
let con = undefined;

storageProductos.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig);
    next();
})

storageProductos.get('/', (req, res)=>{
    con.query(
        /*sql*/`SELECT * FROM productos`,
        (err, data, fil)=>{
            res.send(JSON.stringify(data));
        }
    )
})

export default storageProductos;