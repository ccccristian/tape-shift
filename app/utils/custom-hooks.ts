'use client'
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";


export function useFfmpeg() {
    const [loaded, setLoaded] = useState(false)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [videoSrc, setVideoSrc] = useState<string | null>(null)
    const [message, setMessage] = useState<string |null> (null)
    const ffmpegRef = useRef(createFFmpeg({
      corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
      wasmPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm',
      workerPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js'
    }))
    useEffect(()=>{
        load()
    }, [])
    const load = async () => {
      const ffmpeg = ffmpegRef.current
      ffmpeg.setLogger(({ message: m }) => {
        setMessage(m)
      })
      // toBlobURL is used to bypass CORS issue, urls with the same
      // domain can be used directly.
      await ffmpeg.load()
      setLoaded(true)
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if(!file) return
      setVideoFile(file)
      const videoURL = URL.createObjectURL(file)
      setVideoSrc(videoURL)

    }

    const transcode = async () => {
      if (!videoFile) {
        alert("Please select a video file first.")
        return
      }

      const ffmpeg = ffmpegRef.current
      const fileName = videoFile.name.split('.').slice(0, -1).join('.')

      await ffmpeg.FS('writeFile', fileName, await fetchFile(videoFile))

      await ffmpeg.FS('writeFile', 'arial.ttf', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/arial.ttf'))

      await ffmpeg.run(
        '-i', 
        fileName, 
        '-vf',
        'drawtext=fontfile=/arial.ttf:text=\'ffmpeg.wasm\':x=10:y=10:fontsize=24:fontcolor=white',
        'output.mp4')
      const data = ffmpeg.FS('readFile', 'output.mp4')
      
      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })))
    }
  
    return {loaded, message, videoSrc, handleFileChange, transcode}
  }