'use client'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
export default function Header(){
    return(
        <Container>
            <Link href="/">
                <Image src="/logo.svg" alt="Logo" width={150} height={150}/>
            </Link>
            <LinkList/>
        </Container>
    )
}
function LinkList(){
    const links = [
        {label: 'Github', href: '/'},
        {label: 'Documentation', href: '/'},
    ]
    return (
        <LinkListContainer>
            {
                links.map(link =>{
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
    border-bottom: 1px solid var(--gray);
    display: flex;
    justify-content: space-between;
    font-size: 1.1rem;
    font-family: var(--mainFont);
    padding: 0 5rem;
    & img{
        margin: 0 1rem;
    }
    & a{
        height: 6rem;
        display: flex;
        align-items: center;
        font-weight: 700;
    }
`

const LinkListContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 2rem;
    & a{
        font-weight: 500;
        margin-right: 1rem;
    }
`