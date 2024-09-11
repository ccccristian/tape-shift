import { useVideoThumbnail } from "@/app/utils/custom-hooks"
import Image from "next/image"
import styled from "styled-components"

export default function Thumbnail({file} :{
    file: File | null
}){
    const {name, url} = useVideoThumbnail(file)
    return(
        <Container>
            <ThumbnailContainer>
                {
                    url ?
                    <Image src={url} width={1000} height={1000} alt="Your video thumbnail"/>
                    : <Warning>No preview available</Warning>
                }
            </ThumbnailContainer>
            {
                name && 
                <FileName>{name}</FileName>
            }
        </Container>
    )
}
const Container = styled.div`
    margin-bottom: 2rem;
    background-color: var(--gray);
    border-radius: 0.3rem;
    overflow: hidden;
    font-family: var(--mainFont);

`
const ThumbnailContainer = styled.div`
    background-color: #000;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    height: 15rem;
    width: 100%;
    & img{
        max-height: 100%;
        min-width: fit-content;
        min-height: fit-content;
        width: auto;
        max-width: 100%;
    }
`

const FileName = styled.p`
    font-size: 1.2rem;
    padding: 0.5rem;
`

const Warning = styled.h5`
    font-size: 1.3rem;
    color: var(--gray);
    font-weight: 400;
`