'use client'
import { createFFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useEffect, useRef, useState } from "react";
import { NotifyFunction, Thumbnail, validFormats, VideoProfile } from "./definitions";


const ffmpegOptions = {
  corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
  wasmPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm',
  workerPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js'
}

export function useFfmpeg(notify : NotifyFunction, videoFile: File | null) {
    const [loaded, setLoaded] = useState(false)

    const [ newVideoProfile, setNewVideoProfile] = useState<VideoProfile | null>(null)

    const [isConverting, setIsConverting] = useState(false)
    const [loadingRatio, setLoadingRatio] = useState(0)

    const ffmpegRef = useRef(createFFmpeg(ffmpegOptions))

    //Load when component is mounted
    useEffect(()=>{
        load()
    }, [])
    const load = async () => {
      const ffmpeg = ffmpegRef.current
      await ffmpeg.load()
      setLoaded(true)
    }
    const transcode = async (format: string) => {
      if (!videoFile) {
        notify("Please select a video file first.")
        return
      }
      if(!validFormats.includes(format)){
        notify("Please select a valid format.")
        return
      }
      if(isConverting) return
      setNewVideoProfile(null)

      setIsConverting(true)

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
      
      const url = URL.createObjectURL(new Blob([data.buffer], { type: `video/${format}` }))

      setNewVideoProfile({url, name: newFileName})

      setLoadingRatio(0)
      setIsConverting(false)
      notify('Video converted successfully')
    }
    async function exit(){
      if(!isConverting) return
      await ffmpegRef.current.exit()
      load()
      setLoaded(false)
      setLoadingRatio(0)
      setIsConverting(false)
    }
    return {
      loaded, 
      loadingRatio, 
      newVideoProfile,
      transcode,
      exit,
      isConverting
    }
  }


export function useVideoThumbnail(file: File | null){
  const initial = { name: '', url: ''}
  const [thumbnail, setThumbnail] = useState<Thumbnail>(initial)

  useEffect(()=>{
    setThumbnail(initial)
    generateThumbnail()
  }, [file])

  const generateThumbnail = () => {
    if(!file){
      setThumbnail(initial)
      return
    }
    const name = file.name

    const video = document.createElement('video')
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    video.src = URL.createObjectURL(file)
    video.addEventListener('loadeddata', () => {
      video.currentTime = 1  // You can set the time to capture another frame
    })

    video.addEventListener('seeked', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      if(!ctx) return
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const url = canvas.toDataURL('image/jpeg')
      setThumbnail({url, name})
      URL.revokeObjectURL(video.src)  // Clean the temporary Url
    })
  }

  return thumbnail
}



export function useLoading(){
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setLoading(false)
  }, [])

  return loading
}

export function useFile(){
  const [videoFile, setVideoFile] = useState<File | null>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0]
    if(!file) return

    const format = file.name.split('.')[1]
    if(!validFormats.includes(format)) return
    
    setVideoFile(file)
  }
  return {videoFile, handleFileChange}
}