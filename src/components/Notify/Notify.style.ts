import styled, { css } from "styled-components";

interface NotifyIslandProps {
    displayNotify: boolean;
    expandNotify: boolean;
}

const NotifyContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const NotifyIsland = styled.div<NotifyIslandProps>`
    cursor: pointer;
    padding: 1rem;
    position: absolute;
    top: -10rem;
    width: 8rem;
    height: 1rem;
    border-radius: 1.5rem;
    background-color: aqua;
    transition: all .3s ease-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
                rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    

    ${({ displayNotify }) => displayNotify && css`
        top: 1rem !important;
    `}

    ${({ expandNotify }) => expandNotify && css`
        width: 30rem;
        height: 4rem;
        padding: 0.5rem;

    `}
`;
const CloseButton = styled.span`
`;


export { NotifyContainer, NotifyIsland, CloseButton }