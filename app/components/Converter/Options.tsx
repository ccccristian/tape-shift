import styled from "styled-components"
import InputFile from "./InputFile"
import { useState } from "react"
import { BsArrowRepeat } from "react-icons/bs";
import Thumbnail from "./Thumbnail"
import { validFormats } from "@/app/utils/definitions";
import { devices } from "@/app/utils/devices";

export default function OptionsComponent({loaded, handleFileChange, videoFile, transcode, isConverting}:
    {
        loaded: boolean,
        handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        transcode : (format:string)=> void,
        videoFile: File | null
        isConverting: boolean
    }
){
    const [selectedFormat, setSelectedFormat] = useState<string>('mp4')


    // Convert input is disabled if Ffmpeg is not loaded, 
    // the user did not uploaded any file or there is a file in current conversion
    const disabled = !loaded || !videoFile || isConverting

    return(
        <Container>
            <TitleComponent/>
                <Buttons>
                    <InputFile handleFileChange={handleFileChange}/>
                    <Thumbnail file={videoFile}/>
                    <Flex>
                        <div className="main-dropdown">
                            <select id="format" disabled={disabled} onChange={(e) => setSelectedFormat(e.target.value)} >
                                {validFormats.map(format =>{
                                    return(
                                        <option key={format} value={format}>{format}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <ConvertButton disabled={disabled} type='button' onClick={()=>transcode(selectedFormat)} className="main-button">
                            <span>
                            Convert
                            <BsArrowRepeat size={20}/>
                            </span>
                        </ConvertButton>
                    </Flex>

                </Buttons>
        </Container>
    )
}

function TitleComponent(){
    return(
        <>
            <Title>
                Convert your videos
            </Title>
            <Credits>Powered by Ffmpeg.wasm</Credits>
            <hr/>
        </>
    )
}
const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    box-sizing: border-box;
    width: 100%;
    hr{
        margin: 1rem 0;
        border: none;
        border-bottom: 1px solid var(--gray);
    }
    @media ${devices.tablet}{
        padding-right: 3rem; 
        width: 50%;

    }

`
const Buttons = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    width: 100%;
`
const ConvertButton = styled.button`
    margin-bottom: 1rem;
    height: 100%;
    width: 100%;
    margin-left: 1rem;
    background-color: var(--darkgreen);
    & span{
        background-color: var(--green);
    }
    @media ${devices.tablet}{
        max-width: 10rem;
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
const Flex = styled.div`
    display: flex;
    align-items: center;

`