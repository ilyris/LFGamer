import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import S from'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Messages from './Messages';
import {env_be_url} from '../../globalVars/envURL';
import Conversation from '../cards/Conversation'

function MessageSessionContainer(props) {

    const [isMin, setIsMin] = useState(true);
    const activeMessageSessions = useSelector(state => state.messageConnections.userConnections); // All the active user sessions
    const socket = useSelector(state => state.messageConnections.socket);
    const loggedInUser = useSelector(state => state.root.loggedInUser);
    const conversationMessages = useSelector(state => state.messageConnections.messages);
    const [convos, setConvos] = useState([]);
    const containerListHeader = useRef(null);

    const minimizeMessage = (event) => {
        event.stopPropagation();
        event.target.classList.toggle('isMin');

        if(isMin == true) {
            setIsMin(false);
        } else {
            setIsMin(true);
        }
    }
    useEffect(() => {
        if(!loggedInUser) return;
        const getConversations = async () => {
            try {
                const res = await axios.get(`${env_be_url}conversation/${loggedInUser.id}`);
                setConvos(res.data);
                console.log(res);
            } catch(err) {
                console.log(err);
            }
        }
        getConversations();
    }, [loggedInUser])

    
    return (
        <MessageSessionsContainer>
            <ConversationListContainer isMin={isMin} ref={containerListHeader}>

                {/*  Change this data to signed in user*/}
                <UsernameContainer onClick={minimizeMessage}>
                    <AvatarContainer>
                        <CardAvatar src={`https://cdn.discordapp.com/avatars/${loggedInUser.dis}/${loggedInUser.avatar}.png`}/>
                        <CardUsername isheader={true}>{`Messaging`}</CardUsername>                          
                    </AvatarContainer>
                    <StyledIconArrow isMin={isMin} icon={faChevronDown} />
                </UsernameContainer> 
                <Conversations>
                    {convos && convos.map(c => {
                        return <Conversation c={c} loggedInUserId={loggedInUser.id}/>
                    })}
                </Conversations>
 

            </ConversationListContainer>

            {activeMessageSessions.length > 0 ? activeMessageSessions.map( (users,index) => {
                return <Messages loggedInUserId={loggedInUser.id} conversationMessages={conversationMessages} activeMessageSessions={users} key={index}/>
                }) : null}
        </MessageSessionsContainer> 
    )
}
export default MessageSessionContainer;

const MessageSessionsContainer = S.div`
    position: fixed;
    z-index: 1000;
    bottom: 0;
    right: 8px;
    height: 0;
    overflow: visible;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
`;

// Conversation List
const ConversationListContainer = S.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
    flex: 0 0 288px;
    width: 288px;
    min-width: 0;
    background: #fff;
    box-shadow: 2px 2px 8px #00000061;
    transform: ${props => props.isMin ? 'translateY(100%) translateY(-50px)' :  'translateY(0)'} ;
    transition: all 500ms ease-in-out;
    position: relative;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    order: 1;
    margin-left: 10px;
`;

// User informationContainer
const AvatarContainer = S.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const UsernameContainer = S.div`
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    background-color: #494848;
    border-top-left-radius: 13px;
    border-top-right-radius: 12px;
    height: 50px;
    padding: 5px 10px;
    justify-content: space-between;

    &:hover {
        cursor: pointer;
    }
`;
const CardUsername = S.div`
    font-size: 16px;
    color: ${props => props.isheader ? '#fff' : '#191818'};
    font-weight: 500;
    text-align: right;
    margin-left: 10px;
    text-align: left;
    display: flex;
    justify-content: space-between;
`;
const CardAvatar = S.img`
    width: ${props => props.isheader ? '50px' : '35px'};
    height: ${props => props.isheader ? '50px' : '35px'};
    border-radius: 50%;
`;
const StyledIconArrow = S(FontAwesomeIcon)`
    transition: all 500ms ease-in-out;
    transform: ${props => props.isMin ? 'rotate(180deg)' :'rotate(0)'};
    margin-left: 10px;
    color: #fff;
    font-size: 20px;
`;

// Conversations
const Conversations = S.section`
    display: flex;
    flex-flow: row wrap;    
`;