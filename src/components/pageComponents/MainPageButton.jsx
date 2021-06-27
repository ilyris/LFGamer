import React from 'react'
import S from 'styled-components';
import { Link } from 'react-router-dom';

export function MainPageButton(props) {
    
    return (
        <StyledLink to={`${props.path}`}>
            {props.text}
        </StyledLink>
    )
}
const StyledLink = S(Link)`
    border-width: 3px;
    border: 4px solid;
    border-image-slice: 1;
    border-style: solid;
    border-image-source: linear-gradient(to right, rgba(118,238,116,1) 0%, rgba(0,152,142,1) 100%);
    color: #fff;
    padding: 10px 20px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: .5px;
    margin-right: 50px;
    transition: 120ms ease-in-out;
    &:hover {
       background: linear-gradient(to right, rgba(118,238,116,1) 0%, rgba(0,152,142,1) 100%);
    }
`;
