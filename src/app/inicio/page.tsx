import DBInicioRegistros from "@/db/DBInicioRegistros";
import sessionCheck from "@/utils/sessionCheck";
import RegistrosTable from "../Componets/RegistrosTable";
import DBAllHospitales from "@/db/DBAllHospitales";
import DBAllMenus from "@/db/DBAllMenus";
import DBAllMenusTipo from "@/db/DBAllMenusTipo";
import DBAllUserWithRegistros from "@/db/DBAllUserWithRegistros";


export default async function Page() {
    await sessionCheck(3)
    const registros = await DBInicioRegistros()
    const hospitales = await DBAllHospitales()
    const menus = await DBAllMenus()
    const tipos = await DBAllMenusTipo()
    const users = await DBAllUserWithRegistros()
    return (
        <div style={{margin: 50}}>
            <div>
                <RegistrosTable registros={registros} hospitales={hospitales} 
                menus={menus} tipos={tipos} usuarios={users}/>
            </div>
        </div>
    )
}