import React from 'react'
import S from 'styled-components';
import { Link } from 'react-router-dom';
export function Page404(props) {
    
    return (
        <Main>
            <PageNotFoundContainer>
                <RedirectContainer>
                    <RedirectButtonContainer>
                        <RedirectTitle>Don't cry</RedirectTitle>
                        <RedirectButton to='/'>Back to Home</RedirectButton>
                    </RedirectButtonContainer>
                    <RedirectTextContainer>
                        <MainText>It's just a 404 error!</MainText>
                        <SubText>The page you are looking for is not available</SubText>
                    </RedirectTextContainer>
                </RedirectContainer>
                <Heading>404</Heading>
            </PageNotFoundContainer> 
        </Main>
    )
}

const Main = S.main`
    display: flex;
    flex-flow: row wrap;
`;

const PageNotFoundContainer = S.section`
    display: flex;
    flex-flow: row wrap;
    width: 75%;
    justify-content: center;
    margin: 0 auto;
    position: relative;
`;

const Heading = S.h2`
    font-size: 300px;
    color: #76ee74;
    font-weight: bold;
    margin-top: 50px;
`;
const RedirectContainer = S.div`
    flex-flow: row wrap;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
`;
const RedirectButtonContainer = S.div`
    display: flex;
    flex-direction: column;
    border-right: 2px solid #fff;
    padding: 5px 40px 5px 0;
    justify-content: center;
    flex: 1;
`;

const RedirectTitle = S.h6`
    font-size: 30px;
    color: #fff;
    text-align: center;

`;
const RedirectButton = S(Link)`
    padding: 10px 15px;
    font-size: 20px;
    color: #fff;
    background: linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%);
    border-radius: 25px;
    margin-top: 20px;
`;
const RedirectTextContainer = S.div`
    display: flex;
    flex-direction: column;
    padding: 5px 0px 5px 40px;
    justify-content: center;
    width: 50%;
`;
const MainText = S.p`
    font-size: 18px;
    color: #fff;
    font-weight: 500;
    text-align: left;
`;
const SubText = S.p`
    font-size: 14px;
    color: #fff;
    margin-top: 20px;
    text-align: left;
`;