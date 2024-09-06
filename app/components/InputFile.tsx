import styled from "styled-components"

export default function InputFile({handleFileChange} : {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}){
    return(
        <Container>
            <Label htmlFor="file">Select file</Label>
            <Input type="file" id="file" onChange={handleFileChange}/>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 3rem;
    transform: translate(-1%);
    width: fit-content;
    &::before{
        content: "";
        position: absolute;
        border-radius: 0.3rem;
        width: 100%;
        z-index: -1;
        height: 100%;
        background-color: var(--darkred);
        left: 0;
        top: 0.5rem;
    }
    &:hover label{
        transform: translateY(-3%);
    }
    &:active label{
        transform: translateY(10%);
    }
`
const Label = styled.label`
    background-color: var(--red);
    width: 25rem;
    padding: 1rem;
    border-radius: 0.3rem;
    cursor: pointer;
    color: var(--white);
    transition: transform .3s;
    font-size: 1.5rem;
`
const Input = styled.input`
    display: none;
`