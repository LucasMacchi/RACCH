import type { Metadata } from "next";
import {Roboto} from "next/font/google"

export const metadata: Metadata = {
  title: "RACCH",
  description: "Sistema de Racionamiento de Chaco",
  icons:{
    icon: "/logo_small.webp"
  }
};

const font = Roboto({weight: "500",subsets:["latin"]})


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={font.className} style={{margin: 0}}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
