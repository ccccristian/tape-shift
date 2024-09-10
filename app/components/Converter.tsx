import styled from "styled-components"
import { useFfmpeg } from '@/app/utils/custom-hooks'
import InputFile from "./InputFile"
import VideoPlayer from './VideoPlayer'
import Instructions from "./Instructions"
import { useState } from "react"
import { BsArrowRepeat } from "react-icons/bs";
import Thumbnail from "./Thumbnail"
import LoadingBar from './LoadingBar'
export default function Converter(){
    const {
        loaded, 
        loadingRatio, 
        thumbnail, 
        message, 
        videoSrc, 
        handleFileChange, 
        videoName,
        transcode} = useFfmpeg()

    return(
        <ConverterContainer>
            <OptionsComponent 
                loaded={loaded}
                handleFileChange={handleFileChange}
                transcode={transcode}
                thumbnail={thumbnail}
            />
            <ContentDisplay>
                <LoadingBar message={message ?? ''} loadingRatio={loadingRatio}/>
                <VideoPlayer url={videoSrc} videoName={videoName ?? 'video'}/>
                <Instructions/>
            </ContentDisplay>

        </ConverterContainer>
    )
}
function OptionsComponent({loaded, handleFileChange, thumbnail, transcode}:
    {
        loaded: boolean,
        handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        transcode : (format:string)=> void,
        thumbnail: {
            thumbnailUrl: string | null
            fileName: string | null
        }
    }
){
    const [selectedFormat, setSelectedFormat] = useState<string>('mp4')

    return(
        <OContainer>
            <TitleComponent/>
            {!loaded && <p>Loading...</p>}
                <OButtons>
                    <InputFile handleFileChange={handleFileChange}/>
                    <Thumbnail thumbnail={thumbnail}/>
                    <Flex>
                        <div className="main-dropdown">
                            <select id="format" disabled={thumbnail.fileName === null} onChange={(e) => setSelectedFormat(e.target.value)} >
                                <option value="mp4">Mp4</option>
                                <option value="avi">Avi</option>
                                <option value="wmv">Wmv</option>
                                <option value="mpg">Mpg</option>
                                <option value="mpeg">Mpeg</option>
                                <option value="m4v">M4v</option>
                                <option value="webm">Webm</option>
                            </select>
                        </div>

                        <ConvertButton disabled={thumbnail.fileName === null} type='button' onClick={()=>transcode(selectedFormat)} className="main-button">
                            <span>
                            Convert
                            <BsArrowRepeat size={20}/>
                            </span>
                        </ConvertButton>
                    </Flex>

                </OButtons>
        </OContainer>
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

const ConverterContainer = styled.div`
    display: flex;
    width: 80%;
    align-items: start;
    padding-top: 3rem;
    margin: 0 auto;
`
const OContainer = styled.section`
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
const OButtons = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    width: 100%;
`
const ContentDisplay = styled.div`
width: 50%;

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
const Flex = styled.div`
display: flex;
align-items: center;

`