import * as dotenv from "dotenv";

import { connect } from "mongoose";

export async function connectDB(){
    dotenv.config();
    try {
        await connect(process.env.DB_CONN_STRING);
        console.log("Conectado con éxito a la base de datos: DB_HighPaper");
    } catch (err) {
        console.error(err.message);
    }
};
