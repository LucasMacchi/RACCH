import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { IMenuDetalle } from "@/utils/interfaces"

const sqlDetallesMenu = `SELECT md.detalle_id,i.insumo_id,md.gramos,md.menu_id,cin.categoria_ins_id,i.descripcion as insumo, cin.descripcion as categoria_ins FROM public.menu_detalle md JOIN insumo i ON md.insumo_id = i.insumo_id 
JOIN categoria_ins cin ON i.categoria_ins_id = cin.categoria_ins_id ORDER BY md.insumo_id ASC;`


export default async function (): Promise<IMenuDetalle[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: IMenuDetalle[] = (await conn.query(sqlDetallesMenu)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al detalles de menus.")
    }
}