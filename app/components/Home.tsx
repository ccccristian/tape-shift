'use client'
import { useFfmpeg } from '@/app/utils/custom-hooks'
import Header from './Header'
import InputFile from './InputFile'
import styled from 'styled-components'

export default function Home(){
    /* eslint-disable */
    const {loaded, message, videoSrc, handleFileChange, transcode} = useFfmpeg()
    return(
        <main>
            <Header/>
            <h2>First steps</h2>
            <Converter>
            {!loaded && <p>Loading...</p>}
                <InputFile handleFileChange={handleFileChange}/>
                <button type='button' onClick={transcode}>Submit</button>
                {
                    videoSrc &&
                    <video src={videoSrc} controls/>
                }
                <p>{message}</p>
            </Converter>

        </main>
    )
}

const Converter = styled.section`
    display: flex;
    
`