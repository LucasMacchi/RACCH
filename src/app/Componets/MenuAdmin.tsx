"use client"
import { IaddMenu, ICategoria, ICategoriaInsumo } from "@/utils/interfaces";
import { btn_s_style, select_style, text_2_s_style, text_2_t_style } from "@/utils/styles";
import { useState } from "react";




export default function MenuAdmin ({tipos,categorias,createCategoria,createMenu}:
{tipos:string[],categorias: ICategoria[],
createCategoria: (des: string, ins: boolean) => Promise<boolean>,
createMenu: (des:string,cat:number,tipo:string,coeficiente:number) => Promise<boolean>
}) {
    const marginBwtFilters = 20
    const [option, selectOption] = useState(0)
    const [newCategoria, setNewCategoria] = useState("")
    const [addMenu, setAddMenu] = useState<IaddMenu>({
        categoria_id: 0,
        tipo: "",
        descripcion: "",
        coeficiente: 0
    })


    const createCategoriaFn = async () => {
        if(newCategoria.length > 4) {
            const rs = await createCategoria(newCategoria,false)
            if(rs) {
                alert("Categoria "+newCategoria+" creada.")
                window.location.reload()
            }
            else alert("Error al crear la categoria.")
        }
        else alert("Minimo de 5 caracteres.")
    }

    const createMenuFn = async () => {
        if(addMenu.categoria_id && addMenu.descripcion.length > 0 && addMenu.tipo.length > 0 && addMenu.coeficiente) {
            const rs = await createMenu(addMenu.descripcion,addMenu.categoria_id,addMenu.tipo,addMenu.coeficiente)
            if(rs) {
                alert("Menu "+addMenu.descripcion+" creada.")
                window.location.reload()
            }
            else alert("Error al crearmenu.")
        }
        else alert("Faltan datos.")
    }

    const displayAddCategroia = (
        <div>
            <h4 style={text_2_t_style}>Ingrese la nueva categoria: </h4>
            <input name="menu_cat_add" type="text" value={newCategoria} 
            style={{width: 250,fontSize:20,marginBottom: 20}} 
            onChange={(e) => setNewCategoria(e.target.value)}/>
            <div style={{marginTop: 15}}>
                <button style={btn_s_style} onClick={() => createCategoriaFn()}>CREAR CATEGORIA</button>
            </div>
        </div>
    )

    const displayAddMenu = (
        <div>
            <div>
                <h4 style={text_2_t_style}>Ingrese el nombre del menu y coeficiente: </h4>
                <input name="menu_add" type="text" value={addMenu.descripcion} 
                style={{width: 250,fontSize:20,marginBottom: 20}} 
                onChange={(e) => setAddMenu({...addMenu,descripcion: e.target.value})}/>
                <input name="menu_add" type="number" value={addMenu.coeficiente} 
                style={{width: 80,fontSize:20,marginBottom: 20, marginLeft: 10}} min={0.01} max={0.99}
                onChange={(e) => setAddMenu({...addMenu,coeficiente: parseFloat(e.target.value)})}/>
            </div>
            <div>
                <h4 style={text_2_t_style}>Seleccione la categoria:</h4>
                <select name="estados_sel" id="state_sl" value={addMenu.categoria_id}
                onChange={(e) => setAddMenu({...addMenu, categoria_id: parseInt(e.target.value)})}
                style={select_style}>
                    <option value={0}>---</option>
                    {categorias.map((h) => (
                        <option value={h.categoria_id} key={h.descripcion}>{h.descripcion}</option>
                    ))}
                </select>
            </div>
            <div>
                <h4 style={text_2_t_style}>Seleccione el tipo:</h4>
                <select name="estados_sel" id="state_sl" value={addMenu.tipo}
                onChange={(e) => setAddMenu({...addMenu, tipo: e.target.value})}
                style={select_style}>
                    <option value={0}>---</option>
                    {tipos.map((h) => (
                        <option value={h} key={h}>{h}</option>
                    ))}
                </select>
            </div>
            <div style={{marginTop: 15}}>
                <button style={btn_s_style} onClick={() => createMenuFn()}>CREAR MENU</button>
            </div>
        </div>
    )

    const displayAddMenuDetails = (
        <div>

        </div>
    )

    return(
        <div style={{margin: 50}}>
            <div style={{margin: marginBwtFilters}}>
                <h4 style={text_2_t_style}>AGREGAR</h4>
                <select name="estados_sel" id="state_sl" value={option}
                onChange={(e) => selectOption(parseInt(e.target.value))}
                style={select_style}>
                    <option value={0}>---</option>
                    <option value={1}>CATEGORIA</option>
                    <option value={2}>MENU</option>
                    <option value={2}>INSUMO A MENU</option>
                </select>
            </div>
            <div style={{margin: marginBwtFilters}}>
                {option === 1 && displayAddCategroia}
                {option === 2 && displayAddMenu}
            </div>
        </div>
    )
}