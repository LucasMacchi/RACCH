import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { ICategoria } from "@/utils/interfaces"

const sqlAllCat = `SELECT * FROM public.categoria ORDER BY categoria_id ASC;`

export default async function (): Promise<ICategoria[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: ICategoria[] = (await conn.query(sqlAllCat)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al traer las categorias.")
    }
}