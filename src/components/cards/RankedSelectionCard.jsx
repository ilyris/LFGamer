import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import S from 'styled-components';

function RankedSelectionCard(props) {
    const {rankedEmblemArr} = props
    const dispatch = useDispatch();
    // When to display the list of champion in select list
    const [displayRankedList, setDisplayRankedList] = useState(false);

    // THe user selected champions
    const selectedRank = useSelector(state => state.championSelections.selectedRank)

    // The user input when searching for a champions
    const [rankedUserInput, setRankedUserInput] = useState('');

    // The raw championlist Data
    const [rankedList, setRankedList] = useState(rankedEmblemArr); // set ranked icons

    // champion reference element(s)
    const rankedcontainer = useRef(null);

    // create a copy of the props.champions so that I can filter the array, without changing the raw data.
    let filteredRank = rankedEmblemArr;

    // Outside click detection from ref element
    useOutsideAlerter(rankedcontainer, setDisplayRankedList);
    // Filter champion hook
    useFilterRankedIcons(setRankedList)

    const onClick = () => {

        console.log(true)// This functionality should be incorportated into the outsideAlter function
        setDisplayRankedList(true);
    }

    // Store the champion name data into an array
    const onChampionClick = (e) => {
        dispatch({ type: 'SET_SELECTED_RANK', payload: [...new Set(selectedRank), e.target.getAttribute("data-rank")] })
    }

    const onChange = (e) => {
        setRankedUserInput(e.target.value);
    }

    // On page component render, pass in our hook to filter the champion list when a user makes a selection
    function useFilterRankedIcons(setRankedList) {
        useEffect(() => {
            setRankedList(filteredRank.filter(rank => {
                return !selectedRank.includes(rank);
            })
            )
            dispatch({ type: 'SET_RANK_OPTIONS', payload: selectedRank })
        }, [selectedRank])
    }

    // On component render, look to see if a user is clicking on our referenced components (input / champ_list)
    function useOutsideAlerter(ref, hook) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (!ref.current.contains(event.target)) {
                    hook(false);
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    // On page render, check that the championList is empty, if it is set the default state.
    useEffect(() => {
        if (rankedList.length <= 0) {
            setRankedList(filteredRank);
        }
    }, [props.champions])

    useEffect(() => {
        filteredRank = rankedEmblemArr.filter(rank => rank.name.toLowerCase().includes(rankedUserInput.toLocaleLowerCase()));
        setRankedList(filteredRank)
    }, [rankedUserInput])

    return (
        <ChampionSelectionContainer>
            <UserSelectionContainer>
                <ChampionSelect name="rank_selection">
                    {selectedRank && selectedRank.map(rank => <Options value={rank}>{rank}</Options>)}
                </ChampionSelect>
                <SelectedChampionContainer>
                    {selectedRank && selectedRank.map(rank => <SelectedChampTags>{rank}</SelectedChampTags>)}
                </SelectedChampionContainer>
                <Label> Your Rank
                    <ChampionInput
                        onClick={onClick}
                        onChange={onChange}
                        type="text"
                        name="rank_input"
                        autocomplete="off"
                        placeholder="Select your rank"
                        ref={rankedcontainer}
                    />
                </Label>
            </UserSelectionContainer>
            {selectedRank.length >= 1 ? <NoMoreText>No more selections please</NoMoreText> : null}

            <ChampionContainer ref={rankedcontainer} displayRankedList={displayRankedList} selectedRank={selectedRank}>
                {selectedRank.length !== 1 ?
                    rankedEmblemArr.map(rank => {
                        return (
                            <ChampionCardContainer onClick={onChampionClick} data-rank={rank.name}>
                                <ChampionImage data-rank={rank.name} src={`${rank.file}`} />
                                <ChampionName data-rank={rank.name}> {rank.name}</ChampionName>
                            </ChampionCardContainer>
                        )

                    }) : null

                }
            </ChampionContainer>
        </ChampionSelectionContainer>

    )
}



export default RankedSelectionCard;

const ChampionSelectionContainer = S.div`
    margin-top: 20px;
    width: 300px;
    margin-right: 20px;
`;
const UserSelectionContainer = S.div`
    display: inline;
`;
const ChampionSelect = S.select`
    display: none;
`;
// These options will be generated on the champions the user selects
const Options = S.option`
    display: none;
`;
const SelectedChampionContainer = S.div`
    flex-flow: row wrap;
    display: flex;
    min-height: 100px;
    width: 100%;
    align-items: center;
`;
const SelectedChampTags = S.div`
    padding: 5px 15px;
    border-radius: 20px;
    background-color: #76ee74;
    font-size: 16px;
    color: #000;
    margin-right: 5px;
    margin-top: 5px;
`;
const Label = S.label`
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    color: #fff;
    font-size: 18px;
`;
const ChampionInput = S.input`
    font-size: 18px;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    widtH: 100%;
    margin-top: 10px;
    border: none;
`;
const ChampionContainer = S.div`
    width: 300px;
    display: block;
    overflow-y: ${props => props.selectedRank.length == 1 ? 'unset' : 'scroll'};
    height: ${props => props.displayRankedList ? '300px' : '0'};
    transition: all ease 120ms;
    max-height: ${props => props.displayRankedList ? '999px' : '0'};
    margin-top: -3px;
    &::-webkit-scrollbar-thumb {
        background-color: #0077ff;
      }
      &::-webkit-scrollbar {
        width: 12px;
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
      }
`;
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
const NoMoreText = S.p`
    font-size: 18px;
    color: #191818;
    background-color: #fff;
    padding: 20px;
    margin-top: -3px;
`;