import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import S from 'styled-components';

function ChampionCard(props) {
    const dispatch = useDispatch();
    // When to display the list of champion in select list
    const [displayChampionList, setDisplayChampionList] = useState(false);

    // THe user selected champions
    const selectedChampions = useSelector(state => state.championSelections.selectedChampions)

    // The user input when searching for a champions
    const [championUserInput, setChampionUserInput] = useState('');

    // The raw championlist Data
    const [championList, setChampionList] = useState(props.champions || []);

    // champion reference element(s)
    const champcontainer = useRef(null);

    // create a copy of the props.champions so that I can filter the array, without changing the raw data.
    let filteredChampions = props.champions;

    // Outside click detection from ref element
    useOutsideAlerter(champcontainer, setDisplayChampionList);
    // Filter champion hook
    useFilterChampions(setChampionList)

    const onClick = () => {
        // This functionality should be incorportated into the outsideAlter function
        setDisplayChampionList(true);
    }

    // Store the champion name data into an array
    const onChampionClick = (e) => {
        dispatch({ type: 'SET_SELECTED_CHAMPIONS', payload: [...new Set(selectedChampions), e.target.getAttribute("data-champ-name")] })
    }

    const onChange = (e) => {
        setChampionUserInput(e.target.value);
    }

    // On page component render, pass in our hook to filter the champion list when a user makes a selection
    function useFilterChampions(setChampionList) {
        useEffect(() => {
            setChampionList(filteredChampions.filter(champion => {
                return !selectedChampions.includes(champion.name);
            })
            )
            dispatch({ type: 'SET_CHAMPION_OPTIONS', payload: selectedChampions })
            // props.setUserChampionOptions(selectedChampions);
        }, [selectedChampions])
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
        if (championList.length <= 0) {
            setChampionList(filteredChampions);
        }
    }, [props.champions])

    useEffect(() => {
        filteredChampions = props.champions.filter(champion => champion.name.toLowerCase().includes(championUserInput.toLocaleLowerCase()));
        setChampionList(filteredChampions)
    }, [championUserInput])

    return (
        <ChampionSelectionContainer>
            <UserSelectionContainer>
                <ChampionSelect name="champion_selections">
                    {selectedChampions && selectedChampions.map(champion => <Options value={champion}>{champion}</Options>)}
                </ChampionSelect>
                <SelectedChampionContainer>
                    {selectedChampions && selectedChampions.map(champion => <SelectedChampTags>{champion}</SelectedChampTags>)}
                </SelectedChampionContainer>
                <Label> Your Champion Pool
                    <ChampionInput
                        onClick={onClick}
                        onChange={onChange}
                        type="text"
                        name="champion_input"
                        autocomplete="off"
                        placeholder="select your champion(s)"
                        ref={champcontainer}
                    />
                </Label>
            </UserSelectionContainer>
            {selectedChampions.length >= 6 ? <NoMoreText>No more selections please</NoMoreText> : null}
            <ChampionContainer ref={champcontainer} displayChampionList={displayChampionList} selectedChampions={selectedChampions}>
            {selectedChampions.length <= 5 ?
            championList.map(champion => {
                return (
                    <ChampionCardContainer onClick={onChampionClick} data-champ-name={champion.name}>
                        <ChampionImage data-champ-name={champion.name} src={`${process.env.PUBLIC_URL}/assets/riot_games_champion_images/${champion.image.full}`} />
                        <ChampionName data-champ-name={champion.name}> {champion.name}</ChampionName>
                    </ChampionCardContainer>
                )
            
            }) : null

            }
            </ChampionContainer>
        </ChampionSelectionContainer>

    )
}



export default ChampionCard;

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
    overflow-y: scroll;
    overflow-y: ${props => props.selectedChampions.length >= 6 ? 'unset' : 'scroll'};
    height: ${props => props.displayChampionList ? '300px' : '0'};
    transition: all ease 120ms;
    max-height: ${props => props.displayChampionList ? '999px' : '0'};
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