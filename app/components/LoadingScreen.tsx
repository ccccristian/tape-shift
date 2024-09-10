import Image from "next/image";
import { CSSProperties } from "styled-components";

export default function LoadingScreen(){
    return(
        <div style={containerStyle}>
            <Image src="/logo.svg" width={200} height={50} style={imageStyle} alt="Casssete loading"/>
            <Image src="/loading.gif" width={150} height={100} style={imageStyle} alt="Casssete loading"/>
            <p style={textStyle}>Loading...</p>
        </div>
    )
}

const containerStyle : CSSProperties = {
   width: '100%',
   height: '100%',
   position: 'absolute',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
}
const imageStyle : CSSProperties = {
    height: 'auto'
}
const textStyle : CSSProperties = {
    fontSize: '2rem',
    fontWeight: '700'
}