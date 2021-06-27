import React from 'react'
import S from 'styled-components';
import { ImportantTitleText } from './ImportantTitleText';

export function SubTitle(props) {
    return (
        <Title>
            {props.text1}
            <ImportantTitleText text={props.text}/>
            {props.text2}
        </Title>
    )
}
const Title = S.p`
    font-size: 24px;
    width: 100%;
    text-align: left;
    margin: 20px 0;
    color: #fff;
`;
