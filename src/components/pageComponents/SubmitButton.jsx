import React from 'react'
import S from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function SubmitButton(props) {    
    return (
        <Button cancelButton={props.cancelButton} onClick={props.handleCancel}>{props.text}
            <StyledIconArrow icon={faArrowRight} />  
        </Button>
    )
}
const StyledIconArrow = S(FontAwesomeIcon)`
    transform: translateX(-100%);
    color: #fff;
    font-size: 18px;
    position: absolute;
    opacity: 0;
    transition: all ease-in-out 300ms;
    margin-left: 8px;
    margin-top: 5px;
    color: #191818;
`;

const Button = S.button`
    padding: 10px 30px;
    border-radius: 40px;
    color: #fff;
    font-size: 20px;
    position: relative;
    transition: all ease 300ms;
    background: ${props => props.cancelButton ? '#b90000' : 'linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%)' };
    box-shadow:  2px 2px 12px 0px #494848c4;
    border: none;
    &:hover {
        padding-right: 50px;
        cursor: pointer;
        ${StyledIconArrow} {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;