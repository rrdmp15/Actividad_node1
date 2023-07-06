import mysql from 'mysql2';
import { Router } from "express";
const storageInventarios = Router();
let con = undefined;

storageInventarios.use((req, res, next) => {
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig);
    next();
})

storageInventarios.get('/', (req, res)=>{
    con.query(
        /*sql*/`SELECT * FROM inventarios`,
        (err, data, fil)=>{
            res.send(JSON.stringify(data));
        }
    )
})

export default storageInventarios;