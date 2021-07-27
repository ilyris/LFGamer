import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import S from 'styled-components';
import Logo from '../../assets/logo.svg';
import { decodeJWT } from '../../helperFuncs/cookie';
import '../../App.css';
import {env_be_url} from '../../globalVars/envURL';


const Desktopmenu = (props) => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('token');
    const isLoggedIn = useSelector( state => state.root.isLoggedIn);

    const [decodedJWT, setDecodedJWT] = useState({})

    const signOut = () => {
        if (isLoggedIn) {
            dispatch({ type: 'SANITIZE_USER', payload: false });
            localStorage.removeItem('token');
        }
    }
    useEffect(() => {
        if(!jwt) return
        setDecodedJWT(decodeJWT(jwt))
    }, [jwt])

    
    return (
        <StyledHeader>
            <StyledNavigationContainer>
                <LinkedLogo to="/">
                    <LogoImg src={Logo} />
                </LinkedLogo>
                <StyledNavigation>
                    <StyledUL>
                        <StyledLi>
                            <StyledLink  to="/">Home</StyledLink> 
                        </StyledLi>
                        <StyledLi>
                            <StyledLink   to="/duo">Duo</StyledLink> 
                        </StyledLi>
                        <StyledLi>
                            <StyledLink  to="/">Courses</StyledLink> 
                        </StyledLi>
                        {isLoggedIn && decodedJWT.payload
                            ? <StyledLi>
                                <StyledLink to={{ pathname: `/profile/${decodedJWT.payload.user_id}`}}>Profile</StyledLink>
                              </StyledLi>
                            : null
                         }
                        <StyledLi>
                            {isLoggedIn ? <StyledLink onClick={signOut} secondary="true"  to="/">Sign Out</StyledLink> : <InternalStyledLink href={`${env_be_url}login`}>Sign In</InternalStyledLink>}
                        </StyledLi>
                    </StyledUL>
                </StyledNavigation>
            </StyledNavigationContainer>




        </StyledHeader>
    );
}

export default Desktopmenu;

const StyledHeader = S.header`
    width: 100%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    top: 0;
    background-color: #191818;
    // box-shadow: 0px 0px 5px #232323c7;
    position: relative;
    z-index: 5;
    @media (max-width: 860px) {
        display: none;
      }
`;
const LogoImg = S.img`
      width: 85px;
      height: auto;
`;
const LinkedLogo = S(Link)`

`;
const StyledNavigationContainer = S.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 75%;
`;
const StyledNavigation = S.nav`
    display: flex;
    align-items: center;
`;

const StyledUL = S.ul`
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
const StyledLi = S.li`
    list-style: none;
    margin: 0 5px;
    display: flex;
    align-items: center;
`;
const StyledLink = S(Link)`
    display: flex;
    height: 2rem;
    text-transform: capitalize;
    font-weight: 600;
    align-items: center;
    font-size: 1.6rem;
    color: #fff;
    height: 2rem;
    padding: 2rem 2.4rem;
    border-radius: 20px;
    text-decoration: none;
    background-color: ${props => props.secondary ? '#0077ff' : 'transparent'};
    transition: all ease-in-out 120ms;
    :hover {
        background-color: ${props => props.secondary ? '#003c80' : 'rgba(194, 194, 194, 0.4)'}
    }
    :active {
        box-shadow: 0px 0px 5px #232323c7;
        transform: scale(1.1);
    }
`;
const InternalStyledLink = S.a`
    display: flex;
    height: 2rem;
    text-transform: capitalize;
    font-weight: 600;
    align-items: center;
    font-size: 1.6rem;
    color: #fff;
    height: 2rem;
    padding: 2rem 2.4rem;
    border-radius: 20px;
    text-decoration: none;
    background: linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%);
    transition: all ease-in-out 120ms;
    :hover {
        color: #01000f;
    }
    :active {
        box-shadow: 0px 0px 5px #232323c7;
        transform: scale(1.1);
    }
`;