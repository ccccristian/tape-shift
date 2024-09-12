import styled from "styled-components"
import { useFfmpeg, useFile } from '@/app/utils/custom-hooks'

import VideoPlayer from './VideoPlayer'
import Instructions from "./Instructions"

import LoadingBar from '../LoadingBar'
import OptionsComponent from "./Options"
import { NotifyFunction } from "@/app/utils/definitions"
import { devices } from "@/app/utils/devices"

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
    flex-direction: column;
    width: 100%;
    min-height: 90vh;
    align-items: start;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 5%;
    padding-top: 3rem;
    @media ${devices.tablet}{
        flex-direction: row;

    }
    @media ${devices.laptop}{
        padding: 0 10%;
        padding-top: 3rem;

    }
    @media ${devices.laptopL}{
        max-width: 100rem;
        padding: 0;
        padding-top: 3rem;
        margin: 0 auto;
    }
`



const ContentDisplay = styled.div`
    box-sizing: border-box;
    flex-grow: 1;
    max-width: 100%;

    @media ${devices.tablet}{
        max-width: 50%;
    }
`
