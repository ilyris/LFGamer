import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Playercard from '../player/PlayerCard'

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
        <>
          {user && user.username ? <Playercard username={user.username} discriminator={user.discriminator}/> : null}
        </>
    )
}

export default Profilepage