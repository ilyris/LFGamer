import React, {useState, useEffect} from 'react'
import S from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router';

const env_be_url = process.env.REACT_APP_PROD_BE_URL || "http://localhost:8080/";

function Profile(props) {
    const params = useParams();

    const [profileData, setProfileData] = useState({});
    const discordData = JSON.parse(useSelector(state => state.root.discordUserData))

    useEffect(() => {
        axios.post(`${env_be_url}profile`,{user_id: params.id})
        .then(async res => {
            console.log(res.data)
            return await setProfileData(res.data)
        })
        .catch(err => console.log(err))
    }, [profileData])
    return (
        <Main>
            <UserNameContainer>
                <DiscordAvatar src={`https://cdn.discordapp.com/avatars/300623558265143296/${discordData.avatar}.png`}/>
                <Heading><Username>{`${discordData.username}`}</Username></Heading>
            </UserNameContainer>
            <AboutMeContainer>
                <Label>About Me</Label>
                <AboutMe>
                    {profileData.about_me}
                </AboutMe>
            </AboutMeContainer>
            <LeagueInformationContainer>
                <Label>League of Legends information</Label>
                <RankContainer>
                    <RankImage  src={`${process.env.PUBLIC_URL}/assets/ranked-emblems/Emblem_${profileData.rank}.png`} />
                </RankContainer>
                <RankContainer>
                    {profileData.champions && profileData.champions.map(champion => {
                        return(
                            <ChampionImage  src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion}.png`} />
                        )
                    })}
                </RankContainer>
                <RankContainer>
                    {profileData.roles && profileData.roles.map(role => {
                        return(
                            <ChampionImage  src={`${process.env.PUBLIC_URL}/assets/ranked-positions/Position_Diamond-${role}.png`} />
                        )
                    })}
                </RankContainer>

            </LeagueInformationContainer>
        </Main>
    )
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