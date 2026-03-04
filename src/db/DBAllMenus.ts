import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { IMenuCategoria } from "@/utils/interfaces"

const sqlAllMenu = `SELECT m.coeficiente,m.menu_id,c.categoria_id,m.descripcion AS menu,c.descripcion AS categoria,m.tipo FROM public.menu m JOIN categoria c ON m.categoria_id = c.categoria_id ORDER BY menu_id ASC;`


export default async function (): Promise<IMenuCategoria[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: IMenuCategoria[] = (await conn.query(sqlAllMenu)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al traer Menus.")
    }
}