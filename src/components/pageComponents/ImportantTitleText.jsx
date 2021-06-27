import React from 'react'
import S from 'styled-components';

export function ImportantTitleText(props) {
    return (
        <ImportantText>
          {props.text}  
        </ImportantText>
    )
}

const ImportantText = S.span`
    color: #76ee74;
`;
