import styled from "styled-components"
import { FaFilm } from "react-icons/fa";
import { devices } from "@/app/utils/devices";
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
    margin-bottom: 1rem;
    width: 100%;
    @media ${devices.tablet}{
        max-width: 14rem;
    }
`
const Label = styled.label`
    width: 100%;
`
const Input = styled.input`
    display: none;
`