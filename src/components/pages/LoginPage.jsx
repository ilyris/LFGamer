import React, {useEffect} from 'react'
import S from 'styled-components';
import axios from 'axios';

export function LoginPage(props) {
    useEffect( () => {
        axios.get('http://localhost:8080/login', {  
            headers: {
              'content-type': 'application/json', // Tell the server we are sending this over as JSON
            //   'authorization': authToken, // Send the token in the header from the client.
            },
        })
        .then( (res) => {
            console.log(res);
        } )
        .catch( (err) =>{
            console.log(err)
        })
    })

    return (
        <h1>
           Discord Login 
        </h1>
    )
}
export default LoginPage
