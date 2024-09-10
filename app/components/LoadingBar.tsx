import styled from "styled-components"

export default function LoadingBar({loadingRatio, message} : {
    loadingRatio: number,
    message: string
}){
    // const percentage = `${Math.round(loadingRatio * 100)}%`
    return(
        <>
            <BarComponent loadingRatio={loadingRatio} ledCount={7}/>
            {/* <Percentage>{loadingRatio > 0 && percentage}</Percentage> */}
            <Message>{message}</Message>
        </>

    )
}
function BarComponent({loadingRatio, ledCount} :{
    loadingRatio: number,
    ledCount: number
}){
    return(
        <Bar $loadingRatio={loadingRatio}>
            {
            Array(ledCount).fill(null).map((led, index)=>{
                return(
                    <LedComponent 
                    loadingRatio={loadingRatio} 
                    ledCount={ledCount}
                    index={index}
                    key={index}
                    />
                )
            })}
        </Bar>
    )
}

function LedComponent({loadingRatio, ledCount, index}:{
    loadingRatio: number,
    ledCount: number,
    index: number
}){
    const ledPosition = index 
    const portion = 100 / ledCount
    const progress = loadingRatio * 100
    const ledStart = portion * ledPosition
    const ledEnd = ledStart + portion

    let opacity; //Calcular opacidad del led
    if (progress >= ledEnd) {
        opacity = 100 // El progreso ha pasado el LED, por lo que está completamente encendido
      } else if (progress >= ledStart) {
        opacity = (progress - ledStart) / portion * 100
        // Aumenta la opacidad de 50% a 100% conforme el progreso pasa por el LED
      } else {
        opacity = 0 // El progreso aún no ha alcanzado el LED, mantenlo en la opacidad mínima
      }
    return(
        <Led $opacity={opacity}/>
    )
}


const Bar = styled.div<{$loadingRatio: number;}>`
    display: flex;
    width: 100%;
    height: 2rem;
    transition: width .3s;
    column-gap: 10px;

`

const Message = styled.p`
    width: 100%;
    margin-bottom: 1rem;
`

const Led = styled.div<{$opacity: number}>`
    flex-grow: 1;
    height: 100%;
    border-radius: 0.3rem;
    background-color: var(--gray);
    position: relative;
    &::after{
        content: "";
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        background-color: var(--green);
        border-radius: 0.3rem;
        opacity: ${(props) => props.$opacity}%;
        transition: opacity 0.2s;
    }
`