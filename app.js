import dotenv from 'dotenv';
import express from 'express';
import storageProductos from './routers/productos.js';
import storageBodegas from './routers/bodegas.js';
import storageInventarios from './routers/inventarios.js';
import bodyParser from 'body-parser';


dotenv.config();
const appExpress = express();

appExpress.use(bodyParser.urlencoded({ extended: false }));
appExpress.use(bodyParser.json());

appExpress.use("/productos", storageProductos);
appExpress.use("/bodegas", storageBodegas);
appExpress.use("/inventarios", storageInventarios);


const config = JSON.parse(process.env.MI_CONFIG);
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
})