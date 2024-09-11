import styled from "styled-components"
import { FaFilm } from "react-icons/fa";
export default function InputFile({handleFileChange} : {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}){
    return(
        <>
        <Label htmlFor="file">
            <Container className="main-button" >
                <span>
                    Select file
                    <FaFilm size={20}/>
                </span>
            </Container>
        </Label>
        <Input type="file" id="file" onChange={handleFileChange} accept="video/*"/>
        </>
    )
}

const Container = styled.div`
    position: relative;
    width: fit-content;
    margin-bottom: 1rem;
    width: 100%;

`
const Label = styled.label`
    width: 25rem;
`
const Input = styled.input`
    display: none;
`