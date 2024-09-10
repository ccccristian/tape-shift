import styled from "styled-components"
import { IoStopSharp } from "react-icons/io5";
export default function LoadingBar({loadingRatio, isConverting, exit} : {
    loadingRatio: number,
    isConverting: boolean,
    exit: ()=> void
}){
    if(!isConverting) return
    // const percentage = `${Math.round(loadingRatio * 100)}%`
    return(
        <>
            <BarComponent loadingRatio={loadingRatio} ledCount={7}/>
            {/* <Percentage>{loadingRatio > 0 && percentage}</Percentage> */}
            <StopButton type="button" className="main-button" onClick={exit}>
                <span>
                    <IoStopSharp />
                    Stop
                </span>
            </StopButton>
        </>

    )
}
function BarComponent({loadingRatio, ledCount} :{
    loadingRatio: number,
    ledCount: number
}){
    return(
        <Bar>
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


const Bar = styled.div`
    display: flex;
    align-items: start;
    width: 100%;
    transition: width .3s;
    column-gap: 3px;
    margin-bottom: 2rem;

`
const StopButton = styled.button`
    margin-bottom: 2rem;
    height: 100%;
`

const Led = styled.div<{$opacity: number}>`
    flex-grow: 1;
    height: 2rem;
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