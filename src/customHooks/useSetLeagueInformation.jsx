
import { useSelector } from 'react-redux';

export function useSetLeagueInformation() {
    const userChampionOptions = useSelector(state => state.championSelections.selectedChampions);
    // make specific reducer for Rank being searched for
    const userRank = useSelector(state => state.championSelections.selectedRank);
    // make specific reducer for Role being searched for
    const userLanes = useSelector(state => state.championSelections.selectedLanes);

    const leagueInformation = {champions: userChampionOptions, rank:userRank, lanes:userLanes};
    return leagueInformation;
}