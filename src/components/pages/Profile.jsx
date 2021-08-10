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
import '../../sass/main.scss';

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
    function getDate(current, date) {
        let timestamp = new Date(date).getTime();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current - timestamp;
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        }
    
        else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        }
    
        else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        }
    
        else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        }
    
        else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
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

                { leagueProfileData.championPool.length !== 0 ?
                    <section class="container d-flex flex-wrap justify-content-between">
                        <h3 class="text-light text-align-start display-6 my-5">League of Legends information</h3>
                        <div class="col-lg-12 bg-dark d-flex rounded p-5 justify-content-between mb-5">
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
                        </div>
                        <div class="col-3 pe-3">
                        <h3 class="text-light text-start display-6 my-5">Top 3 Champions</h3>
                            <div class="d-flex flex-column w-100 justify-content-center align-items-center bg-dark rounded p-3">
                                {Object.keys(leagueProfileData).length > 0 && leagueProfileData.championPool.map(champion => {
                                    return (
                                        <div class="w-50 my-3">
                                            <img class="rounded-circle w-75" src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion.champion}.png`} />
                                            <p class="text-md-center fs-4 text-primary d-flex flex-column">Mastery <span class="fs-3 text-light">{champion.championPoints}</span></p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {leagueProfileData.recentMatches && 
                            <section class="col-9 d-flex flex-wrap container me-0">
                               <h3 class="text-light text-align-start display-6 my-5 w-100 text-start">Recent Matches</h3>
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
                                        <div class="p-3 pt-0 w-50">
                                            <div class=" position-relative container d-flex flex-row justify-content-between p-3 bg-dark rounded h-100 align-items-start">
                                                    <div class="row d-flex col-4 justify-content-start">
                                                        {match.win ? <h6 class="text-primary display-4">Victory</h6> : <h6 class="text-danger display-4">Defeat</h6>}
                                                        <p class="text-light text-start fs-3 mb-1">KDA: {match.kills}/{match.deaths}/{match.assists}</p>
                                                    </div>
                                                    <div class="row col-4 flex-column d-flex justify-content-center align-items-center">
                                                        <div class="mb-3">
                                                            {/* <h6 class="text-light fs-3" >{match.champion}</h6> */}
                                                            <img class="rounded-circle w-75 h-auto" src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${match.champion}.png`} />
                                                        </div>
                                                        <div class="container">
                                                            <img class="rounded p-0 col-4 p-1" src={`${process.env.PUBLIC_URL}/assets/spells/${summonerSpell1[0].id}.png`}/>
                                                            <img class="rounded p-0 col-4 p-1" src={`${process.env.PUBLIC_URL}/assets/spells/${summonerSpell2[0].id}.png`}/>
                                                            {typeof leagueProfileData.leagueInfo != 'undefined' ? <img class="col-4 p-0 " src={`${process.env.PUBLIC_URL}/assets/ranked-positions/Position_${leagueProfileData.leagueInfo.tier}-${match.lane}.png`}/> : <KDAText>N/A</KDAText>}

                                                        </div>
                                                    </div>
                                                    <div class="row col-4 m-0">
                                                        {typeof item1 != 'undefined' ? <img class="rounded col-4 p-1" src={`${process.env.PUBLIC_URL}/assets/item/${item1.image.full}`}/> : null}
                                                        {typeof item2 != 'undefined' ? <img class="rounded col-4 p-1"  src={`${process.env.PUBLIC_URL}/assets/item/${item2.image.full}`}/> : null}
                                                        {typeof item3 != 'undefined' ? <img class="rounded col-4 p-1"  src={`${process.env.PUBLIC_URL}/assets/item/${item3.image.full}`}/> : null}
                                                        {typeof item4 != 'undefined' ? <img class="rounded col-4 p-1"  src={`${process.env.PUBLIC_URL}/assets/item/${item4.image.full}`}/> : null}
                                                        {typeof item5 != 'undefined' ? <img class="rounded col-4 p-1"  src={`${process.env.PUBLIC_URL}/assets/item/${item5.image.full}`}/> : null}
                                                        {typeof item6 != 'undefined' ? <img class="rounded col-4 p-1"  src={`${process.env.PUBLIC_URL}/assets/item/${item6.image.full}`}/> : null}
                                                        {typeof item7 != 'undefined' ? <img class="rounded col-4 p-1"  src={`${process.env.PUBLIC_URL}/assets/item/${item7.image.full}`}/> : null}
                                                    </div>
                                                    <p class="text-light p-2 bg-black fs-5 m-0 fst-italic position-absolute bottom-0 end-0" style={{borderTopLeftRadius: '15px', borderBottomRightRadius: '15px'}}>{getDate(Date.now(),match.gameCreated)}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </section>
                        }
                    </section>
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


const RankImage = S.img`
    width: 155px;
    height: auto;
`;
const RankText = S.p`
    font-size: 28px;
    color: #fff;
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