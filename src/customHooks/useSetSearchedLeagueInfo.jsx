
import { useSelector } from 'react-redux';

export function useSearchedLeagueInfo() {
    const userSearchedChampions = useSelector(state => state.userSearchedLeagueOptions.searchedChampions);
    const userSearchedRank = useSelector(state => state.userSearchedLeagueOptions.searchedRank);
    const userSearchedLanes = useSelector(state => state.userSearchedLeagueOptions.searchedLanes);
    const userSearchedMicOption =  useSelector(state => state.userSearchedLeagueOptions.searchedMicEnabled);

    const userSearchedLeagueOptions = {champions: userSearchedChampions, rank:userSearchedRank, lanes:userSearchedLanes, mic: userSearchedMicOption};

    return userSearchedLeagueOptions;
}