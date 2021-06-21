import React from 'react'
import S from 'styled-components'
export function DisplayListCard(props) {
    
const {onChampionClick, data} = props
    return (
        <ChampionCardContainer onClick={onChampionClick} data-name={data.name}>
            <ChampionImage data-name={data.name} src={data.image ? `${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${data.image.full}` : `${data.file}`} />
            <ChampionName data-name={data.name}> {data.name}</ChampionName>
        </ChampionCardContainer>
    )
}
export default DisplayListCard;

const ChampionName = S.p`
    font-size: 20px;
    color: #000;
    padding-left: 10px;
`;
const ChampionCardContainer = S.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    background-color: white;
    z-index: 100;

    &:hover {
        cursor: pointer;
        background-color: #000;
        ${ChampionName} {
            color: #fff;
        }
    }
`;

const ChampionImage = S.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;
