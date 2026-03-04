import authJwt from "@/utils/authJwt"
import clientReturner from "./clientReturner"

const sqlCat = `INSERT INTO public.categoria(descripcion) VALUES ($1);`
const sqlCatIns = `INSERT INTO public.categoria_ins(descripcion) VALUES ($1);`



export default async function (ins:boolean,des:string): Promise<boolean> {
    const conn = clientReturner()
    try {
        if(await authJwt(2)) {
            await conn.connect()
            ins ? await conn.query(sqlCatIns,[des]) : await conn.query(sqlCat,[des])
            await conn.end()
            return true
        }
        await conn.end()
        return false
    } catch (error) {
        await conn.end()
        console.log(error)
        throw new Error("Error crear nueva categoria.")
    }
}