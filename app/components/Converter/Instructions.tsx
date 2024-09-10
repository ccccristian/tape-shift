import styled from "styled-components"

export default function Instructions(){
    return(
        <Container>
            <li><strong>1</strong> Upload your video file</li>
            <li><strong>2</strong> Select the format you want and click the &quot;Convert&quot; button</li>
            <li><strong>3</strong> Wait for the converter to do the work</li>
            <li><strong>4</strong> Download your new file</li>
        </Container>
    )
}


const Container = styled.ol`
    list-style: none;
    font-size: 1.2rem;
    margin-bottom: 3rem;
    font-family: var(--mainFont);
    & li{
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
    }
    & li strong{
        background-color: var(--blue);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        padding: 0.3rem;
        margin-right: 1rem;
        border-radius: 50%;
        position: relative;
        user-select: none;
        font-family: var(--secFont);
        font-weight: 400;
        &::after{
            content: "";
            width: 100%;
            height: 100%;
            background-color: var(--darkblue);
            border-radius: 50%;

            position: absolute;
            transform: translateY(18%);
            z-index: -1;
        }
    }

`