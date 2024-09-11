import styled from "styled-components"
import { useFfmpeg, useFile } from '@/app/utils/custom-hooks'

import VideoPlayer from './VideoPlayer'
import Instructions from "./Instructions"

import LoadingBar from '../LoadingBar'
import OptionsComponent from "./Options"
import { NotifyFunction } from "@/app/utils/definitions"
export default function Converter({notify} : {
    notify: NotifyFunction
}){
    // The video that user uploads
    const { videoFile, handleFileChange } = useFile()

    const { loaded, isConverting, loadingRatio, newVideoProfile, transcode, exit } = useFfmpeg(notify, videoFile)
    return(
        <ConverterContainer>
            <OptionsComponent 
                loaded={loaded}
                handleFileChange={handleFileChange}
                transcode={transcode}
                videoFile={videoFile}
                isConverting={isConverting}
            />
            <ContentDisplay>

                <LoadingBar exit={exit} isConverting={isConverting} loadingRatio={loadingRatio}/>
                <VideoPlayer newVideoProfile={newVideoProfile}/>
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
