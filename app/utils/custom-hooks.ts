'use client'
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";


export function useFfmpeg() {
    const [loaded, setLoaded] = useState(false)
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [videoSrc, setVideoSrc] = useState<string | null>(null)
    const [videoName, setVideoName] = useState<string | null>(null)
    const [message, setMessage] = useState<string |null> (null)
    const [loadingRatio, setLoadingRatio] = useState(0)
    const thumbnail = useVideoThumbnail(videoFile)

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

      // const videoURL = URL.createObjectURL(file)
      // setVideoSrc(videoURL)

    }
    const transcode = async (format: string) => {
      if (!videoFile) {
        alert("Please select a video file first.")
        return
      }
      if(!validFormats.includes(format)){
        alert("Please select a valid format.")
        return
      }
      setVideoSrc(null)

      const ffmpeg = ffmpegRef.current
      const fileName = videoFile.name.split('.').slice(0, -1).join('.')
      const newFileName = `${fileName}.${format}`
      await ffmpeg.setProgress((progress)=>{
        setLoadingRatio(progress.ratio)
      })
      await ffmpeg.FS('writeFile', fileName, await fetchFile(videoFile))

      await ffmpeg.FS('writeFile', 'arial.ttf', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/arial.ttf'))

      await ffmpeg.run('-i', fileName, '-preset', 'fast', newFileName)

      const data = ffmpeg.FS('readFile', newFileName)
      
      setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: `video/${format}` })))
      setVideoName(newFileName)
      setLoadingRatio(0)
    }
  
    return {loaded, videoName, loadingRatio, thumbnail, message, videoSrc, handleFileChange, transcode}
  }


export function useVideoThumbnail(file: File | null){
  const [thumbnailUrl, setThumbnail] = useState<string |null>(null)
  const [fileName, setFileName] = useState<string |null>(null)

  useEffect(()=>{
    setFileName(null)
    setThumbnail(null)
    generateThumbnail()
  }, [file])

  const generateThumbnail = () => {
    if(!file){
      setThumbnail(null)
      return
    }
    setFileName(file.name)

    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    video.src = URL.createObjectURL(file)
    video.addEventListener('loadeddata', () => {
      video.currentTime = 1  // Se puede ajustar el tiempo para capturar otro frame
    })

    video.addEventListener('seeked', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      if(!ctx) return
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      setThumbnail(canvas.toDataURL('image/jpeg'))
      URL.revokeObjectURL(video.src)  // Limpiar la URL temporal
    })
  }

  return {thumbnailUrl, fileName}
}

const validFormats = [
  'mp4', 
  'avi', 
  'webm',
  'wmv' ,
  'mpg' ,
  'mpeg',
  'm4v' ,
]