import React, {useState, useEffect, useRef} from 'react';
import S from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCog } from "@fortawesome/free-solid-svg-icons";

import {PrimaryCtaLink} from '../pageComponents/PrimaryCtaLink';
export function Verification(props) {
    const overlayRef = useRef(null);
    const [clipboardText, setClipboardText] = useState('Copy To Clipboard');
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

    const copyToClipboard = (e) => {
        const copyText = e.target.textContent;
        const cb = navigator.clipboard;
        cb.writeText(copyText).then(() => {
            setClipboardText('Copied')
        });
        setTimeout(() => setClipboardText('Copy To Clipboard'), 1000)

    }
    return (
        <>
        <Overlay ref={overlayRef}></Overlay>
        <ModalContainer>
            <ModalHeading>{'Verification Code'}</ModalHeading>
            <HelperText>Here is your code: <VerificationCodeContainer><Code onClick={copyToClipboard}>{props.uuid}</Code> <ClipboardAlert><ClipboardIcon icon={faClipboard}/>{clipboardText}</ClipboardAlert></VerificationCodeContainer> Follow these steps to enter this code into your LOL client</HelperText>
            <ol class="list-group list-group-numbered mx-auto mb-5 mt-0 w-75">
                <li class="list-group-item fs-3">Copy the verification code</li>
                <li class="list-group-item fs-3">Login to your LOL account</li>
                <li class="list-group-item fs-3">Click the  <div class="mx-1 d-inline"><FontAwesomeIcon icon={faCog}/></div>settings button in the top right of your LOL client</li>
                <li class="list-group-item fs-3">Click on the "Verification" tab on the left sidebar</li>
                <li class="list-group-item fs-3">Paste in your verification code from LFG</li>
                <li class="list-group-item fs-3">Click "Save" to save the verification code in your LOL client</li>
                <li class="list-group-item fs-3">Click the "verify" button below</li>
            </ol>
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
    bottom: 20%;
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
    width: 100%;
`;
const ClipboardIcon = S(FontAwesomeIcon)`
    font-size: 16px;
    display: block;
    margin-right: 10px;
`;
const ClipboardAlert = S.div`
    height: auto;
    position: absolute;
    top: 30px;
    right: 0;
    opacity: 0;
    transition: all ease-in-out 120ms;
    background-color: #6e6e6ed9;
    padding: 5px;
    width: 200px;
    color: #fff;
    font-size: 12px;
    border-radius: 15px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const VerificationCodeContainer = S.div`
    position: relative;
    display: inline-block;
    &:hover {
        cursor: pointer;
        text-decoration: underline;

        ${ClipboardAlert} {
            opacity: 1;
        }

    }

`;
const Code = S.div`
    font-style: italic;
    color: rgb(0,152,142);
    position: relative;
    display: inline-block;


`
const ButtonContainer = S.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;
