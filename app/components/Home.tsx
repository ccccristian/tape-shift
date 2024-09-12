'use client'
import Converter from './Converter/Converter'
import Header from './Header'
import { useState } from 'react'
import Notification from './Notification'
import Footer from './Footer'
import styled from 'styled-components'

export default function Home(){
    const [notification, setNotification] = useState<string |null>(null)

    function notify(message: string){
        setNotification(message)
    }
    function dismiss(){
        setNotification(null)
    }
    return(
        <Main>
            <Header/>
            <Converter notify={notify}/>
            <Notification dismiss={dismiss} message={notification}/>
            <Footer/>
        </Main>
    )
}

const Main = styled.main`
    min-height: 100vh;
`