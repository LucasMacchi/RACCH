import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"

const sqlAllTipos = `SELECT DISTINCT tipo FROM public.menu ORDER BY tipo ASC;`

interface IResponseTipos {
    tipo:string
}

export default async function (): Promise<string[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: IResponseTipos[] = (await conn.query(sqlAllTipos)).rows
            const allTipo = response.map((t) => t.tipo)
            await conn.end()
            return allTipo
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al traer los tipos de menu.")
    }
}