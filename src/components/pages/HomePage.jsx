import React from 'react';
import {Link, } from 'react-router-dom';
import S from 'styled-components';
import image from '../../assets/LFG_header_illustration.png';
import MainTitle from '../pageComponents/MainTitle';
import {SubTitle} from '../pageComponents/SubTitle';
import {MainPageButton} from '../pageComponents/MainPageButton'
import {About} from '../sections/About';
import {Contact} from '../sections/Contact';
 function Homepage(props) {
    return (
        <>
        <HeroSection>
            <Container>
            <TextContainer>
                <MainTitle 
                    title={'Welcome to '}
                    importantTitleText={'LFGamer'}
                />
                <SubTitle 
                    text1={'We are your'}
                    text={' League of Legends '}
                    text2={`duo provider. You're only a few clicks away from finding your duo partner to climb up the League of legends ladder`}

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
        <About />
        <Contact />
        </>
    )
}
export default Homepage;

const HeroSection = S.section`
    width: 100%;
    margin: 0 auto;
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
    width: 55%;
    flex: 1;
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
    height: 450px;
`;