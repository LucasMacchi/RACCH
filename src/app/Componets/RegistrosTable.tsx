"use client"

import { IHospital, IMenuCategoria, IRegistroCompleto, IUsuariosRegistros } from "@/utils/interfaces";
import { select_style, text_2_s_style } from "@/utils/styles";
import { CSSProperties, useEffect, useState } from "react";

const searchContainerStyle: CSSProperties = {
    backgroundColor: "#4A6EE8",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 4,
    marginTop: 20,
    padding: 15,
}
const marginBwtFilters = 20

export default function RegistrosTable (
    {registros,hospitales,menus,tipos,usuarios}:
    {registros: IRegistroCompleto[],hospitales:IHospital[],menus:IMenuCategoria[],
    tipos:string[],usuarios: IUsuariosRegistros[]}) {

    const [selectedHospital, setSelectedHospital] = useState(0)
    const [selectedMenu, setSelectedMenu] = useState(0)
    const [selectedTipo, setSelectedTipo] = useState("")
    const [selectedUser, setSelectedUser] = useState(0)
    const [filteredRegistros, setFilteredRegistros] = useState<IRegistroCompleto[]>([])

    useEffect(() => {
        let arr = registros
        if(selectedHospital) arr = arr.filter(r => r.hospital_id === selectedHospital)
        if(selectedMenu) arr = arr.filter(r => r.menu_id === selectedMenu)
        if(selectedTipo.length > 0) arr = arr.filter(r => r.tipo === selectedTipo)
        if(selectedUser) arr = arr.filter(r => r.usuario_id === selectedUser)
        setFilteredRegistros(arr)
    },[selectedHospital,selectedMenu,selectedTipo,selectedUser])

    return(
        <div>
            <div style={searchContainerStyle}>
                <div style={{margin: marginBwtFilters}}>
                    <h4 style={text_2_s_style}>HOSPITAL</h4>
                    <select name="estados_sel" id="state_sl" value={selectedHospital}
                    onChange={(e) => setSelectedHospital(parseInt(e.target.value))}
                    style={select_style}>
                        <option value={0}>---</option>
                        {hospitales.map((h) => (
                            <option value={h.hospital_id} key={h.hospital_id+h.descripcion}>{h.descripcion}</option>
                        ))}
                    </select>
                </div>
                <div style={{margin: marginBwtFilters}}>
                    <h4 style={text_2_s_style}>MENU</h4>
                    <select name="estados_sel" id="state_sl" value={selectedMenu}
                    onChange={(e) => setSelectedMenu(parseInt(e.target.value))}
                    style={select_style}>
                        <option value={0}>---</option>
                        {menus.map((h) => (
                            <option value={h.menu_id} key={h.menu_id+h.menu}>{h.menu+" - "+h.categoria}</option>
                        ))}
                    </select>
                </div>
                <div style={{margin: marginBwtFilters}}>
                    <h4 style={text_2_s_style}>TIPO</h4>
                    <select name="estados_sel" id="state_sl" value={selectedTipo}
                    onChange={(e) => setSelectedTipo(e.target.value)}
                    style={select_style}>
                        <option value={""}>---</option>
                        {tipos.map((h,i) => (
                            <option value={h} key={i+h}>{h}</option>
                        ))}
                    </select>
                </div>
                <div style={{margin: marginBwtFilters}}>
                    <h4 style={text_2_s_style}>USUARIO</h4>
                    <select name="estados_sel" id="state_sl" value={selectedUser}
                    onChange={(e) => setSelectedUser(parseInt(e.target.value))}
                    style={select_style}>
                        <option value={0}>---</option>
                        {usuarios.map((h,i) => (
                            <option value={h.usuario_id} key={h.username}>{h.username}</option>
                        ))}
                    </select>
                </div>
            </div>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <th style={{border: "1px solid", width: "20%"}}>COD.</th>
                            <th style={{border: "1px solid", width: "20%"}}>HOSPITAL</th>
                            <th style={{border: "1px solid", width: "20%"}}>MENU</th>
                            <th style={{border: "1px solid", width: "20%"}}>CATEGORIA</th>
                            <th style={{border: "1px solid", width: "8%"}}>TIPO</th>
                            <th style={{border: "1px solid", width: "8%"}}>USUARIO</th>
                            <th style={{border: "1px solid", width: "8%"}}>RACIONES</th>
                        </tr>
                        {filteredRegistros.length > 0 && registros.map((r,i) => (
                        <tr  key={r.registro_id}
                        >
                            <th style={{border: "1px solid", width: "20%"}}>{r.codigo}</th>
                            <th style={{border: "1px solid", width: "20%"}}>{r.hospital}</th>
                            <th style={{border: "1px solid", width: "20%"}}>{r.menu}</th>
                            <th style={{border: "1px solid", width: "20%"}}>{r.categoria}</th>
                            <th style={{border: "1px solid", width: "8%"}}>{r.tipo}</th>
                            <th style={{border: "1px solid", width: "8%"}}>{r.username}</th>
                            <th style={{border: "1px solid", width: "8%"}}>{r.raciones}</th>
                        </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}