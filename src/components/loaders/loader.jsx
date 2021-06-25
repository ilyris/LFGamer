import React from 'react'
import S, {keyframes} from 'styled-components';
import {ReactComponent as Logo} from '../../assets/logo.svg';

export function Loader(props) {
    return (
        <MainLoadingContainer>
            <StyledLogo />
            <LoadingBar></LoadingBar>
        </MainLoadingContainer>
    )
}

const MainLoadingContainer = S.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    justify-content: center;
    align-items: center;
`;
const loading = keyframes`
    0%, 100% {transform: translateX(0); }
    50% {transform: translateX(300%);}
`;
const LoadingBar = S.div`
    width: 200px;
    height: 5px;
    position: relative;
    border-radius: 5px;
    background-color: #5a5a5a;
    margin-top: 50px;
    &:after {
        content: '';
        height: 5px;
        width: 50px;
        position: absolute;
        left: 0;
        background-color: rgb(118, 238, 116);
        transition: all cubic-bezier(0.4, 0, 1, 1) 400ms;
        animation-name: ${loading};
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }
`;
const StyledLogo = S(Logo)`
    widtH: 200px;
    height: auto;
`;


