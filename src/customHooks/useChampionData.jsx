import { useState, useEffect } from 'react'
import axios from 'axios';

export function useChampionData(initialState) {
    const [championData, setChampionData] = useState(initialState);

    useEffect(() => {
        // get champion data from Riot Games
        axios.get('https://ddragon.leagueoflegends.com/cdn/11.12.1/data/en_US/champion.json')
            .then(res => {
                setChampionData(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])

    return championData;
}
