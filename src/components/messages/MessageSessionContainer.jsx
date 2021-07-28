import React, {useState, useEffect, useRef} from 'react'
import {  useSelector, useDispatch} from 'react-redux';
import S from'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import Messages from './Messages';
import {env_be_url} from '../../globalVars/envURL';
import Conversation from '../cards/Conversation'
import { createRef } from 'react';

function MessageSessionContainer(props) {

    const [isMin, setIsMin] = useState(true);
    const activeMessageSessions = useSelector(state => state.messageConnections.userConnections); // All the active user sessions
    const loggedInUser = useSelector(state => state.root.loggedInUser);
    const conversationMessages = useSelector(state => state.messageConnections.messages);
    const [convos, setConvos] = useState([]);
    const containerListHeader = useRef(null);
    

    const dispatch = useDispatch();
    const socket = useSelector(state => state.messageConnections.socket);
    const elScrollRefs = useRef([]);

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
        const getConversations = async () => {
            try {
                const res = await axios.get(`${env_be_url}conversation/${loggedInUser.id}`);
                setConvos(res.data);
            } catch(err) {
                console.log(err);
            }
        }
        if(!Object.keys(loggedInUser).length === 0)  {
            console.log('logged in user id was empty')
        }
        else {
            getConversations();
        }
    }, [loggedInUser])

    useEffect(() => {
        if(socket == null) return;
        socket.on('getMessage', data => {
            dispatch({type: 'SET_USER_CONNECTIONS', payload: {
                userId: String(data.senderId),
                friendUsername: data.username,
                conversationId: data.conversationId
            }})
        })
    }, [dispatch, socket])

    useEffect(() => {
        console.log(elScrollRefs)
        elScrollRefs.current = elScrollRefs.current.slice(0, conversationMessages.length)
        elScrollRefs.current.map( ref => {
            if(ref == null) return;
            // ref.current.scrollIntoView({behavior: 'smooth'});
            ref.scrollTop = ref.scrollHeight
        }) 
    },[conversationMessages.length])

    return (
        <MessageSessionsContainer>
            <ConversationListContainer isMin={isMin} ref={containerListHeader}>
                <UsernameContainer onClick={minimizeMessage}>
                    <AvatarContainer>
                        <CardAvatar src={`https://cdn.discordapp.com/avatars/${loggedInUser.dis}/${loggedInUser.avatar}.png`}/>
                        <CardUsername isheader={true}>{`Messaging`}</CardUsername>                          
                    </AvatarContainer>
                    <StyledIconArrow isMin={isMin} icon={faChevronDown} />
                </UsernameContainer> 
                <Conversations>
                    {/* Conversation_id comes from here, then maps to the sessions*/ }
                    {convos && convos.map( (c,index) => {
                        return <Conversation c={c} loggedInUserId={loggedInUser.id} key={index}/>
                    })}
                </Conversations>
            </ConversationListContainer>

            {activeMessageSessions.length > 0 ? activeMessageSessions.map( (users,index) => {
                // create an empty array to push the conversation messages into
                let messages = [];
                // flatten out the array (might be a better way to handle this)
                conversationMessages.flat().forEach( (message => {
                    // check if the message contains the conversationId, so the correct users get the right messages.
                    if(message.conversationId == users.conversationId) {
                        messages.push(message);
                    }
                }))
                    return (
                        <Messages 
                            loggedInUserId={loggedInUser.id} 
                            conversationMessages={messages} 
                            activeMessageSessions={users} 
                            key={users.conversationId}
                            cid={users.conversationId}
                            scrollRef={el => elScrollRefs.current[index] = el}
                        />
                    )
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