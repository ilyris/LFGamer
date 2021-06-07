import React from 'react'
import S from 'styled-components';

export function Playercard(props) {
    

    return (
        <Card>
            <Username>
                {`${props.username}#${props.discriminator}`}
            </Username>
        </Card>
    )
}
export default Playercard

const Card = S.div`
    min-width: 250px;
    width: 25%;
    border-radius: 15px;
    background-color: red;
`;
const Username = S.h6`
    font-size: 26px;
    color: #000;
    margin: 20px 0;
`;
