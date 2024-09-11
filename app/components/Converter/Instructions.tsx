import styled from "styled-components"

export default function Instructions(){
    return(
        <Container>
            <li><strong>Step 1:</strong> Upload your video file</li>
            <li><strong>Step 2:</strong> Select the format you want and click the &quot;Convert&quot; button</li>
            <li><strong>Step 3:</strong> Wait for the converter to do the work</li>
            <li><strong>Step 4:</strong> Download your new file</li>
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
        color: var(--green);
        margin-right: 1rem
    }

`