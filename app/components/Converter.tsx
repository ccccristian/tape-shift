import styled from "styled-components"
import { useFfmpeg } from '@/app/utils/custom-hooks'
import InputFile from "./InputFile"

export default function Converter(){
    const {loaded, message, videoSrc, handleFileChange, transcode} = useFfmpeg()

    return(
        <Container>
            <Title>
                Convert your videos
            </Title>
                <Credits>Powered by Ffmpeg.wasm</Credits>
            <hr/>
        {!loaded && <p>Loading...</p>}
            <InputFile handleFileChange={handleFileChange}/>
            <button type='button' onClick={transcode}>Submit</button>
            {
                videoSrc &&
                <video src={videoSrc} controls/>
            }
            <p>{message}</p>
        </Container>
    )
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 3rem auto;
    hr{
        margin: 2rem 0;
        border: none;
        border-bottom: 1px solid var(--gray);
    }
`
const Title = styled.h1`
    font-size: 3rem;
    font-family: var(--secFont);
` 
const Credits = styled.span`
    font-size: 2rem;
    font-family: var(--mainFont);
    font-weight: 500;
    font-size: 1.2rem;
    color: var(--green);
    font-family: var(--mainFont);
`

