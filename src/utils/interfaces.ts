export interface IUserData {
    email: string,
    username: string,
    user_id: number,
    rol:number
}

export interface IRqLogin {
    username: string,
    password: string
}

export interface IRegistroCompleto {
    registro_id:number,
    menu_id:number,
    hospital_id:number,
    usuario_id:number,
    fecha: Date,
    raciones:number,
    hospital: string,
    username: string,
    menu: string,
    categoria: string,
    codigo:string,
    tipo:string
}

export interface IHospital {
    hospital_id: number,
    descripcion: string
}

export interface IMenuCategoria {
    menu_id: number,
    categoria_id:number,
    menu: string,
    categoria: string,
    tipo: string,
    coeficiente: number
}
export interface ICategoria {
    categoria_id: number,
    descripcion: string
}

export interface IUsuariosRegistros {
    usuario_id: number,
    username: string
}

export interface IMenuDetalle {
    detalle_id: number,
    insumo_id: string,
    gramos: string,
    menu_id: number,
    insumo: string,
    categoria_ins_id: number,
    categoria_ins: string
}

export interface IInsumo {
    insumo: string,
    insumo_id:number,
    categoria_ins_id:number,
    categoria:string
}

export interface ICategoriaInsumo {
    categoria_ins_id:number,
    descripcion:string
}

export interface IaddMenu {
    categoria_id: number,
    tipo:string,
    descripcion: string,
    coeficiente: number
}