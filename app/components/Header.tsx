'use client'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { devices } from '../utils/devices'
import { VscMenu } from "react-icons/vsc";
import {useMenuDisplay} from '@/app/utils/custom-hooks'
import { useRef } from 'react'
export default function Header(){
    const menuRef = useRef<HTMLDivElement>(null)
    const [isDisplayed, toggle] = useMenuDisplay(menuRef)
    return(
        <Container ref={menuRef}>
            <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={150} height={150}/>
            </Link>
            <LinkList displayMenu={isDisplayed} />

            <MenuButton  type="button" onClick={()=>toggle(true)}>
                <VscMenu size={25} />
            </MenuButton>
        </Container>
    )
}
function LinkList({displayMenu} : {
    displayMenu: boolean,
}){
    const links = [
        {label: 'Github', href: 'https://github.com/ccccristian/tape-shift'},
        {label: 'Documentation', href: 'https://meza-cristian.vercel.app/documentation/tapeshift'},
    ]
    return (
        <LinkListContainer className={`${!displayMenu && 'hidden'}`}>
            {
                links.map((link) =>{
                    const {href, label} = link
                    return(
                        <Link key={href} href={href}>{label}</Link>
                    )
                })
            }
        </LinkListContainer>
    )
}

const Container = styled.header`
    position: relative;
    border-bottom: 1px solid var(--gray);
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    font-family: var(--mainFont);
    & img{
        margin: 0 1rem;
    }
    & a{
        height: 6rem;
        display: flex;
        align-items: center;
        font-weight: 700;
    }
    @media ${devices.tablet}{
        padding: 0 5rem;
    }
`

const LinkListContainer = styled.div`
    position: absolute;
    display: flex;
    right: 0;
    top: 100%;
    background-color: var(--white);
    padding: 1rem;
    border-radius: 0.3rem;
    align-items: center;
    justify-content: center;
    height: 100%;
    &.hidden {
        display: none;
    }
    & a{
        font-weight: 500;
        margin-right: 1rem;
    }
    &:last-child{
        margin-right: 0;

    }
    @media ${devices.mobileL}{
        position: static;
        background-color: transparent;
        padding: 0;
        &.hidden {
            display: flex;
            
        }
    }
`
const MenuButton = styled.button`
    border: none;
    background-color: transparent;
    width: 3rem;
    margin-right: 1rem;
    @media ${devices.mobileL}{
        display: none;
    }
`