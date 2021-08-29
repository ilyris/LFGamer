import React, { useState, useEffect } from 'react'
import S from 'styled-components';
import axios from 'axios';
import MainTitle from '../pageComponents/MainTitle';
import ChampionCard from '../cards/ChampionCard';
import { rankedEmblemArr } from './RankImageExport'
import { roleArr } from './RoleImageExport'
import { SubmitButton } from '../pageComponents/SubmitButton';
import { env_be_url } from '../../globalVars';
import { useSelector } from 'react-redux';
import SliderInput from '../form/SliderInput';
import Playercard from '../player/PlayerCard';
import { useChampionData } from '../../customHooks/useChampionData';
import { useSetLeagueInformation } from '../../customHooks/useSetLeagueInformation';
import { useSearchedLeagueInfo } from '../../customHooks/useSetSearchedLeagueInfo';

import {DuoListing} from '../form/DuoListing';

export function DuoPage(props) {
    const championData = useChampionData({});
    const selectedLeagueInformation = useSetLeagueInformation();
    const {champions, rank, lanes} = selectedLeagueInformation;
    const searchedLeagueData = useSearchedLeagueInfo()
    const socket = useSelector(state => state.messageConnections.socket);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [userInput, setUserInput] = useState({
        champion_input: '',
        rank_input: '',
        role_input: '',
    })
    // hook for pages duo data
    const [duoListings, setDuoListings] = useState([]);
    const [count, setCount] = useState(0);

    // make specific reducer for communication being searched for
    const userMicSetting = useSelector(state => state.championSelections.micEnabled);

    const [isFormClosed, setIsFormClosed] = useState(true);

    const getDuoListings = (callCounter) => {
        console.log(callCounter)
        if(callCounter == 0) {
            axios.get(`${env_be_url}duo`)
            .then(async res => {
                console.log(res.data)
                await setDuoListings(res.data)
            })
            .catch(err => console.log(err))            
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${env_be_url}duo/search`, {champions: searchedLeagueData.champions, rank: searchedLeagueData.rank[0], lanes: searchedLeagueData.lanes, mic:userMicSetting})
        .then(async res => {
            console.log(res.data.listing)
            setUserInput({
                champion_input: '',
                rank_input: '',
                role_input: '',
            })
            await setDuoListings(res.data.listing)
        })
        .catch(err => console.log(err));
    }

    const handleClick = (e) => {
        e.preventDefault();
        setIsFormClosed(false)
    }
    useEffect(() => {
        getDuoListings(count);
        setCount(count + 1)

    }, [duoListings.length, isFormClosed])

    useEffect(() => {
        if(socket == null) return;
        socket.on("getUsers", users => {
            setOnlineUsers(users);
        })
    }, [socket, onlineUsers])

    // Only get champion data ( a lot of useless info in here we don't need)
    const championsData = Object.values(championData);

    return (
        <Main>
            <TitleContainer>
                <MainTitle
                    title={'Active '}
                    importantTitleText={'Gamers'}
                />
            </TitleContainer>
            <Form onSubmit={onSubmit} isFormClosed={isFormClosed}>
                <SelectListContainer>
                    <ChampionCard
                        rawData={championsData}
                        selectedOptions={searchedLeagueData.champions}
                        action={'SET_SEARCHED_CHAMPIONS'}
                        placeHolder={"search gamers champion(s)"}
                        label={'Champions'}
                        inputName={'champion_input'}
                        userInput={userInput}
                        setInput={setUserInput}
                        lengthCheck={3}
                    />
                    <ChampionCard
                        rawData={rankedEmblemArr}
                        selectedOptions={searchedLeagueData.rank}
                        action={'SET_SEARCHED_RANK'}
                        label={'Rank'}
                        placeHolder={"Search Rank"}
                        inputName={'rank_input'}
                        userInput={userInput}
                        setInput={setUserInput}
                        lengthCheck={1}
                    />
                    <ChampionCard
                        rawData={roleArr}
                        selectedOptions={searchedLeagueData.lanes}
                        action={'SET_SEARCHED_LANES'}
                        label={'Role(s)'}
                        placeHolder={"Search role(s)"}
                        inputName={'role_input'}
                        userInput={userInput}
                        setInput={setUserInput}
                        lengthCheck={2}
                    />
                </SelectListContainer>

                <SliderInput />
                <FormButtonContainer>
                    <SubmitButton
                        text={'Search'}
                    />
                </FormButtonContainer>
            </Form>
            <ListingButtonContainer  isFormClosed={isFormClosed}>
                <h6 class="sub-title display-6 mb-5 text-gray">Want to let people know your searching for a duo?</h6>
                <Button onClick={handleClick}>Add Listing</Button>
                <DuoListing isFormClosed={isFormClosed} setIsFormClosed={setIsFormClosed}/>
            </ListingButtonContainer>
            <ListingContainer>
                {duoListings.length > 0 && duoListings.map( (listing,i) =>  {
                    let online = false;
                    onlineUsers.forEach(user => {
                        if(user.userId == listing.id) return online = true       
                    })
                    return <Playercard key={i} listing={listing} isOnline={online} />
                })}
            </ListingContainer>
        </Main>
    )
}
export default DuoPage;

const Main = S.main`
    display: flex;
    flex-flow: row wrap;
    width: 75%;
    margin: 0 auto;
    position: relative;
    z-index: 100;
`;
const TitleContainer = S.div`
    width: 100%;
    margin-top: 50px;
`;
const Form = S.form`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 50px;
    z-index: ${props => props.isFormClosed ? '10': '0'};
    align-items: center;
`;
const SelectListContainer = S.div`
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

// User Duo Listing
const ListingContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 100px;
    z-index: 1;
`;

// Duo Listing buttons
const ListingButtonContainer = S.div`
    width: 100%;
    text-align: left;
    z-index: ${props => props.isFormClosed ? '0': '10'};
    margin-top: 5em;
    z-index: 11;

`;
const Button = S.div`
    padding: 10px 30px;
    border-radius: 40px;
    color: #fff;
    font-size: 20px;
    position: relative;
    -webkit-transition: all ease 300ms;
    transition: all ease 300ms;
    background: linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%);
    box-shadow: 2px 2px 12px 0px #494848c4;
    border: none;
    width: fit-content;
    z-index: 10;

    &:hover {
        cursor: pointer;
    }
`;