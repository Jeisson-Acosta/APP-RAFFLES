import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

export const CONFIG_DB = process.env.DATABASE_URL 
    ? mysql.createPool(process.env.DATABASE_URL)
    : mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: 3306,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
    })

export async function manageDB(nameSP, params, query = '', option = 'SP') {
    /* 
        nameSP -> Nombre del SP que se va a ejecutar.
        params -> Parametros que se van a pasar al SP.
        query -> Consulta SELECT que se va a ejecutar si option es 'SL'. EJ: 'SELECT * FROM tbl_name WHERE field = ?'
        option -> 'SP' o 'SL' -> Determina si se va a ejecutar un SP o una consulta SELECT.
    */
   
    const RESPONSE_DB = {
        ok: false,
        data: null,
        message: ''
    } 

    try {
        if (option === 'SP') {
            const [response] = await CONFIG_DB.query(`CALL ${nameSP}(${params?.map(() => '?').join(',')})`, params)
            RESPONSE_DB.ok = true
            RESPONSE_DB.data = response[0]
            RESPONSE_DB.message = "Petición exitosa"
        } else if (option === 'SL') {
            const [response] = await CONFIG_DB.query(query, params)
            RESPONSE_DB.ok = response.length === 0 ? false : true
            RESPONSE_DB.data = response.length === 0 ? null : response
            RESPONSE_DB.message = "Petición exitosa"
        }
    } catch(e) {
        console.log(e)
        RESPONSE_DB.ok = false
        RESPONSE_DB.message = `Error al ejecutar la peticion: ${e.message}`
    }

    return RESPONSE_DB
}