export type VideoProfile = {
    url: string,
    name: string
}
export type NotifyFunction = (message: string ) => void

export type Thumbnail = {
    url: string
    name: string
}


export const validFormats = [
    'mp4', 
    'avi', 
    'webm',
    'wmv' ,
    'mpg' ,
    'mpeg',
    'm4v' ,
  ]
  