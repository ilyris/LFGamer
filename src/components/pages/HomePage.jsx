import axios from 'axios';
import React,{useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import S from 'styled-components';
import image from '../../assets/Season_2019_-_Challenger_1.png';

 function Homepage(props) {
    return (
        <HeroSection>
            <Container>
            <TextContainer>
                <HeroTitle>Welcome to <ImportantText>LFGamer</ImportantText></HeroTitle>
                <SubTitle>Your <ImportantText>League of Legends</ImportantText> duo gamer provider. Youre s few clicks away from finding your duo gamer</SubTitle>
                <ButtonContainer>
                    <StyledLink>Gamers</StyledLink>
                    <StyledLink>Coaches</StyledLink>
                </ButtonContainer>
            </TextContainer>
            <ImageContainer>
                <HookGraphic src={image} />
            </ImageContainer>
            </Container>
        </HeroSection>
    )
}
export default Homepage;

const HeroSection = S.section`
    width: 100%;
    margin: 0 auto;
    background-color: #01000f;
`;
const Container = S.div`
    widtH: 70%;
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
`;
const TextContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    margin-top: 100px;
    margin-bottom: 100px;
    width: 40%;
`;
const ImportantText = S.span`
    color: #76ee74;
`;
const HeroTitle = S.h2`
    font-size: 50px;
    color: #fff;
    font-weight: 600;
    width: 100%;
    text-align: left;
    line-height: 50px;
`;
const SubTitle = S.p`
    font-size: 24px;
    width: 100%;
    text-align: left;
    margin: 20px 0;
    color: #fff;
`;

const ButtonContainer = S.div`
    display: flex;
    // justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    text-transform: uppercase;
`;
const StyledLink = S(Link)`
    border-width: 3px;
    border: 4px solid;
    border-image-slice: 1;
    border-style: solid;
    border-image-source: linear-gradient(to right, rgba(118,238,116,1) 0%, rgba(0,152,142,1) 100%);
    color: #fff;
    padding: 10px 20px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: .5px;
    margin-right: 50px;
    transition: 120ms ease-in-out;
    &:hover {
       background: linear-gradient(to right, rgba(118,238,116,1) 0%, rgba(0,152,142,1) 100%);
    }
`;
const ImageContainer = S.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const HookGraphic =  S.img`
    height: 350px;
`;