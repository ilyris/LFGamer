import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import S from 'styled-components';
import image from '../../assets/league-of-legends-game-logo.png';
import ChampionCard from '../cards/ChampionCard';
import SliderInput from '../form/SliderInput';
import {rankedEmblemArr} from './RankImageExport'
import {roleArr} from './RoleImageExport'

const env_be_url = process.env.REACT_APP_PROD_BE_URL || "http://localhost:8080/";

export function SetUpPage(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [profile, setProfile] = useState({
        about_me: '',
    })

    const [user, setUser] = useState('');
    const [championData, setChampionData] = useState({});

    const riotAccount = useSelector( state => state.root.riotAccount);
    const userChampionOptions = useSelector(state => state.championSelections.selectedChampions);
    const userRank = useSelector(state => state.championSelections.selectedRank);
    const userLanes = useSelector(state => state.championSelections.selectedLanes);
    const userMicSetting = useSelector(state => state.championSelections.micEnabled);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${env_be_url}setup`,{champions: userChampionOptions, rank:userRank, lanes:userLanes,mic:userMicSetting, aboutMe: profile.about_me, email: user.email})
        .then(res => {
            console.log(res.data);
            setProfile({
                about_me: '',
            })
            dispatch({type: 'CLEAR_SELECTED_CHAMPIONS', payload: []})
            dispatch({type: 'CLEAR_SELECTED_RANK', payload: []})
            dispatch({type: 'CLEAR_SELECTED_LANES', payload: []})
            dispatch({type: 'CLEAR_IS_MIC_ENABLED', payload: false})
            history.push(`/profile/${user.user_id}`)
        })
        .catch(err => console.log(err))

    }
    const onChange = (event) => {
        setProfile({...profile, [event.target.name]: event.target.value});
    }
    useEffect(() => {
            axios.get(`${env_be_url}login/user`)
            .then( async res => {
                console.log(res.data)
                JSON.stringify(localStorage.setItem('discordData', res.data))
                await setUser(res.data);
                await dispatch({type: 'SET_LOGGEDIN_USER', payload: res.data})

            })
            .catch(err => console.log(err));

            axios.get('https://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
            .then(res => {
                setChampionData(res.data.data);
            })
            .catch(err => console.log(err))


            console.log(localStorage.getItem('discordData'));
    },[])

    const champions = Object.values(championData);
    return (
        <MainContainer>
            <PageIntroContainer>
                <Heading>Welcome, <Username>{`${user.username}`}</Username></Heading>
                <DiscordAvatar src={`https://cdn.discordapp.com/avatars/300623558265143296/${user.avatar}.png`}/>
                <AboutContainer>
                    <About>
                    Thanks for joining LFGamer, Here you can add information to your profile and connect your Riot games account to your LFGamer account.
                    </About>
                </AboutContainer>
                <ViewAccountContainer>
                    <AccountLink to={`/profile/${user.user_id}`}>View your account</AccountLink>
                </ViewAccountContainer>
                <Form onSubmit={onSubmit}>
                    <Label> About You:
                        <TextArea onChange={onChange} name="about_me" type="textarea" value={profile.about_me} placeholder="tell everyone a little bit about yourself"/>
                    </Label>
                    <SelectListContainer>
                        <ChampionCard 
                            rawData={champions}
                            selectedOptions={userChampionOptions}
                            action={'SET_SELECTED_CHAMPIONS'}
                            placeHolder={"select your champion(s)"}
                            label={'Your Champion Pool'}
                            inputName={'champion_input'}
                            lengthCheck={6}
                        />                    
                        <ChampionCard
                            rawData={rankedEmblemArr}
                            selectedOptions={userRank}
                            action={'SET_SELECTED_RANK'}
                            label={'Your Rank'}
                            placeHolder={"Select your rank"}
                            inputName={'rank_input'}
                            lengthCheck={1}
                        />
                        <ChampionCard
                            rawData={roleArr}
                            selectedOptions={userLanes}
                            action={'SET_SELECTED_LANES'}
                            label={'Your Roles'}
                            placeHolder={"Select your roles"}
                            inputName={'role_input'}
                            lengthCheck={2}
                        />                        
                    </SelectListContainer>

                        <SliderInput />
                    <FormButtonContainer>
                        <Button>Save
                            <StyledIconArrow icon={faArrowRight} />  
                        </Button>
                    </FormButtonContainer>
                </Form>
            </PageIntroContainer>
            {riotAccount ? 'Riot Account has been connected!' : 
                <ConnectionContainer>
                    <RiotConnectionText>
                        Connect your gaming accounts to LFGamer
                    </RiotConnectionText>
                    <GameConnectionCard>
                        <GameLogo src={image}/>
                        <ButtonContainer>
                            <RiotConnectButton href="/">
                                Connect
                                <StyledIconArrow icon={faArrowRight} />                       
                            </RiotConnectButton> 
                        </ButtonContainer>
                    </GameConnectionCard>
                </ConnectionContainer>            
            }
        </MainContainer>
    )
}

export default SetUpPage;
const MainContainer = S.section`
    display: flex;
    flex-flow: row wrap;
    width: 75%;
    margin: 50px auto;
`;
const PageIntroContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    width: 50%;
    flex: 1;
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
const ViewAccountContainer = S.div`
    width: 100%;
    margin-top: 20px;
    text-align: left;
`;
const AccountLink = S(Link)`
    font-size: 24px;
    color: rgba(118,238,116,1);
`;
// Profile About Text
const AboutContainer = S.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
`;
const About = S.p`
    font-size: 24px;
    color: #fff;
    font-weight: 500;
    text-align: left;
    width: 100%;
`;

// Connection Buttons
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

// ProfilePage About Description Form
const Form = S.form`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 50px;
`;
const Label = S.label`
    font-size: 22px;
    color: #fff;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 20px;
`;
const TextArea = S.textarea`
    width: 100%;
    font-size: 20px;
    max-height: 200px;
    min-height: 200px;
    resizE: none;
    padding: 20px;
    border-radius: 5px;
`;
const SelectListContainer = S.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const FormButtonContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: 20px;
    width: 100%;
`;
const Button = S.button`
    padding: 10px 30px;
    border-radius: 40px;
    color: #fff;
    font-size: 20px;
    position: relative;
    transition: all ease 300ms;
    background: linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%);
    box-shadow:  2px 2px 12px 0px #494848c4;
    border: none;
    &:hover {
        padding-right: 50px;
        cursor: pointer;
        ${StyledIconArrow} {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;