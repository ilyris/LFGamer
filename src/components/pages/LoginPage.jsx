import React, {useEffect} from 'react'
import axios from 'axios';
const env_be_url = process.env.REACT_APP_PROD_BE_URL || "http://localhost:8080/";

export function LoginPage(props) {
    useEffect( () => {
        axios.get(`${env_be_url}login`, {  
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
