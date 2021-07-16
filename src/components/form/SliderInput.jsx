import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S from 'styled-components';

function SliderInput(props) {
    const dispatch = useDispatch();
    const userMicSetting = useSelector(state => state.championSelections.micEnabled);
    const [sliderActive, setSliderActive] = useState(false);

    const onClick = (e) => {
        if(sliderActive) {
            setSliderActive(false);
            dispatch({type: 'SET_IS_MIC_ENABLED', payload: false});
        } else {
            setSliderActive(true);
            dispatch({type: 'SET_IS_MIC_ENABLED', payload: true});
        }
    }
    return (
        <MainContainer>
            <Label> Use a mic?
                <SliderContainer onClick={onClick} userMicSetting={userMicSetting}></SliderContainer>
            </Label>            
        </MainContainer>

    )
}
export default SliderInput;

const MainContainer = S.div`
    display: flex;
    justify-content: flex-start;
    margin: 50px 0;
    transform: translateY(50px);

`;
const Label = S.label`
    font-size: 20px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

`;
const SliderContainer = S.div`
    background: ${props => props.userMicSetting ? 'linear-gradient(to right,rgba(118,238,116,1) 0%,rgba(0,152,142,1) 100%)' : ' #b90000'};    
    position: relative;
    width: 49px;
    height: 25px;
    border-radius: 1.3rem;
    margin-top: 10px;

    &:hover {
        cursor: pointer;
    }
    &:after {
        content: '';
        background: #fff;
        position: absolute;
        left: 0;
        transform: ${props => props.userMicSetting ? ' translateX(100%)' : ' translateX(0)'};
        border-radius: 1.3rem;
        z-index: 10;
        height: 100%;
        width: 25px;
        transition: all ease-in-out 120ms;
    }

`;
