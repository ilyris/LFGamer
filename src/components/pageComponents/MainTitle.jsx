import React from 'react'
import S from 'styled-components';
import { ImportantTitleText } from './ImportantTitleText';

function MainTitle(props) {
    return (
        <Title>
            {props.title}
            {props.importantTitleText && <ImportantTitleText text={props.importantTitleText} /> }
        </Title>
    )
}
export default MainTitle;

const Title = S.h2`
    font-size: 70px;
    color: #fff;
    font-weight: 600;
    width: 100%;
    text-align: left;
    line-height: 50px;
`;
