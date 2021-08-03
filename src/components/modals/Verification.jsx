import React, {useState, useEffect, useRef} from 'react';
import S from 'styled-components'
import {PrimaryCtaLink} from '../pageComponents/PrimaryCtaLink'
export function Verification(props) {
    const overlayRef = useRef(null);
    useOutsideAlerter(overlayRef, props.modalActive)
    function useOutsideAlerter(ref, hook) {
        useEffect(() => {
            function handleClickOutside(event) {

                if (ref.current.contains(event.target)) {
                    hook(false);
                } else {
                    hook(true);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <>
        <Overlay ref={overlayRef}></Overlay>
        <ModalContainer>
            <ModalHeading>{'Verification Code'}</ModalHeading>
            <HelperText>Here is your code: <Code>{props.uuid}</Code> Enter this code into your LOL client</HelperText>
            <HelperText>Follow these steps:</HelperText>
            <ButtonContainer>
                <PrimaryCtaLink handleClick={props.handleVerification} text={'Verify'}/>
            </ButtonContainer>
        </ModalContainer>
        </>
    )
}
const Overlay = S.div`
    background-color: rgba(0,0,0,0.6);
    width: 100%;
    position: fixed;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
`;
const ModalContainer = S.div`
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: fixed;
    background-color: #fff;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 35%;
    width: 50%;
`;
const ModalHeading = S.h3`
    font-size: 32px;
    color: #000;
    padding-bottom: 20px;
`;
const HelperText = S.p`
    font-size: 22px;
    color: #000;
    padding-bottom: 20px;
    width: 100%;
`;
const Code = S.span`
    font-style: italic;
    color: rgb(118, 238, 116);
`
const ButtonContainer = S.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
