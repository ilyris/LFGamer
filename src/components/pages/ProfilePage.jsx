import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Playercard from '../player/PlayerCard'
import S from 'styled-components';

export function Profilepage(props) {
    const [user, setUser] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8080/login/user')
        .then(res => {
            setUser(res.data);
            console.log(res)
        })
        .catch(err => console.log(err));
    },[])


    return (
        <MainContainer>
            {user && user.username ? <Playercard username={user.username} discriminator={user.discriminator}/> : null}
            <RiotConnectButton>
                Riot Connect
            </RiotConnectButton>
        </MainContainer>
    )
}

export default Profilepage;
const MainContainer = S.section`
    display: flex;
    flex-flow: row wrap;
`;
const RiotConnectButton = S.a`
    padding: 10px 25px;
    
`;