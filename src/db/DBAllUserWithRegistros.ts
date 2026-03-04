import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { IUsuariosRegistros } from "@/utils/interfaces"

const sqlAllTipos = `SELECT DISTINCT r.usuario_id,u.username FROM public.registro r JOIN public.usuario u ON u.user_id = r.usuario_id ORDER BY r.usuario_id ASC;`


export default async function (): Promise<IUsuariosRegistros[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: IUsuariosRegistros[] = (await conn.query(sqlAllTipos)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al usuarios con registros.")
    }
}