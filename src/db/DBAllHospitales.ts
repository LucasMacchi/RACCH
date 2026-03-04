import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"
import { IHospital } from "@/utils/interfaces"

const sqlHospitales = `SELECT * FROM public.hospital ORDER BY hospital_id ASC;`


export default async function (): Promise<IHospital[]> {
    const conn = clientReturner()
    try {
        if(await authJwt(3)) {
            await conn.connect()
            const response: IHospital[] = (await conn.query(sqlHospitales)).rows
            await conn.end()
            return response
        }
        await conn.end()
        return []
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error al traer hospitales.")
    }
}