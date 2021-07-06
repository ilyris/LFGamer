import React from 'react'
import S from 'styled-components';
import { rankedEmblemArr } from '../pages/RankImageExport'
import { roleArr } from '../pages/RoleImageExport'

export function Playercard(props) {
    const {listing} = props;
    console.log(listing);

    // Filter our the rank file
    let rank = rankedEmblemArr.filter(rank => rank.name == listing.rank)
    rank = rank[0].file;

    // Filter out the roles
    console.log(listing.roles)
    return(
        <ListingCard>
            <UsernameContainer>
                <CardAvatar src={`https://cdn.discordapp.com/avatars/${listing.discord_id}/${listing.avatar}.png`}/>
                <CardUsername>{`${listing.username}#${listing.discriminator}`}</CardUsername>                
            </UsernameContainer>
            <InformationContainer>
                <Label> Rank:
                    <CardRank src={rank}/>
                </Label>
                <Label> Roles:
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
                </Label>
            </InformationContainer>
            <InformationContainer>
                <Label> Champions
                    <ChampionContainer>
                        <ChampionImg src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/Aatrox.png`}/>
                        <ChampionImg src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/Aatrox.png`}/>
                        <ChampionImg src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/Aatrox.png`}/>
                        <ChampionImg src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/Aatrox.png`}/>

                    </ChampionContainer>
                </Label>
                <Label> Looking for:
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
                </Label>
            </InformationContainer>
        </ListingCard>
    )
}
export default Playercard

const ListingCard = S.div`
    margin-right: 15px;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-flow: row wrap;
    max-width: 250px;
    justify-content: space-between;
    background-color: #232323;
    border-radius: 10px;
    box-shadow: 2px 2px 8px #00000061;
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
const CardRank = S.img`
    width: 100px;
    height: auto;
    margin-top: 10px;

`;
const RoleContainer = S.div`
    margin-top: 10px;

`;
const CardRole = S.img`
    width: 35px;
    height: auto;
`;
const InformationContainer = S.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`;
const Label = S.label`
    font-size: 14px;
    color: gray;
    width: 49%;
`;
const ChampionContainer = S.div`
    flex-flow: row wrap;
    justify-content: center;
    width: 100%;
    display: flex;
    margin-top: 10px;
`;
const ChampionImg = S.img`
    border-radius: 50%;
    margin: 5px;
    max-width: 40px;
`;