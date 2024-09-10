import styled from "styled-components"
import InputFile from "./InputFile"
import { useState } from "react"
import { BsArrowRepeat } from "react-icons/bs";
import Thumbnail from "./Thumbnail"

export default function OptionsComponent({loaded, handleFileChange, thumbnail, transcode, isConverting}:
    {
        loaded: boolean,
        handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        transcode : (format:string)=> void,
        thumbnail: {
            thumbnailUrl: string | null
            fileName: string | null
        },
        isConverting: boolean
    }
){
    const [selectedFormat, setSelectedFormat] = useState<string>('mp4')
    let disabled = !loaded
    if(thumbnail.fileName === null || isConverting) disabled = true

    return(
        <Container>
            <TitleComponent/>
                <Buttons>
                    <InputFile handleFileChange={handleFileChange} disabled={!loaded}/>
                    <Thumbnail thumbnail={thumbnail}/>
                    <Flex>
                        <div className="main-dropdown">
                            <select id="format" disabled={disabled} onChange={(e) => setSelectedFormat(e.target.value)} >
                                <option value="mp4">Mp4</option>
                                <option value="avi">Avi</option>
                                <option value="wmv">Wmv</option>
                                <option value="mpg">Mpg</option>
                                <option value="mpeg">Mpeg</option>
                                <option value="m4v">M4v</option>
                                <option value="webm">Webm</option>
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
    margin: 0 auto;
    width: 50%;
    padding-right: 3rem; 
    hr{
        margin: 1rem 0;
        border: none;
        border-bottom: 1px solid var(--gray);
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
    margin-left: 1rem;
    background-color: var(--darkgreen);
    & span{
        background-color: var(--green);
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