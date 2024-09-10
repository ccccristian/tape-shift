import styled from "styled-components"
import { useFfmpeg } from '@/app/utils/custom-hooks'

import VideoPlayer from './VideoPlayer'
import Instructions from "./Instructions"

import LoadingBar from '../LoadingBar'
import OptionsComponent from "./Options"
export default function Converter({notify} : {
    notify: (message: string) => void
}){
    const {
        loaded, 
        loadingRatio, 
        thumbnail, 
        videoSrc, 
        handleFileChange, 
        videoName,
        transcode,
        exit,
        isConverting
    } = useFfmpeg(notify)
    return(
        <ConverterContainer>
            <OptionsComponent 
                loaded={loaded}
                handleFileChange={handleFileChange}
                transcode={transcode}
                thumbnail={thumbnail}
                isConverting={isConverting}
            />
            <ContentDisplay>

                <LoadingBar exit={exit} isConverting={isConverting} loadingRatio={loadingRatio}/>
                <VideoPlayer url={videoSrc} videoName={videoName ?? 'video'}/>
                <Instructions/>
            </ContentDisplay>

        </ConverterContainer>
    )
}


const ConverterContainer = styled.div`
    display: flex;
    width: 80%;
    align-items: start;
    padding-top: 3rem;
    margin: 0 auto;
`



const ContentDisplay = styled.div`
width: 50%;

`
