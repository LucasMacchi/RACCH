import MenuAdmin from "@/app/Componets/MenuAdmin";
import MenusTable from "@/app/Componets/MenusTable";
import DBAddCategoria from "@/db/DBAddCategoria";
import DBAddMenu from "@/db/DBAddMenu";
import DBAllCategorias from "@/db/DBAllCategorias";
import DBAllCategoriasInsumo from "@/db/DBAllCategoriasInsumo";
import DBAllMenuDetalle from "@/db/DBAllMenuDetalle";
import DBAllMenus from "@/db/DBAllMenus";
import DBAllMenusTipo from "@/db/DBAllMenusTipo";
import sessionCheck from "@/utils/sessionCheck";
import { hr_style, text_2_t_style } from "@/utils/styles";


export default async function Page() {
    await sessionCheck(3)
    const categorias = await DBAllCategorias()
    const menus = await DBAllMenus()
    const detalles = await DBAllMenuDetalle()
    const tipos = await DBAllMenusTipo()
    const categoriasIns = await DBAllCategoriasInsumo()


    const createCategoria = async (des: string, ins: boolean): Promise<boolean> => {
        "use server"
        try {
            const res = await DBAddCategoria(ins,des)
            return res
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const createMenu = async (des:string,cat:number,tipo:string,coeficiente:number): Promise<boolean> => {
        "use server"
        try {
            const res = await DBAddMenu(des,cat,tipo,coeficiente)
            return res
        } catch (error) {
            console.log(error)
            return false
        }
    }


    return (
        <div style={{margin: 50,marginBottom: 350}}>
            <div>
                <h2 style={text_2_t_style}>MENUS</h2>
                <hr color="#4A6EE8" style={hr_style}/>
            </div>
            <div>
                <MenusTable menus={menus} categorias={categorias} detalles={detalles}/>
            </div>
            <div>
                <h2 style={text_2_t_style}>Administracion</h2>
                <hr color="#4A6EE8" style={hr_style}/>
            </div>
            <div>
                <MenuAdmin tipos={tipos} categorias={categorias} 
                createCategoria={createCategoria} createMenu={createMenu}/>
            </div>
        </div>
    )
}