import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import S from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import Logo from '../Logos/Logo';
import '../../App.css';




const Desktopmenu = (props) => {
    const isLoggedIn = useSelector( state => state.root.isLoggedIn);
    console.log(isLoggedIn);
    // const loggedInUser = useSelector( state => state.root.loggedInUser);
    // const dispatch = useDispatch();
    // const signOut = () => {
    //     if (isLoggedIn) {
    //         dispatch({ type: 'SANITIZE_USER', payload: false });
    //         localStorage.removeItem('auth-token');
    //     }
    // }
    return (
        <StyledHeader>
            <StyledNavigationContainer>
                {/* <Logo /> */}
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
                        {/* {isLoggedIn
                            ? <StyledLi>
                                <StyledLink to={{ pathname: `/profile/${loggedInUser.id}`, state: { loggedInUser } }}>Profile</StyledLink>
                              </StyledLi>
                            : null
                         } */}
                        <StyledLi>
                            {isLoggedIn ? <StyledLink secondary="true"  to="/">Sign Out</StyledLink> : <StyledLink to="/login">Sign In</StyledLink>}
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

const StyledNavigationContainer = S.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 auto;
    width: 70%;
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
    padding: 1rem 2.4rem;
    border-radius: 20px;
    text-decoration: none;
    background-color: ${props => props.secondary ? '#0077ff' : 'transparent'}
    transition: all ease-in-out 120ms;
    :hover {
        background-color: ${props => props.secondary ? '#003c80' : 'rgba(194, 194, 194, 0.4)'}
    }
    :active {
        box-shadow: 0px 0px 5px #232323c7;
        transform: scale(1.1);
    }
`;
