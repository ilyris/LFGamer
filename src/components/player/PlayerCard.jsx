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
                <CardUsername>{`${listing.username}`}</CardUsername>                
            </UsernameContainer>
            <CardRank src={rank}/>
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
    justify-content: center;
`;
const UsernameContainer = S.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
`;
const CardUsername = S.p`
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    text-align: right;
    margin-left: 20px;
`;
const CardAvatar = S.img`
    width: 65px;
    height: 65px;
    border-radius: 50%;
`;
const CardRank = S.img`
    width: 175px;
    height: auto;
`;
const RoleContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: center;
`;
const CardRole = S.img`
    width: 50px;
    height: auto;
    margin: 20px;
`;
