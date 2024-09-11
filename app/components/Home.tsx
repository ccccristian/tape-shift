'use client'
import Converter from './Converter/Converter'
import Header from './Header'
import { useState } from 'react'
import Notification from './Notification'
import Footer from './Footer'

export default function Home(){
    const [notification, setNotification] = useState<string |null>(null)

    function notify(message: string){
        setNotification(message)
    }
    return(
        <main>
            <Header/>
            <Converter notify={notify}/>
            <Notification dismiss={()=>setNotification(null)} message={notification}/>
            <Footer/>
        </main>
    )
}

