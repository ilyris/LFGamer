import React, {useState} from 'react'
import S from 'styled-components';
import axios from 'axios';
import ChampionCard from '../cards/ChampionCard';
import { rankedEmblemArr } from '../pages/RankImageExport'
import { roleArr } from '../pages/RoleImageExport'
import { SubmitButton } from '../pageComponents/SubmitButton';
import { env_be_url } from '../../globalVars';
import { useDispatch, useSelector } from 'react-redux';
import SliderInput from './SliderInput';
import MainTitle from '../pageComponents/MainTitle'
import { useChampionData } from '../../customHooks/useChampionData';
import { useSetLeagueInformation } from '../../customHooks/useSetLeagueInformation';
import { decodeJWT } from '../../helperFuncs/cookie';

export function DuoListing(props) {

    const championData = useChampionData({});
    const selectedLeagueInformation = useSetLeagueInformation();
    const {champions, rank, lanes} = selectedLeagueInformation;
    const [desc, setDesc] = useState('');
    let jwt = decodeJWT(localStorage.getItem('token'));
    // make specific reducer for communication being searched for
    const userMicSetting = useSelector(state => state.championSelections.micEnabled);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        // we need to cause a rerender and reset the state.

        e.preventDefault();
        axios.post(`${env_be_url}duo/add`, {id:jwt.payload.user_id, champions, rank: rank[0], lanes, mic:userMicSetting, desc})
        .then(res => {
            // clear out the selections
            dispatch({type:'CLEAR_SELECTED_CHAMPIONS', payload: []})
            dispatch({type:'CLEAR_SELECTED_RANK', payload: []})
            dispatch({type:'CLEAR_SELECTED_LANES', payload: []})
            dispatch({type:'CLEAR_IS_MIC_ENABLED', payload: false})
            setDesc('');
            props.setIsFormClosed(true)
        })
        .catch(err => console.log(err));
    }
    const handleCancel = (e) => {
        e.preventDefault();
        props.setIsFormClosed(true);
    }
    const handleChange = (e) => {
        setDesc(e.target.value);
    }
    // Only get champion data ( a lot of useless info in here we don't need)
    const championsData = Object.values(championData);

    return (
            <Form onSubmit={onSubmit} isFormClosed={props.isFormClosed}>
                <MainTitle title={'Post your '} importantTitleText={'Listing'}/>
                <SelectListContainer>
                    <ChampionCard
                        rawData={championsData}
                        selectedOptions={champions}
                        action={'SET_SELECTED_CHAMPIONS'}
                        placeHolder={"Set your champion pool"}
                        label={'Select champion(s)'}
                        inputName={'champion_input'}
                        lengthCheck={6}
                    />
                    <ChampionCard
                        rawData={rankedEmblemArr}
                        selectedOptions={rank}
                        action={'SET_SELECTED_RANK'}
                        label={'Select your rank'}
                        placeHolder={"Your rank"}
                        inputName={'rank_input'}
                        lengthCheck={1}
                    />
                    <ChampionCard
                        rawData={roleArr}
                        selectedOptions={lanes}
                        action={'SET_SELECTED_LANES'}
                        label={'Role(s)'}
                        placeHolder={"Select your role(s)"}
                        inputName={'role_input'}
                        lengthCheck={2}
                    />
                </SelectListContainer>

                <SliderInput />
                <Label> Post Description
                    <PostDescription onChange={handleChange} value={desc} name="post_desc"/>
                </Label>
                <FormButtonContainer>
                    <SubmitButton
                        text={'Submit'}
                        cancelButton={false}
                    />
                    <SubmitButton
                        text={'Cancel'}
                        cancelButton={true}
                        handleCancel={handleCancel}
                    />
                </FormButtonContainer>
            </Form>
    )
}
export default DuoListing;

const Form = S.form`
    transition: all 300ms ease-in-out;
    display: flex;
    width: 100%;
    overflow: hidden;
    opacity: ${props => props.isFormClosed ? '0' :  '1'};
    flex-flow: row wrap;
    justify-content: space-between;
    padding:  ${props => props.isFormClosed ? '0' :  '20px'};
    max-height: 999px;
    height: auto;
    border-radius: 15px;
    position: absolute;
    margin-top: -50px;
    background-color: #232323;
    z-index: ${props => props.isFormClosed ? '0' :  '11'};
`;
const SelectListContainer = S.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;
const FormButtonContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
`;
const Label = S.label`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    color: #fff;
    font-size: 18px;
    margin-top: 20px;
`;
const PostDescription = S.textarea`
    width: 100%;
    resize: none;
    padding: 10px;
    font-size: 18px;
    min-height: 200px;
    border-radius: 10px;
    margin-top: 5px;
`;

