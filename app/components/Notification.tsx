import styled from "styled-components"

export default function Notification({message, dismiss}: {
    message: string | null,
    dismiss: () => void
}){
    if(message === null) return

    return(
        <Container>
            <Message>{message}</Message>
            <button type="button" className="main-button" onClick={dismiss}>
                <span>Ok</span>
            </button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    background-color: var(--foreground);
    border-radius: 0.3rem;

    animation: fade-in forwards .3s;
    & button span{
        padding: 0.8rem;
        font-size: 1.3rem;
    }
    @keyframes fade-in{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 100%;

        }
    }

`

const Message = styled.p`
    font-size: 1.3rem;
    width: 100%;
    color: var(--white);
    margin-right: 3rem;
`