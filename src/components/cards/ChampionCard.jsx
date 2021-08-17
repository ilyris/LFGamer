import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import S from 'styled-components';
import DisplayListCard from './DisplayListCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"


function ChampionCard(props) {
    const { rawData, selectedOptions, action, placeHolder, inputName, lengthCheck, label } = props;
    console.log(props)
    const dispatch = useDispatch();
    // When to display the list of champion in select list
    const [displayList, setDisplayList] = useState(false);

    // The user input when searching for a champions
    const [userInput, setUserInput] = useState('');

    // The raw list data
    const [dataList, setDataList] = useState(rawData || []);

    // champion reference element(s)
    const inputAndDataList = useRef(null);

    // create a copy of the props.champions so that I can filter the array, without changing the raw data.
    let filteredData = rawData;
    // Outside click detection from ref element
    useOutsideAlerter(inputAndDataList, setDisplayList);
    // Filter champion hook
    useFilterChampions(setDataList)

    // Store the champion name data into an array
    const onChampionClick = (e) => {
        dispatch({ type: action, payload: [...new Set(selectedOptions), e.target.getAttribute("data-name")] })
        setUserInput('');
    }

    const onCloseClick = (e) => {
        e.stopPropagation()
        dispatch({
            type: action, payload: [...new Set(selectedOptions.filter(option => {
                return option !== e.target.getAttribute("data-name")
            }))]
        })
    }
    const onChange = (e) => {
        setUserInput(e.target.value);
    }

    // On page component render, pass in our hook to filter the champion list when a user makes a selection
    function useFilterChampions(setDataList) {
        useEffect(() => {
            setDataList(filteredData.filter(champion => {
                return !selectedOptions.includes(champion.name);
            })
            )
        }, [selectedOptions])
    }

    // On component render, look to see if a user is clicking on our referenced components (input / champ_list)
    function useOutsideAlerter(ref, hook) {
        useEffect(() => {
            function handleClickOutside(event) {

                if (!ref.current.contains(event.target)) {
                    hook(false);
                } else {
                    hook(true);
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
        if (dataList.length <= 0) {
            setDataList(filteredData);
        }
    }, [rawData])

    useEffect(() => {
        filteredData = rawData.filter(champion => champion.name.toLowerCase().includes(userInput.toLocaleLowerCase()));
        setDataList(filteredData)
    }, [userInput])

    return (
        <ChampionSelectionContainer ref={inputAndDataList}>
            <UserSelectionContainer >
                <SelectedChampionContainer >
                    {selectedOptions && selectedOptions.map( (champion) => {
                        return (
                            <SelectedChampTags data-name={champion}>
                                {champion} 
                                | 
                                <RemoveButton data-name={champion} onClick={onCloseClick} icon={faTimes} />
                            </SelectedChampTags>
                        )
                    })}
                </SelectedChampionContainer>
                <Label > {label}
                    <ChampionInput
                        onChange={onChange}
                        type="text"
                        name={inputName}
                        autoComplete="off"
                        placeholder={placeHolder}
                        
                    />
                </Label>
            </UserSelectionContainer>
            {selectedOptions.length >= lengthCheck ? <NoMoreText>No more selections please</NoMoreText> : null}
            <ChampionContainer displayList={displayList} selectedOptions={selectedOptions} lengthCheck={lengthCheck}>
                {selectedOptions.length < lengthCheck ?
                    dataList.map( (data, i) => {
                        return (
                            <DisplayListCard
                                onChampionClick={onChampionClick}
                                data={data}
                                key={i}
                            />
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
    font-size: 16px;
    color: #000;
    margin-right: 5px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    background: linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%);
`;
const RemoveButton = S(FontAwesomeIcon)`
    margin: 2px 0 0 2px;
    color: #fff;
    &:hover {
        cursor: pointer;
    }
    * {
        pointer-events: none;

    }
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
    overflow-y: ${props => props.selectedOptions.length >= props.lengthCheck ? 'unset' : 'scroll'};
    height: ${props => props.displayList ? 'auto' : '0'};
    transition: all ease 120ms;
    max-height: ${props => props.displayList ? '300px' : '0'};
    margin-top: -3px;
    position: absolute;
    z-index: 11;
    &::-webkit-scrollbar-thumb {
        background-color: #0077ff;
        border-radius: 5px;
      }
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-track {
        background-color: #fff;
      }
`;

const NoMoreText = S.p`
    font-size: 18px;
    color: #191818;
    background-color: #fff;
    padding: 20px;
    margin-top: -3px;
`;