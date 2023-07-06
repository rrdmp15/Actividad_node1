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
        /*sql*/`SELECT DISTINCT id_producto, (SELECT SUM(cantidad) FROM inventarios WHERE id_producto = t.id_producto) AS total FROM inventarios AS t WHERE id_producto IN (SELECT id_producto FROM inventarios GROUP BY id_producto HAVING COUNT(*) > 0) ORDER BY total;`,
        (err, data, fil)=>{
            res.send(JSON.stringify(data));
        }
    )
})

export default storageProductos;