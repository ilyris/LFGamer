import React from 'react'
import S from 'styled-components';
import { rankedEmblemArr } from '../pages/RankImageExport'
import { roleArr } from '../pages/RoleImageExport'

export function Playercard(props) {
    const {listing} = props;

    // Filter our the rank file
    let rank = rankedEmblemArr.filter(rank => rank.name == listing.rank)
    rank = rank[0].file;

    // Filter out the roles
    console.log(listing.roles)
    return(
        <ListingCard>
            <CardAvatar src={listing.avatar}/>
            <CardUsername>{`${listing.username}#${listing.discriminator}`}</CardUsername>
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
    flex: 1;
    margin-right: 15px;
    border-radius: 15px;
    padding: 15px;
    display: flex;
    flex-flow: row wrap;
    max-width: 250px;
`;
const CardUsername = S.p`
    font-size: 20px;
    color: #fff;
    font-weight: 500;
    width: 100%;
    text-align: right;
`;
const CardAvatar = S.img`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    float: left;
`;
const CardRank = S.img`
    width: 100px;
    height: auto;
`;
const RoleContainer = S.div`
    display: flex;
    flex-flow: row wrap;
    width: 100%;
`;
const CardRole = S.img`
    width: 50px;
    height: auto;
`;
