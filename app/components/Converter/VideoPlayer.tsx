import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { IoMdPlay } from "react-icons/io";
import { IoMdPause } from "react-icons/io";
import { RiDownload2Fill } from "react-icons/ri";
import { VideoProfile } from "@/app/utils/definitions";

export default function VideoPlayer({newVideoProfile} : {
    newVideoProfile: VideoProfile | null
}){
    const playerRef = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [videoError, setVideoError] = useState<boolean>(false)
    function handlePlayPause()
    {
        setPlaying(!playing)
    }
    if(!newVideoProfile) return
    const {url, name} = newVideoProfile

    return(
        <Container>
            <PlayerWrapper>
                    <VideoName>{name}</VideoName>
                    {
                        videoError && 
                        <ErrorDisplay>No preview available</ErrorDisplay>
                    }
                    <ReactPlayer 
                    playing={playing} 
                    ref={playerRef} 
                    url={url}  
                    className="player"
                    onReady={()=>{setVideoError(false)}}
                    onError={()=>{setVideoError(true)}}
                    >
                        Error loading the video
                    </ReactPlayer>

                <Controls>
                    <PlayButton type="button" className="main-button" onClick={handlePlayPause}>
                        <span>
                            {
                                playing ?
                                <IoMdPause size={15}/>
                                : 
                                <IoMdPlay size={15}/>
                            }
                        </span>
                    </PlayButton>
                    <DownloadButton href={url} download={name} className="main-button">
                        <span>
                            {
                                <RiDownload2Fill size={15}/>
                            }
                            Download
                        </span>
                    </DownloadButton>
                </Controls>
            </PlayerWrapper>
            <p></p>
        </Container>
    )
}
const VideoName = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    color: var(--gray);
    font-size: 1.6rem;
    margin: 1rem;

`
const Container = styled.div`
background-color: var(--gray);

`
const PlayerWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    margin-bottom: 3rem;
    border-radius: 0.3rem;
    overflow: hidden;
    & .player{
        max-width: 100%;
    }
`
const Controls = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    bottom: 0;
    left: 0;
    padding: 0.5rem;
    padding-top: 3rem;
    width: 100%;

    background: linear-gradient(to bottom, transparent, #000);
`
const PlayButton = styled.button`
    background-color: var(--darkblue);
    border-radius: 50%;
    margin-right: 0.5rem;
    & span{
        border-radius: 50%;
        background-color: var(--blue);
    }
`
const DownloadButton = styled.a`
    background-color: var(--darkred);
    border-radius: 0.3rem;
    margin-right: 0.5rem;
    & span{
        border-radius: 0.3rem;
        background-color: var(--red);
        & svg{
            margin-right: 0.3rem;
        }
    }
`

const ErrorDisplay = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    color: var(--gray);
    font-size: 1.6rem;
`