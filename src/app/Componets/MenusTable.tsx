"use client"
import { ICategoria, IMenuCategoria, IMenuDetalle } from "@/utils/interfaces";
import { useEffect, useState } from "react";


export default function MenusTable ({categorias,menus,detalles}:{categorias: ICategoria[],menus: IMenuCategoria[],detalles:IMenuDetalle[]}) {
    
    const [selectedCategoria, setCategoria] = useState(0)

    const [selectedMenu, setSelectedMenu] = useState(0)

    useEffect(() => {setSelectedMenu(0)},[selectedCategoria])

    const sizeSection = 450

    return (
        <div style={{margin: 50,display: "flex",justifyContent: "space-evenly"}}>
            <div style={{width: sizeSection, overflow: "scroll", height: 250}}>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <th style={{border: "1px solid", width: "10%"}}>COD.</th>
                            <th style={{border: "1px solid", width: "90%"}}>CATEGORIA</th>
                        </tr>
                        {categorias.map((c) => (
                        <tr  key={c.descripcion} onClick={() => setCategoria(c.categoria_id)}
                        style={{backgroundColor: selectedCategoria === c.categoria_id ? "slategrey" : "white"}}>
                            <th style={{border: "1px solid", width: "10%"}}>{c.categoria_id}</th>
                            <th style={{border: "1px solid", width: "90%"}}>{c.descripcion}</th>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{width: sizeSection, overflow: "scroll", height: 250}}>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <th style={{border: "1px solid", width: "10%"}}>COD.</th>
                            <th style={{border: "1px solid", width: "50%"}}>MENU</th>
                            <th style={{border: "1px solid", width: "40%"}}>TIPO</th>
                        </tr>
                        {menus.map((c) => {
                            if(c.categoria_id === selectedCategoria) {
                                return (
                                    <tr  key={c.menu} onClick={() => setSelectedMenu(c.menu_id)}
                                    style={{backgroundColor: selectedMenu === c.menu_id ? "slategrey" : "white"}}>
                                        <th style={{border: "1px solid", width: "10"}}>{c.menu_id}</th>
                                        <th style={{border: "1px solid", width: "50%"}}>{c.menu}</th>
                                        <th style={{border: "1px solid", width: "40%"}}>{c.tipo}</th>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{width: sizeSection, overflow: "scroll", height: 250}}>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <th style={{border: "1px solid", width: "10%"}}>INSUMO</th>
                            <th style={{border: "1px solid", width: "50"}}>CATEGORIA</th>
                            <th style={{border: "1px solid", width: "40"}}>GRAMOS</th>
                        </tr>
                        {detalles.map((c) => {
                            if(c.menu_id === selectedMenu) {
                                return (
                                    <tr  key={c.detalle_id+c.insumo}>
                                        <th style={{border: "1px solid", width: "10%"}}>{c.insumo}</th>
                                        <th style={{border: "1px solid", width: "50%"}}>{c.categoria_ins}</th>
                                        <th style={{border: "1px solid", width: "40"}}>{c.gramos}</th>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}