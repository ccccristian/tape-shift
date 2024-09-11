import styled from "styled-components"
import { IoStopSharp } from "react-icons/io5";
export default function LoadingBar({loadingRatio, isConverting, exit} : {
    loadingRatio: number,
    isConverting: boolean,
    exit: ()=> void
}){
    if(!isConverting) return
    return(
        <>
            <BarComponent loadingRatio={loadingRatio} ledCount={7}/>
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
    const opacity = ledOpacity(loadingRatio, ledCount, index)

    return(
        <Led $opacity={opacity}/>
    )
}
function ledOpacity(ratio: number, count: number, position: number){
    const portion = 100 / count
    const progress = ratio * 100
    const start = portion * position
    const end = start + portion
    let opacity; //Calculate LED opacity
    if (progress >= end) {
        opacity = 100 // Progress has passed the LED, so it is fully lit
      } else if (progress >= start) {
        opacity = (progress - start) / portion * 100
        // Increase opacity as progress passes through the LED
      } else {
        opacity = 0 // Progress has not reached the LED yet, keep it at minimum opacity
      }
    return opacity
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