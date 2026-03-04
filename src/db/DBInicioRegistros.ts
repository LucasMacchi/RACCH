import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { IRegistroCompleto } from "@/utils/interfaces"
import decodeJWT from "@/utils/decodeJWT"


const sqlGetRegistros = `
SELECT r.registro_id,r.menu_id,r.hospital_id,r.fecha,r.usuario_id,h.descripcion as hospital, 
m.descripcion as menu, u.username,c.descripcion as categoria,m.tipo,r.codigo,r.raciones FROM public.registro r 
JOIN hospital h ON r.hospital_id = h.hospital_id 
JOIN menu m ON r.menu_id = m.menu_id 
JOIN usuario u ON r.usuario_id = u.user_id
JOIN categoria c ON m.categoria_id = c.categoria_id
ORDER BY registro_id DESC LIMIT 100;`

const sqlGetRegistrosUser = `
SELECT r.registro_id,r.menu_id,r.hospital_id,r.fecha,r.usuario_id,h.descripcion as hospital, m.descripcion as menu, u.username,
c.descripcion as categoria,m.tipo,r.codigo,r.raciones FROM public.registro r 
JOIN hospital h ON r.hospital_id = h.hospital_id 
JOIN menu m ON r.menu_id = m.menu_id 
JOIN usuario u ON r.usuario_id = u.user_id
JOIN categoria c ON m.categoria_id = c.categoria_id
WHERE r.usuario_id = $1
ORDER BY registro_id DESC LIMIT 100;`

export default async function (): Promise<IRegistroCompleto[]> {
    const conn = clientReturner()
    try {
        const user = await decodeJWT()
        if(user && await authJwt(2)) {
            await conn.connect()
            const response: IRegistroCompleto[] = (await conn.query(sqlGetRegistros)).rows
            await conn.end()
            return response
        }
        else if(user && await authJwt(3)) {
            await conn.connect()
            const response: IRegistroCompleto[] = (await conn.query(sqlGetRegistrosUser,[user.rol])).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al traer registros.")
    }
}