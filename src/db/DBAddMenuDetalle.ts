import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"

const sqlAddMen = `INSERT INTO public.menu_detalle(insumo_id, gramos, menu_id) VALUES ($1, $2, $3);`

export default async function (ins_id: number,gramos: number,menu_id: number): Promise<boolean> {
    const conn = clientReturner()
    try {
        if(await authJwt(2)) {
            await conn.connect()
            await conn.query(sqlAddMen,[ins_id,gramos,menu_id])
            await conn.end()
            return true
        }
        await conn.end()
        return false
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error agregar insumo a menu.")
    }
}