import React, {useEffect} from 'react'
import axios from 'axios';
import S from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { rankedEmblemArr } from '../pages/RankImageExport'
import { roleArr } from '../pages/RoleImageExport'
import {PrimaryCtaLink} from '../pageComponents/PrimaryCtaLink';
import {env_be_url} from '../../globalVars/envURL';

export function Playercard(props) {
    const {listing} = props;
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.root.loggedInUser);
    // Filter our the rank file
    let rank = rankedEmblemArr.filter(rank => rank.name == listing.rank)
    rank = rank[0].file;

    const messageUser = (e) => {
        // Start a conversation
    let conversationId;

        axios.post(`${env_be_url}conversation/startConversation`, {senderId: loggedInUser.id, receiverId: listing.id})
        .then((res) => {
            // This should be handled by the socket, so when we read a message came in the chat box displays.
            dispatch({type: 'SET_USER_CONNECTIONS', payload: {userId: String(props.listing.id), friendUsername: props.listing.username, conversationId: res.data[0].id}})
            if(res.data.id) {
                axios.get(`${env_be_url}message/${res.data.id}`)
                .then(res => {
                    dispatch({type: 'SET_MESSAGES', payload: res.data});
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
        


    }
    return(
        <PesudoContainer  >
    <ListingCard >
                <UsernameContainer>
                    <CardAvatar src={`https://cdn.discordapp.com/avatars/${listing.discord_id}/${listing.avatar}.png`}/>
                    <CardUsername>{`${listing.username}#${listing.discriminator}`}</CardUsername>                
                </UsernameContainer>
                <LeftColumn>
                    <InformationContainer>
                        <LabelContainer> 
                            <LabelContainerText>Rank:</LabelContainerText>
                            <CardRank src={rank}/>
                        </LabelContainer>
                        <LabelContainer>
                            <LabelContainerText>Roles:</LabelContainerText>
                        <RoleContainer>
                            {roleArr.map( (role,i) => {
                                let doesContain = false;
                                listing.roles.map(userRole => {
                                    if(role.name == userRole) doesContain = true;
                                }) 
                                if(doesContain) {
                                    return <CardRole src={role.file} key={i}/>
                                }
                            })}
                        </RoleContainer>
                        </LabelContainer>
                    </InformationContainer>
                    <InformationContainer>
                        <LabelContainer> 
                            <LabelContainerText>Champions</LabelContainerText>
                            <ChampionContainer>
                                {listing.champions.map((champion,i) => {
                                    return <ChampionImg key={i} src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion}.png`}/>
                                })}
                            </ChampionContainer>
                        </LabelContainer>
                        <LabelContainer> 
                            <LabelContainerText>Looking for:</LabelContainerText>
                        <RoleContainer>
                            {roleArr.map( role => {
                                let doesContain = false;
                                listing.roles.map(userRole => {
                                    if(role.name == userRole) doesContain = true;
                                }) 
                                if(doesContain) {
                                    return <CardRole src={role.file}/>
                                }
                            })}
                        </RoleContainer>
                        </LabelContainer>
                    </InformationContainer>                
                </LeftColumn>
                <Container>
                    <LabelContainer backSide={true}>
                        <LabelContainerText>Description</LabelContainerText>
                        <Text>Some long text about how I am some kind of mid laner</Text>
                    </LabelContainer>
                </Container>
            </ListingCard>
            <ButtonContainer>
                <PrimaryCtaLink handleClick={(e) => messageUser(e)} text={'Message'}/>
            </ButtonContainer>
        </PesudoContainer>
        
    )
}
export default Playercard;

const Container = S.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #232323;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    border-radius: 10px;
    padding: 15px;
    transform: translateY(100%);
    transition: 400ms all ease;
    opacity: 0;
`;
const PesudoContainer = S.div`
    position: relative;
`;
const ListingCard = S.div`
    margin-right: 15px;
    border-radius: 15px;
    padding: 15px 15px 35px 15px;
    display: flex;
    flex-flow: row wrap;
    max-width: 350px;
    justify-content: space-between;
    background-color: #232323;
    border-radius: 10px;
    box-shadow: 2px 2px 8px #00000061;
    position: relative;
    overflow: hidden;
    min-height: 425px;
    align-items: baseline;
    &:hover {
        ${Container} {
          transform:translateY(0);
          z-index: 10;
        opacity: 1;
        }
    }
`;
const UsernameContainer = S.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
`;
const CardUsername = S.p`
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: right;
    margin-left: 20px;
`;
const CardAvatar = S.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
const LeftColumn = S.div`
    flex: 1;
`;
const CardRank = S.img`
    width: 100px;
    height: auto;
    margin-top: 10px;

`;
const RoleContainer = S.div`
    margin-top: 10px;

`;
const CardRole = S.img`
    width: 45px;
    height: auto;
`;
const InformationContainer = S.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;
const LabelContainer = S.div`
    width: ${props => props.backSide ? '100%': '49%' };
`;
const LabelContainerText = S.p`
    font-size: 14px;
    color: gray;
`;
const ChampionContainer = S.div`
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    display: flex;
    margin-top: 10px;
    min-height: 100px;
`;
const ChampionImg = S.img`
    border-radius: 50%;
    margin: 5px;
    max-width: 40px;
    height: 40px;
`;
const Text = S.p`
    font-size: 18px;
    color: #fff;
    margin-top: 10px;
`;
const ButtonContainer = S.div`
    display: flex;
    width: 100%;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: -26px;
    z-index: 1000;
    pointer-event: none;
`;