import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import S from 'styled-components';
import image from '../../assets/league-of-legends-game-logo.png';
// import ChampionCard from '../cards/ChampionCard';
// import SliderInput from '../form/SliderInput';
// import {rankedEmblemArr} from './RankImageExport'
// import {roleArr} from './RoleImageExport'
import { decodeJWT } from '../../helperFuncs/cookie';
// import { SubmitButton } from '../pageComponents/SubmitButton';
// import { useChampionData } from '../../customHooks/useChampionData';
import {env_be_url} from '../../globalVars/envURL';
// import { useSetLeagueInformation } from '../../customHooks/useSetLeagueInformation';
import {v4 as uuidv4} from 'uuid';
import { Verification } from '../modals/Verification'

export function SetUpPage(props) {
    const dispatch = useDispatch();

    // use history to push user to routes
    const history = useHistory();
    const [profile, setProfile] = useState({
        about_me: '',
        league_alias: '',
    })
    const [user, setUser] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const riotAccount = useSelector( state => state.root.riotAccount);
    const [showSetupPage, setShowSetupPage] = useState(false);
    const [uuid, setUuid] = useState(uuidv4());
    
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
        try {
            const res = await axios.post(`${env_be_url}setup/getSummonerInfo`, {user_id: user.user_id, leagueAlias: profile.league_alias, uuid: uuid})
            console.log(res.data);

            // add a confirmation message before we push the user.
            if(res.data) {
                await dispatch({type: 'SET_LEAGUE_ACCOUNT_INFO', payload: res.data});

                history.push(`/profile/${user.user_id}`)
            }
        } 
        catch(err) {
            console.log(err)
        }

    }
    useEffect(() => {
        // After user discord login, get user_data from endpoint
            axios.get(`${env_be_url}login/user`)
            .then( async res => {

                // Maybe we handle the riot connect in the profile page, or make a request to see if its connected, if it is. Redirect them to the portfolio page

                if(Object.keys(res.data).length === 0) {
                    // Get user_id to redirect them
                    let jwt = decodeJWT(localStorage.getItem('token'));
                    // Redirect them to their profile, since they shouldn't come to this page again
                    // history.push(`/profile/${jwt.payload.user_id}`);

                    // Maybe set a flag in the database that they have submitted this form before, if they haven't let them come back
                    // if they have, then they should redirect? 
 
                } else {
                    // If there is data, it's their first time. Set the user data locally
                    await setShowSetupPage(true)
                    await setUser(res.data);

                    // set their user data in our reducer
                    await dispatch({type: 'SET_LOGGEDIN_USER', payload: res.data}) 
                    
                    history.push(`/profile/${res.data.user_id}`);

                }


            })
            .catch(err => console.log(err));
    },[dispatch, history])

    if(!showSetupPage) {
        return null;
    }
    return (
      <MainContainer>
        <PageIntroContainer>
          <Heading>
            Welcome, <Username>{`${user.username}`}</Username>
          </Heading>
          <DiscordAvatar
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
          />
          <AboutContainer>
            <About>
              Thanks for joining LFGamer, Here you can connect your league of legends account information to your
              profile..
            </About>
          </AboutContainer>
        </PageIntroContainer>
          <ConnectionContainer>
            <RiotConnectionText>
              Connect your gaming accounts to LFGamer
            </RiotConnectionText>
            <GameConnectionCard>
              <GameLogo src={image} />
              <Label>
                <LeagueUsernameInput
                  onChange={onChange}
                  type="text"
                  name='league_alias'
                  autoComplete="off"
                  placeholder={'LOL Username'}
                />
              </Label>
              <ButtonContainer>
                <RiotConnectButton href="/" onClick={handleLeagueConnect}>
                  Connect
                  <StyledIconArrow icon={faArrowRight} />
                </RiotConnectButton>
              </ButtonContainer>
            </GameConnectionCard>
            { modalActive ? < Verification handleVerification={handleVerification} modalActive={setModalActive}uuid={uuid}/> : null}
          </ConnectionContainer>
      </MainContainer>
    );
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