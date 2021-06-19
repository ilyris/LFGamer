import React,{useState, useEffect, useRef} from 'react'
import S from 'styled-components';

function ChampionCard(props) {
    const [displayChampionList, setDisplayChampionList] = useState(false);
    const [selectedChampions, setSelectedChampions] = useState([]);
    // Due to the async nature of useState, sometimes the filteredChampList would be empty
    const [filteredChampionList, setFilteredChampionList] = useState(props.champions || [])
    const champcontainer = useRef(null);

    useOutsideAlerter(champcontainer, setDisplayChampionList);
    useFilterChampions(setFilteredChampionList)

    const onClick = () => {
        // This functionality should be incorportated into the outsideAlter function
        setDisplayChampionList(true);
    }

    // Store the champion name data into an array
    const onChampionClick = (e) => {
        setSelectedChampions([...selectedChampions, e.target.getAttribute("data-champ-name")])
    }

    // On page component render, pass in our hook to filter the champion list when a user makes a selection
    function useFilterChampions(setFilteredChampionList) {
        useEffect(() => {
            setFilteredChampionList(props.champions.filter(champion => {
                    return !selectedChampions.includes(champion.name);
                })
            )
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
        if(filteredChampionList.length <= 0) {
            setFilteredChampionList(props.champions);
        }
    }, [props.champions])
    
    return (
        <ChampionSelectionContainer>
            <UserSelectionContainer>
                <ChampionSelect name="champion_selections">
                    <Options></Options>
                </ChampionSelect>
                <Label> Champion
                    <ChampionInput
                        onClick={onClick}
                        type="text" 
                        name="champion_input" 
                        placeholder="select your champion(s)"
                        ref={champcontainer}
                    />
                </Label>
            </UserSelectionContainer>
            <ChampionContainer   ref={champcontainer} displayChampionList={displayChampionList}>
                {filteredChampionList.map(champion => {
                    return (
                        <ChampionCardContainer onClick={onChampionClick} data-champ-name={champion.name}>
                            <ChampionImage data-champ-name={champion.name} src={`http://ddragon.leagueoflegends.com/cdn/11.12.1/img/champion/${champion.image.full}`} />
                            <ChampionName data-champ-name={champion.name}> {champion.name}</ChampionName>
                        </ChampionCardContainer>
                    )
                })
            }
            </ChampionContainer>
        </ChampionSelectionContainer>

    )
}



export default ChampionCard;

const ChampionSelectionContainer = S.div`
    margin-top: 20px;
    width: 300px;
`;
const UserSelectionContainer = S.div`
    display: inline;
`;
const ChampionSelect = S.div`
    display: none;
`;
// These options will be generated on the champions the user selects
const Options = S.div`
    display: none;
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
`;
const ChampionContainer = S.div`
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 20px;
    width: 300px;
    flex-flow: row wrap;
    overflow-y: scroll;
    height: ${props => props.displayChampionList ? '300px' : '0'};
    padding: 0 10px;
    transition: all ease 120ms;
    max-height: ${props => props.displayChampionList ? '999px' : '0'};
    padding-left: 2px
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