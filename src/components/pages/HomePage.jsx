import React from 'react';
import {Link, } from 'react-router-dom';
import S from 'styled-components';
import image from '../../assets/Season_2019_-_Challenger_1.png';
import MainTitle from '../pageComponents/MainTitle';
import {SubTitle} from '../pageComponents/SubTitle';
import {MainPageButton} from '../pageComponents/MainPageButton'
 function Homepage(props) {
    return (
        <HeroSection>
            <Container>
            <TextContainer>
                <MainTitle 
                    title={'Welcome to '}
                    importantTitleText={'LFGamer'}
                />
                <SubTitle 
                    text1={'Your'}
                    text={' League of Legends '}
                    text1={`duo gamer provider. You're a few clicks away from finding your duo gamer`}

                />
                <ButtonContainer>
                    <MainPageButton 
                        text={'Gamers'}
                        path={'/duo'}
                    />
                    <MainPageButton 
                        text={'Coaches'}
                        path={'/coaches'}
                    />
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
    widtH: 75%;
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

const ButtonContainer = S.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
    text-transform: uppercase;
`;

const ImageContainer = S.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const HookGraphic =  S.img`
    height: 350px;
`;