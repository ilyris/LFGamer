import React, { useState, useEffect } from 'react'
import S from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';
import { Page404 } from './Page404';
import { Loader } from '../loaders/loader';
const env_be_url = process.env.REACT_APP_PROD_BE_URL || "http://localhost:8080/";

function Profile(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.root.isLoading);
    const [profileData, setProfileData] = useState({});
    const [display404, setDisplay404] = useState(false);
    useEffect(() => {
        axios.post(`${env_be_url}profile`, { user_id: params.id })
            .then(async res => {

                if(Object.keys(res.data).length == 0) {
                    console.log('display 404')
                    await dispatch({type: 'REMOVE_ISLOADING'});
                    await setDisplay404(true);
                } else {
                    console.log('display profile data')
                    await dispatch({type: 'REMOVE_ISLOADING'});                    
                    await setProfileData(res.data);
                }
            })
            .catch(err => console.log(err))
    }, [])

    if(isLoading) {
        return <Loader />
    } else if(display404) {
        return <Page404 />
    } else {
        return (
            <Main>
                <UserNameContainer>
                    {profileData.user ? <DiscordAvatar src={`https://cdn.discordapp.com/avatars/300623558265143296/${profileData.user.avatar}.png`} /> : null}
                    {profileData.user && <Heading><Username>{`${profileData.user.username}`}</Username></Heading>}
    
                </UserNameContainer>
                <AboutMeContainer>
                    <Label>About Me</Label>
                    <AboutMe>
                        {profileData.profile && profileData.profile.about_me}
                    </AboutMe>
                </AboutMeContainer>
                <LeagueInformationContainer>
                    <Label>League of Legends information</Label>
                    <RankContainer>
                        {profileData.profile && <RankImage src={`${process.env.PUBLIC_URL}/assets/ranked-emblems/Emblem_${profileData.profile.rank}.png`} />}
    
                    </RankContainer>
                    <RankContainer>
                        {profileData.profile && profileData.profile.champions.map(champion => {
                            return (
                                <ChampionImage src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion}.png`} />
                            )
                        })}
                    </RankContainer>
                    <RankContainer>
                        {profileData.profile && profileData.profile.roles.map(role => {
                            return (
                                <ChampionImage src={`${process.env.PUBLIC_URL}/assets/ranked-positions/Position_Diamond-${role}.png`} />
                            )
                        })}
                    </RankContainer>
    
                </LeagueInformationContainer>
            </Main>
        )        
    }
}
export default Profile;

const Main = S.main`
    display: flex;
    flex-flow: row wrap;
    width: 75%;
    margin: 50px auto;
`;
const UserNameContainer = S.section`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;
const Heading = S.h2`
    font-size: 60px;
    font-weight: bold;
    display: flex;
    align-items: center;
    padding-right: 20px;
    color: #fff;
`;
const Username = S.span`
    color: #76ee74;
    font-size: 60px;
    padding-left: 20px;
`;
const DiscordAvatar = S.img`
    width: auto;
    border-radius: 50%;
`;
const AboutMeContainer = S.section`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 50px;
`;

const Label = S.p`
    font-size: 20px;
    color: #ddd;
    width: 100%;
    text-align: left;
`;

const AboutMe = S.p`
    font-size: 26px;
    color: #fff;
    text-align: left;
    text-transform: capitalize;
`;

const LeagueInformationContainer = S.section`
    width: 100%;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 50px;
    display: flex;
`;

const RankContainer = S.div`
    width: fit-content;
    border-radius: 15px;
    background-color: #222;
    padding: 40px;
    box-sizing: border-box;
    margin-top: 20px;
    height: fit-content;
    flex: 1;
    margin-right: 30px;
`;

const RankImage = S.img`
    width: 250px;
    height: auto;
`;
const ChampionImage = S.img`
    width: 115px;
    height: auto;
    border-radius: 50%;
    margin-right: 15px;
`;