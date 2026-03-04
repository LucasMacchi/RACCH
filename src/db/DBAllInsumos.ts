import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { IInsumo } from "@/utils/interfaces"

const sqlInsumos = `SELECT i.descripcion AS insumo,i.insumo_id,cai.categoria_ins_id,cai.descripcion AS categoria FROM public.insumo i 
JOIN categoria_ins cai ON i.categoria_ins_id = cai.categoria_ins_id ORDER BY i.insumo_id ASC`


export default async function (): Promise<IInsumo[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: IInsumo[] = (await conn.query(sqlInsumos)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al traer insumos.")
    }
}