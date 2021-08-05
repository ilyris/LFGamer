import React, { useState, useEffect } from 'react'
import S from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams, } from 'react-router';
import { Page404 } from './Page404';
import { Loader } from '../loaders/loader';
import {env_be_url} from '../../globalVars/envURL';
import {Responsivebarchart} from '../charts/ResponsiveBarChart'
import Highcharts from  "highcharts/highstock";
import highchartsMore from "highcharts/highcharts-more.js"
import solidgauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import summonerJsonData from '../../data/LeagueSummonerSpells.json';
import leagueItemJsonData from '../../data/LeagueItems.json';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import image from '../../assets/league-of-legends-game-logo.png';
import {v4 as uuidv4} from 'uuid';
import { Verification } from '../modals/Verification'

highchartsMore(Highcharts)
solidgauge(Highcharts)

function Profile(props) {
    // get the dynamic id from the /profile route
    const params = useParams();
    const dispatch = useDispatch();

    const isLoading = useSelector(state => state.root.isLoading);
    const [leagueAccountInfo, setLeagueAccountInfo] = useState({})
    const [leagueProfileData, setLeagueProfileData] = useState({});
    const [discordData, setDiscordData] = useState({});
    const [display404, setDisplay404] = useState(false);

    const [uuid, setUuid] = useState(uuidv4());
    const [modalActive, setModalActive] = useState(false);
    const [profile, setProfile] = useState({
        about_me: '',
        league_alias: '',
    })

    const onChange = (event) => {
        setProfile({...profile, [event.target.name]: event.target.value});
    }
    const handleLeagueConnect = async (event) => {
        event.preventDefault();
       
        try {
            setModalActive(true)
        } 
        catch(err) {
            console.log(err)
        }
    }
    const handleVerification = async (e) => {
        e.preventDefault();
        dispatch({type: 'SET_ISLOADING'});
        try {
            const res = await axios.post(`${env_be_url}setup/getSummonerInfo`, {user_id: params.id, leagueAlias: profile.league_alias, uuid: uuid})
            console.log(res.data);

            // add a confirmation message before we push the user.
            if(res.data) {
                await setLeagueAccountInfo(res.data);
            }
        } 
        catch(err) {
            console.log(err)
        }

    }

    let totalGames, winPercentage, lossPercentage
    if(typeof leagueProfileData.leagueInfo != 'undefined') {
        totalGames = leagueProfileData.leagueInfo.wins + leagueProfileData.leagueInfo.losses
        winPercentage =  Math.round((leagueProfileData.leagueInfo.wins) / totalGames * 100)
        lossPercentage =  Math.round((leagueProfileData.leagueInfo.losses) / totalGames * 100)
    }
    // Highchart options
    const options = {
        chart: {
          type: 'solidgauge',
          height: '60%',
          width: 400,
          backgroundColor: '#222'
          },
        // events: {
        //     render: renderIcons
        // },
        title: {
          text: `Games Played`,
          style: {
                color: '#FFF',
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: typeof leagueProfileData.leagueInfo !== "undefined" ? `Wins: ${leagueProfileData.leagueInfo.wins}| Losses: ${leagueProfileData.leagueInfo.losses}` : `Wins: 0 | Losses: 0`,
            style: {
                color: '#FFF',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                color: '#fff',
                fontSize: '12px'
            },
            // valueSuffix: '%',
            pointFormat: '{series.name}<br><span style="font-size:1.5em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: function (labelWidth) {
                return {
                    x: (this.chart.chartWidth - labelWidth) / 2,
                    y: (this.chart.plotHeight / 2) + 40
                };
            }
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: '#ffffff78',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: '#6bef715e',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: '#a900004f',
                borderWidth: 0
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false,
                rounded: true
            }
        },
        series: [{
            name: 'Games',
            data: [{
                color: '#fff',
                radius: '112%',
                innerRadius: '88%',
                y: totalGames
            }]
        }, {
            name: 'Wins',
            data: [{
                color: '#6bef71', 
                radius: '87%',
                innerRadius: '63%',
                y: winPercentage
            }],
            tooltip: {
                valueSuffix: '%',
            }
        }, {
            name: 'Losses',
            data: [{
                color: '#a90000',
                radius: '63%',
                innerRadius: '39%',
                y: lossPercentage
            }],
            tooltip: {
                valueSuffix: '%',
            }
        }]
      };

    useEffect(() => {
        axios.post(`${env_be_url}profile`, { user_id: params.id })
            .then(async res => {
                console.log(res.data);
                // check if our profile_Data object is empty
                if(Object.keys(res.data).length == 0) {
                    // if empty, there is no profile, so remove the loader
                    await dispatch({type: 'REMOVE_ISLOADING'});
                    // set 404 page
                    await setDisplay404(true);
                } 

                else {
                    // Remove loader

                    // Display profile data
                    await setDiscordData(res.data);
                }
                // await dispatch({type: 'REMOVE_ISLOADING'});

            })
            .catch(err => console.log(err))

    }, [params.id])

    useEffect(() => {

            axios.post(`${env_be_url}setup/getLeagueInfo`, {user_id: params.id })
            .then(async res => {
                    await setLeagueProfileData(res.data);
                    // Remove loader
                    await dispatch({type: 'REMOVE_ISLOADING'});                    

                    // Display profile data
                }
            )
            .catch(async err => {
                await dispatch({type: 'REMOVE_ISLOADING'});                    

                await setDisplay404(true);

                console.log(err)
            })
    }, [leagueProfileData.length, leagueAccountInfo])

    if(isLoading) {
        return <Loader />
    } else if(display404) {
        return <Page404 />
    } else {
        return (
            <Main>
                <UserNameContainer>
                    {discordData.user ? <DiscordAvatar src={`https://cdn.discordapp.com/avatars/${discordData.user.discord_id}/${discordData.user.avatar}.png`} /> : null}
                    {discordData.user && <Heading><Username>{`${discordData.user.username}`}</Username></Heading>}
                </UserNameContainer>

                {typeof leagueProfileData.leagueInfo != 'undefined' ?

                    <LeagueInformationContainer>
                        <Label>League of Legends information</Label>
                        <RankContainer style={{flexBasis: '100%'}}>
                            <div>
                                {typeof leagueProfileData.leagueInfo != 'undefined' ? <RankImage src={`${process.env.PUBLIC_URL}/assets/ranked-emblems/Emblem_${leagueProfileData.leagueInfo.tier}.png`} /> :<RankImage src={`${process.env.PUBLIC_URL}/assets/ranked-emblems/Emblem_Unranked.png`} /> }
                                {typeof leagueProfileData.leagueInfo != 'undefined' ? <RankText>Rank: {leagueProfileData.leagueInfo.rank}</RankText> :  <RankText>Rank: Unranked</RankText>}                            
                            </div>
                            <div>
                                <HighchartsReact highcharts={Highcharts} options={options}/>
                            </div>
                            <div>
                                {Object.keys(leagueProfileData).length > 0 ?  <Responsivebarchart data={leagueProfileData.recentMatches}/> : null}
                            
                            </div>
                        </RankContainer>
                        <RankContainer>
                            {Object.keys(leagueProfileData).length > 0 && leagueProfileData.championPool.map(champion => {
                                return (
                                    <div style={{padding: '10px'}}>
                                        <ChampionImage src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion.champion}.png`} />
                                        <ChampionMastery>Mastery Points: <Points>{champion.championPoints}</Points></ChampionMastery>
                                    </div>
                                )
                            })}
                        </RankContainer>
                        {leagueProfileData.recentMatches && 
                            <RecentMatches>
                                {leagueProfileData.recentMatches.map( (match,i) => {
                                    let summonerSpell1 =  Object.values(summonerJsonData.data).filter(obj => obj.key == match.spell1Id);
                                    let summonerSpell2 =  Object.values(summonerJsonData.data).filter(obj => obj.key == match.spell2Id);

                                    // this makes me sick, store this in an array and loop it. saves us like 20 lines of code.
                                    let item1 =  leagueItemJsonData.data[match.items[0]];
                                    let item2 =  leagueItemJsonData.data[match.items[1]];
                                    let item3 =  leagueItemJsonData.data[match.items[2]];
                                    let item4 =  leagueItemJsonData.data[match.items[3]];
                                    let item5 =  leagueItemJsonData.data[match.items[4]];
                                    let item6 =  leagueItemJsonData.data[match.items[5]];
                                    let item7 =  leagueItemJsonData.data[match.items[6]];


                                    return(
                                        <RecentMatchCard>
                                                <ChampionNameImageContainer>
                                                    <div>
                                                        <ChampionName>{match.champion}</ChampionName>
                                                        <ChampionImage style={{margin: '0', width:'80px' ,height: '80px'}} src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${match.champion}.png`} />
                                                    </div>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <img style={{width: '35px', height: '35px', borderRadius: '50%'}} src={`${process.env.PUBLIC_URL}/assets/spells/${summonerSpell1[0].id}.png`}/>
                                                        <img style={{width: '35px', height: '35px', borderRadius: '50%'}} src={`${process.env.PUBLIC_URL}/assets/spells/${summonerSpell2[0].id}.png`}/>
                                                        {match.lane != "NONE" ? <img style={{width: '35px', height: '35px', borderRadius: '50%'}} src={`${process.env.PUBLIC_URL}/assets/ranked-positions/Position_${leagueProfileData.leagueInfo.tier}-${match.lane}.png`}/> : <KDAText>N/A</KDAText>}

                                                    </div>
                                                </ChampionNameImageContainer>

                                                <KDAContainer>
                                                    {match.win ? <GameStatusText isWin={true}>Victory</GameStatusText> : <GameStatusText >Defeat</GameStatusText>}
                                                    <KDAText>KDA: {match.kills}/{match.deaths}/{match.assists}</KDAText>
                                                </KDAContainer>

                                                <div style={{display: 'flex', flexFlow: 'row wrap', flex: 'auto', width: '50%'}}>
                                                    {typeof item1 != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item1.image.full}`}/> : null}
                                                    {typeof item != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item2.image.full}`}/> : null}
                                                    {typeof item3 != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item3.image.full}`}/> : null}
                                                    {typeof item4 != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item4.image.full}`}/> : null}
                                                    {typeof item5 != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item5.image.full}`}/> : null}
                                                    {typeof item6 != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item6.image.full}`}/> : null}
                                                    {typeof item7 != 'undefined' ? <ItemImg src={`${process.env.PUBLIC_URL}/assets/item/${item7.image.full}`}/> : null}
                                                </div>
                                        </RecentMatchCard>
                                    )
                                })}
                            </RecentMatches>
                        }
                    </LeagueInformationContainer>
                    : (<ConnectionContainer>
                                <RiotConnectionText>
                                  Connect your gaming accounts to LFGamer
                                </RiotConnectionText>
                                <GameConnectionCard>
                                  <GameLogo src={image} />
                                  <InputLabel>
                                    <LeagueUsernameInput
                                      onChange={onChange}
                                      type="text"
                                      name='league_alias'
                                      autoComplete="off"
                                      placeholder={'LOL Username'}
                                    />
                                  </InputLabel>
                                  <ButtonContainer>
                                    <RiotConnectButton href="/" onClick={handleLeagueConnect}>
                                      Connect
                                      <StyledIconArrow icon={faArrowRight} />
                                    </RiotConnectButton>
                                  </ButtonContainer>
                                </GameConnectionCard>
                                { modalActive ? < Verification handleVerification={handleVerification} modalActive={setModalActive}uuid={uuid}/> : null}
                              </ConnectionContainer>
                              
                        )
                }
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
    padding: 20px;
    box-sizing: border-box;
    margin-top: 20px;
    height: fit-content;
    flex: 1;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    width: 29%;
`;

const RankImage = S.img`
    width: 155px;
    height: auto;
`;
const RankText = S.p`
    font-size: 28px;
    color: #fff;
    width: 100%;
`;
const ChampionImage = S.img`
    width: 80px;
    height: auto;
    border-radius: 50%;
    margin-right: 15px;
`;
const ChampionMastery = S.p`
    font-size: 16px;
    color: #fff;
    padding-right: 10px;
`;
const Points = S.span`
    font-size: 14px;
    color: #fff;
`;

const RecentMatches = S.section`
    display: flex;
    flex-flow: row wrap;
    padding: 20px;
    border-radius: 15px;
    width: 71%;
`;
const RecentMatchCard = S.div`
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    padding: 10px;
    flex: 1 1 20%;
    background-color: rgb(34, 34, 34);
    margin-bottom: 10px;
    margin-right: 10px;
    border: 15px;
    border-radius: 15px;
    max-width: 233px;
`;
const ChampionNameImageContainer = S.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-right: 10px;
    justify-content: center;
    align-items: center;
`;
const ChampionName = S.p`
    color: #fff; 
    font-size: 16px; 
    width: 100%;
`;
const KDAContainer = S.div`
    display: flex;
    flex-direction: column;
    padding-right: 10px;
    margin: 10px 0;
    line-height: 18px;
`;
const GameStatusText = S.p`
    font-size: 24px;
    color: ${props => props.isWin ?'rgb(107, 239, 113)' : 'red'};
`;
const KDAText = S.p`
    font-size: 16px;
    color: #fff;
    padding-top: 5px;
`;
const ItemImg = S.img`
    width: 33%;
    max-width: 40px;
    height: auto;
    border-radius: 50%;
    max-height: 35px;
`;


// League connect buttons
const ConnectionContainer =S.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 50px;
`;
const GameConnectionCard = S.div`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    max-width: 250px;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 10px 0px #6c6c6cda;
`;
const GameLogo = S.img`
    width: 100px;
    height: auto;
`;
const LeagueUsernameInput = S.input`
    padding: 5px;
    font-size: 20px;
    border-radius: 5px;
    width: 100%;
`;
const RiotConnectionText = S.p`
    width: fit-content;
    color: #fff;
    font-size: 30px;
    width: 100%;
    margin-bottom: 20px;
    text-align: left;
`;
const ButtonContainer = S.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 20px;
`;
const StyledIconArrow = S(FontAwesomeIcon)`
    transform: translateX(-100%);
    color: #fff;
    font-size: 18px;
    position: absolute;
    opacity: 0;
    transition: all ease-in-out 300ms;
    margin-left: 8px;
    margin-top: 5px;
    color: #191818;
`;
const RiotConnectButton = S.a`
    padding: 10px 30px;
    border-radius: 40px;
    color: #fff;
    font-size: 20px;
    position: relative;
    transition: all ease 300ms;
    background: linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%);
    box-shadow:  2px 2px 12px 0px #494848c4;
    &:hover {
        padding-right: 50px;

        ${StyledIconArrow} {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
const InputLabel = S.label`
    font-size: 22px;
    color: #fff;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 20px;
`;