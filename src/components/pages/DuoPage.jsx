import React, { useState, useEffect } from 'react'
import S from 'styled-components';
import axios from 'axios';
import { Maintitle } from '../pageComponents/MainTitle';
import ChampionCard from '../cards/ChampionCard';
import { rankedEmblemArr } from './RankImageExport'
import { roleArr } from './RoleImageExport'
import { SubmitButton } from '../pageComponents/SubmitButton';
import { env_be_url } from '../../globalVars';
import { useSelector, useDispatch } from 'react-redux';
import SliderInput from '../form/SliderInput';

export function DuoPage(props) {

    const [championData, setChampionData] = useState({});

    // make specific reducer for champion being searched for
    const userChampionOptions = useSelector(state => state.championSelections.selectedChampions);
    // make specific reducer for Rank being searched for
    const userRank = useSelector(state => state.championSelections.selectedRank);
    // make specific reducer for Role being searched for
    const userLanes = useSelector(state => state.championSelections.selectedLanes);
    // make specific reducer for communication being searched for
    const userMicSetting = useSelector(state => state.championSelections.micEnabled);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('hello!!!')
    }
    useEffect(() => {
        // get champion data from Riot Games
        axios.get('https://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
            .then(res => {
                setChampionData(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])

    // Only get champion data ( a lot of useless info in here we don't need)
    const champions = Object.values(championData);

    return (
        <Main>
            <TitleContainer>
                <Maintitle
                    title={'Search for your '}
                    importantTitleText={'Duo Gamer'}
                />
            </TitleContainer>
            <Form onSubmit={onSubmit}>
                <SelectListContainer>
                    <ChampionCard
                        rawData={champions}
                        selectedOptions={userChampionOptions}
                        action={'SET_SELECTED_CHAMPIONS'}
                        placeHolder={"search gamers champion(s)"}
                        label={'Champions'}
                        inputName={'champion_input'}
                        lengthCheck={6}
                    />
                    <ChampionCard
                        rawData={rankedEmblemArr}
                        selectedOptions={userRank}
                        action={'SET_SELECTED_RANK'}
                        label={'Rank'}
                        placeHolder={"Search Rank"}
                        inputName={'rank_input'}
                        lengthCheck={1}
                    />
                    <ChampionCard
                        rawData={roleArr}
                        selectedOptions={userLanes}
                        action={'SET_SELECTED_LANES'}
                        label={'Role(s)'}
                        placeHolder={"Search role(s)"}
                        inputName={'role_input'}
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
        </Main>
    )
}
export default DuoPage;

const Main = S.main`
    display: flex;
    flex-flow: row wrap;
    width: 75%;
    margin: 0 auto;
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
`;
const Label = S.label`
    font-size: 22px;
    color: #fff;
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-top: 20px;
`;

const SelectListContainer = S.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;
const FormButtonContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-top: 20px;
    width: 100%;
`;