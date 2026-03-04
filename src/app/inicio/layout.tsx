import LinkMenu from "../Componets/LinkMenu";
import decodeJWT from "@/utils/decodeJWT";
import { text_2_s_style } from "@/utils/styles";
import { CSSProperties } from "react";
import logout from "@/utils/logout";
import LogoutBtn from "../Componets/LogoutBtn";



export default async function Layout({children}: Readonly<{children: React.ReactNode}>) {

  const linkListStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column"
  }
  let userData = await decodeJWT()

  const logoutFn = async (): Promise<boolean> => {
    "use server"
    await logout()
    return true
  }

  if(!userData) userData = {username:"NaN",user_id:0,email:"NaN",rol:10}

  return (
        <div style={{display: "flex", justifyContent: "start",margin: 0}}>
          <div style={{paddingLeft:10 ,marginRight: 25, width: 250, height: "100vh",backgroundColor: "#4A6EE8", position: "fixed"}}>
            <div style={linkListStyle}>
              <h1></h1>
            </div>
            <div style={linkListStyle}>
                <LinkMenu where="/inicio" titulo="inicio" />
            </div>
            <div style={linkListStyle}>
                <LinkMenu where="/inicio/menus" titulo="Menus" />
            </div>
            <div style={linkListStyle}>
                <LinkMenu where="/insumos" titulo="insumos" />
            </div>
            <div >
                <LogoutBtn logoutFn={logoutFn}/>
            </div>
          </div>
          <div style={{flex: 1,marginTop: 30,marginLeft: 260}}>
            {children}
          </div>
        </div>        
  );
}