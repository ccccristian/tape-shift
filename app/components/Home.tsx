'use client'
import { useFfmpeg } from '@/app/utils/custom-hooks'

export default function Home(){
    /* eslint-disable */
    const {loaded, videoSrc, handleFileChange, transcode} = useFfmpeg()
    return(
        <main>
            <h1>Tape Shift project</h1>
            <h2>First steps</h2>
            {!loaded && <p>Loading...</p>}
        </main>
    )
}