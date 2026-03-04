import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"

const sqlAddMen = `INSERT INTO public.menu(descripcion, categoria_id, tipo, coeficiente) VALUES ($1, $2, $3, $4);`



export default async function (des:string,cat:number,tipo:string,coeficiente:number): Promise<boolean> {
    const conn = clientReturner()
    try {
        if(await authJwt(2)) {
            await conn.connect()
            await conn.query(sqlAddMen,[des,cat,tipo,coeficiente])
            await conn.end()
            return true
        }
        await conn.end()
        return false
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error crear nuevo menu.")
    }
}