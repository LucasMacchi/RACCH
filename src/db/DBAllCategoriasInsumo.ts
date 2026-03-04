import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { ICategoriaInsumo } from "@/utils/interfaces"

const sqlCat = `SELECT * FROM public.categoria_ins ORDER BY categoria_ins_id ASC;`


export default async function (): Promise<ICategoriaInsumo[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: ICategoriaInsumo[] = (await conn.query(sqlCat)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al categorias de insumos.")
    }
}