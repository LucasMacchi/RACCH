import { IUserData } from "@/utils/interfaces";
import clientReturner from "./clientReturner";

const secret = process.env.TOKEN_SECRET ?? "sistemsdesoluciones"
const expireTime = process.env.TOKEN_EXPIRE ?? '48h'

export default async function (username: string, password: string): Promise<IUserData | null> {
    const conn = clientReturner()
    try {
        const sql = `SELECT * FROM public.usuario where username = $1 and password = $2;`
        await conn.connect()
        console.log(username,password)
        const data:IUserData = (await conn.query(sql,[username,password])).rows[0]
        await conn.end()
        if(data.username === username && expireTime && secret) {
            return data
        }
        else {
            console.log("failed")
            return null
        }
    } catch (error) {
        console.log(error)
        await conn.end()
        throw new Error("Error al intentar logearse")
    }
}